import * as admin from 'firebase-admin';
import * as utils from '../utils';

const firestoreInstance = admin.firestore();

export async function onNewUserCreated(user: any, context: any) {
    const serverTimestamp           = admin.firestore.Timestamp.now();
    const appStatsDailyDocId        = await utils.getAppStatsDailyId(serverTimestamp);
    
    // Get a new write batch
    const batch                     = firestoreInstance.batch();

    // Get paths
    const appStatsDailyDoc          = firestoreInstance.collection(utils.API_URLS.appStatsDaily).doc(appStatsDailyDocId);
    const newUserDoc                = firestoreInstance.collection('users').doc(user.uid);
    const newUserBuildings          = firestoreInstance.collection('userCities').doc(user.uid);

    /**
     * 1. Update App Stats doc
     * 2. Set new User doc
     * 3. Set new User Buildings doc
     */

    batch.set(appStatsDailyDoc, {
        updatedAt: serverTimestamp,
        totalNewUsers: admin.firestore.FieldValue.increment(1),
    }, { merge: true })

    const today                         = serverTimestamp.toDate();
    const shieldExpirationDate          = new Date(today.getTime() + 1000 * 60 * 60 * 24);
    const shieldExpirationTimestamp     = admin.firestore.Timestamp.fromDate(shieldExpirationDate);

    batch.set(newUserDoc, {
        createdAt: serverTimestamp,
        displayName: null,
        email: user.email,
        shield: {
            active: true,
            activatedAt: serverTimestamp,
            expiresAt: shieldExpirationTimestamp,
        },
        tours: null,
        uid: user.uid,
        updatedAt: serverTimestamp,
    }, { merge: true });

    const buildings: any = {};
    const keys = 'abcdefghijklmnopqrstuvwxyz';

    for (let index = 0; index < 29; index++) {
        const keysIndex = index - 26;
        const num = index + 1;
        const key = index < 26 ? keys[index] : keys[25] + keys[keysIndex];

        if (index === 14) {
            buildings[key] = {
                level: 1,
                node: num,
                type: 'main',
            };
        } else {
            buildings[key] = {
                level: 0,
                node: num,
                type: 'empty',
            };
        }
    }

    batch.set(newUserBuildings, {
        createdAt: serverTimestamp,
        uid: user.uid,
        updatedAt: serverTimestamp,
        nodes: buildings
    });

    return batch.commit();
};