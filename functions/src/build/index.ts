import * as admin from 'firebase-admin';
import * as utils from '../utils';
import * as userFunctions from '../user';
import { defaultBuildings } from '../../../shared-data/models/buildings.models';
const firestoreInstance = admin.firestore();

export async function onCompleteBuild(data: any) {
    const serverTimestamp = admin.firestore.Timestamp.now();
    const buildingId = data.buildingId;
    const hasCreatedFirstBuilding = data.hasCreatedFirstBuilding;
    const newBuilding = data.newBuilding;
    const node = data.node;
    const nodeKey = utils.toLetters(node).toLowerCase();
    const uid = data.uid;

    const userDoc = firestoreInstance.doc(utils.API_URLS.user(uid));
    const userCityDoc = firestoreInstance.doc(utils.API_URLS.userCity(uid));
    const userQuestDoc = firestoreInstance.doc(utils.API_URLS.userQuest(uid));

    const batch = firestoreInstance.batch();

    // Update User population, task:build
    const newLevelId = utils.toLetters(newBuilding.level).toLowerCase();
    const experienceGained = defaultBuildings[buildingId][newLevelId]['expGain'];

    batch.update(userDoc, {
        ['resources.population.available']: admin.firestore.FieldValue.increment(newBuilding.people),
        ['resources.population.unavailable']: admin.firestore.FieldValue.increment(-newBuilding.people),
        ['tasks.build']: null,
        updatedAt: serverTimestamp
    });

    const cityDocNodeKey = 'nodes.' + nodeKey; // ex: nodes.a
    batch.update(userCityDoc, {
        hasCreatedFirstBuilding: !hasCreatedFirstBuilding ? true : hasCreatedFirstBuilding,
        updatedAt: serverTimestamp,
        [cityDocNodeKey]: {
            buildingId,
            level: newBuilding.level,
            node,
            status: 'occupied'
        },
        ['unlocked.barracks_resource']: true
    });

    const result = await batch.commit().then(async _ => await userFunctions.updateUserExperience(experienceGained, userDoc));
    if (!result) { return Promise.reject('Batch did not execute properly'); }
    
    // Quests
    // Quest:house_a - Set the User's first quest to isReadyToCollect
    // User: unlock barracks_resources
    if (!hasCreatedFirstBuilding) {
        const questBatch = firestoreInstance.batch();

        questBatch.update(userDoc, {
            ['tours.isPendingQuestsIntro']: true,
        });

        questBatch.update(userQuestDoc, {
            ['quests.house_a.isReadyToCollect']: true,
        });

        return questBatch.commit();
    } else {
        return Promise.resolve('Already completed first building');
    }
}

export function onTriggerBuild(change: any, context: any) {
    const serverTimestamp = admin.firestore.Timestamp.now();
    const triggerData = change.after.data();
    const buildingId = triggerData.buildingId;
    const buildingNode = triggerData.node;
    const cityNodeKey = utils.toLetters(buildingNode).toLowerCase();
    const hasCreatedFirstBuilding = triggerData.hasCreatedFirstBuilding;
    const newBuildingLevel = triggerData.level;
    const uid = triggerData.uid;

    const userDoc = firestoreInstance.doc(utils.API_URLS.user(uid));
    const userCityDoc = firestoreInstance.doc(utils.API_URLS.userCity(uid));
    const taskDoc = firestoreInstance.collection(utils.API_URLS.userTasks).doc();
    const triggerStatusDoc = firestoreInstance.doc(utils.API_URLS.userTriggerStatus(uid, 'build'));

    return firestoreInstance.runTransaction(transaction =>
        transaction.get(userDoc).then(doc => {
            if (!doc) {
                throw new Error(`User does not exist:::${uid}`);
            }

            const user: any = doc.data();
            const buildingIsActive = user.tasks && user.tasks.build && user.tasks.build.active;

            if (buildingIsActive) {
                throw new Error(`User is currently building, cannot start new build:::${user.displayName} - ${uid}`);
            }

            const newLevelId = utils.toLetters(newBuildingLevel).toLowerCase();
            const newBuilding = defaultBuildings[buildingId][newLevelId];
            const hasEnoughResources =
                user.resources.population.available >= newBuilding.people &&
                user.resources.sand >= newBuilding.sand &&
                user.resources.stone >= newBuilding.stone &&
                user.resources.water >= newBuilding.water &&
                user.resources.wood >= newBuilding.wood;

            if (!hasEnoughResources) {
                throw new Error(`User does not have enough resources:::${user.displayName} - ${uid}`);
            }

            const newUserResources = {
                population: {
                    available: user.resources.population.available - newBuilding.people,
                    unavailable: user.resources.population.unavailable + newBuilding.people
                },
                sand: user.resources.sand - newBuilding.sand,
                stone: user.resources.stone - newBuilding.stone,
                water: user.resources.water - newBuilding.water,
                wood: user.resources.wood - newBuilding.wood
            };

            const serverDate = admin.firestore.Timestamp.now().toDate();
            const buildTime = newBuilding.buildTime;
            const completionDate = new Date(serverDate.getTime() + 1000 * buildTime);
            const buildingCompletesAt = admin.firestore.Timestamp.fromDate(completionDate);

            //
            // Update User Doc
            //  - Deduct resources
            //  - Add task
            //
            transaction.update(userDoc, {
                resources: newUserResources,
                ['tasks.build']: {
                    action: 'building',
                    active: true,
                    completesAt: buildingCompletesAt,
                    startedAt: serverTimestamp
                }
            });

            // Update User City Doc
            const cityDocNodeKey = 'nodes.' + cityNodeKey; // ex: nodes.a
            transaction.update(userCityDoc, {
                [cityDocNodeKey]: {
                    buildingId, // ex: 'house'
                    level: newBuildingLevel, // ex: 1
                    node: buildingNode, // ex: 1
                    status: 'construction'
                },
                updatedAt: serverTimestamp
            });

            // Update Trigger Status Doc
            transaction.set(
                triggerStatusDoc,
                {
                    pending: false
                },
                { merge: true }
            );

            // Add Task to task runner queue
            transaction.create(taskDoc, {
                options: {
                    buildingId,
                    hasCreatedFirstBuilding,
                    uid,
                    newBuilding,
                    node: buildingNode
                },
                performAt: buildingCompletesAt,
                status: 'scheduled',
                uid,
                worker: 'onCompleteBuild'
            });
        })
    );
}
