import { defaultQuests } from './../../../shared-data/models/user-quests.model';
import * as admin from 'firebase-admin';
import * as utils from '../utils';

const firestoreInstance = admin.firestore();

export async function onTriggerCompleteQuest(change: any, context: any) {
    const serverTimestamp = admin.firestore.Timestamp.now();
    const triggerData = change.after.data();
    const questId: string = triggerData.questId || 'house_a';
    const uid = context.params.userId;

    try {
        const batch = firestoreInstance.batch();
        const userDoc = firestoreInstance.doc(utils.API_URLS.user(uid));
        const userCityDoc = firestoreInstance.doc(utils.API_URLS.userCity(uid));
        const userQuestsDoc = firestoreInstance.doc(utils.API_URLS.userQuest(uid));
        const triggerStatusDoc = firestoreInstance.doc(utils.API_URLS.userTriggerStatus(uid, 'completeQuest'));

        const userQuests = await utils.getDocData(userQuestsDoc);
        if (userQuests.quests[questId].completed) {
            batch.set(
                triggerStatusDoc,
                {
                    pending: false,
                    success: true,
                    successMsg: 'Quest already completed, whatya doing here!?'
                },
                { merge: true }
            );

            return batch.commit();
        }

        batch.set(
            userQuestsDoc,
            {
                quests: {
                    [questId]: {
                        completed: true,
                        completedAt: serverTimestamp
                    }
                },
                questsCompleted: admin.firestore.FieldValue.increment(1),
                updatedAt: serverTimestamp
            },
            { merge: true }
        );

        batch.set(
            triggerStatusDoc,
            {
                pending: false,
                success: true,
                successMsg: 'Quest completed!'
            },
            { merge: true }
        );

        if (questId === 'house_a' && userQuests.quests[questId].isReadyToCollect) {
            const batchCompleteQuest = await completeQuest(questId, userDoc, userCityDoc);

            return Promise.all([batch.commit(), batchCompleteQuest.commit()]);
        }

        return Promise.resolve('ok!');
    } catch (error) {
        console.log(error);
        return Promise.resolve();
    }
}

async function completeQuest(
    questId: string,
    userDocRef: FirebaseFirestore.DocumentReference,
    userCityDocRef: FirebaseFirestore.DocumentReference
) {
    const { sand = 0, stone = 0, water = 0, wood = 0 } = defaultQuests.quests[questId].resources;
    const batch = firestoreInstance.batch();
    const serverTimestamp = admin.firestore.Timestamp.now();

    batch.set(
        userDocRef,
        {
            updatedAt: serverTimestamp,
            resources: {
                sand: admin.firestore.FieldValue.increment(sand),
                stone: admin.firestore.FieldValue.increment(stone),
                water: admin.firestore.FieldValue.increment(water),
                wood: admin.firestore.FieldValue.increment(wood)
            },
            tours: {
                isPendingQuestsIntro: false,
                ['isPendingNextTour']: true
            }
        },
        { merge: true }
    );

    // Unlock land plot, if needed
    if (defaultQuests.quests[questId].unlocksLand) {
        const userCity = await utils.getDocData(userCityDocRef);

        let nodeKeyToUnlock: any = undefined;
        let nodeToUnlock: any = undefined;

        Object.keys(userCity.nodes).forEach(node => {
            if (!nodeToUnlock && userCity.nodes[node].status === 'locked') {
                nodeKeyToUnlock = node;
                nodeToUnlock = userCity.nodes[node];
            }
        });

        batch.set(
            userCityDocRef,
            {
                updatedAt: serverTimestamp,
                nodes: {
                    [nodeKeyToUnlock]: {
                        ...nodeToUnlock,
                        status: 'empty'
                    }
                }
            },
            { merge: true }
        );
    }

    return batch;
}
