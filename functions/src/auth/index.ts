import * as admin from 'firebase-admin';
import * as utils from '../utils';
import { defaultQuests } from '../../../shared-data/models/user-quests.model';

const firestoreInstance = admin.firestore();

export async function onNewUserCreated(user: any, context: any) {
    const serverTimestamp = admin.firestore.Timestamp.now();
    const appStatsDailyDocId = await utils.getAppStatsDailyId(serverTimestamp);

    // Get a new write batch
    const batch = firestoreInstance.batch();

    // Get paths
    const appStatsDailyDoc = firestoreInstance.collection(utils.API_URLS.appStatsDaily).doc(appStatsDailyDocId);
    const newUserDoc = firestoreInstance.collection('users').doc(user.uid);
    const newUserBuildings = firestoreInstance.collection('userCities').doc(user.uid);
    const newUserQuests = firestoreInstance.collection('userQuests').doc(user.uid);

    /**
     * 1. Update App Stats doc
     * 2. Set new User doc
     * 3. Set new User Buildings doc
     * 4. Set new User Quests doc
     */

    // App Stats Doc
    batch.set(
        appStatsDailyDoc,
        {
            updatedAt: serverTimestamp,
            totalNewUsers: admin.firestore.FieldValue.increment(1)
        },
        { merge: true }
    );

    const today = serverTimestamp.toDate();
    const shieldExpirationDate = new Date(today.getTime() + 1000 * 60 * 60 * 24);
    const shieldExpirationTimestamp = admin.firestore.Timestamp.fromDate(shieldExpirationDate);

    // User Doc
    batch.set(
        newUserDoc,
        {
            createdAt: serverTimestamp,
            displayName: null,
            email: user.email,
            level: {
                number: 1,
                experience: 0,
            },
            resources: {
                population: {
                    available: 100,
                    unavailable: 0,
                },
                sand: 0,
                stone: 0,
                water: 0,
                wood: 0
            },
            shield: {
                active: true,
                activatedAt: serverTimestamp,
                expiresAt: shieldExpirationTimestamp
            },
            tasks: {
                build: null,
                research: null,
                train: null,
            },
            tours: {
                isPendingNewPlayerBonus: true,
                isPendingQuestsIntro: null,
            },
            uid: user.uid,
            updatedAt: serverTimestamp
        },
        { merge: true }
    );

    // User Buildings Doc
    const buildings: any = {};
    const keys = 'abcdefghijklmnopqrstuvwxyz';

    for (let index = 0; index < 29; index++) {
        const keysIndex = index - 26;
        const num = index + 1;
        const key = index < 26 ? keys[index] : keys[25] + keys[keysIndex];

        if (index === 0) {
            buildings[key] = {
                buildingId: null,
                level: 0,
                node: num,
                status: 'empty' // 'construction' | 'empty' | 'locked' | 'occupied'
            };
        } else if (index === 14) {
            buildings[key] = {
                buildingId: 'keep',
                level: 1,
                node: num,
                status: 'occupied'
            };
        } else {
            buildings[key] = {
                buildingId: null,
                level: 0,
                node: num,
                status: 'locked'
            };
        }
    }

    batch.set(newUserBuildings, {
        createdAt: serverTimestamp,
        uid: user.uid,
        updatedAt: serverTimestamp,
        nodes: buildings,
        unlocked: {
            arsenal: false,
            assembly: false,
            barracks_resource: false,
            barracks_ground: false,
            barracks_ranged: false,
            barracks_magic: false,
            flight_tower: false,
            furnace: false,
            house: true,
            keep: true,
            think_tank: false,
            warehouse: false,
            watchtower: false,
        },
        hasCreatedFirstBuilding: false,
    });

    // User Quests Doc
    batch.set(newUserQuests, {
        ...defaultQuests,
        createdAt: serverTimestamp,
        questsCompleted: 0,
        uid: user.uid,
        updatedAt: serverTimestamp
    });

    return batch.commit();
}
