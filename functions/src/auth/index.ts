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

    batch.set(appStatsDailyDoc, {
        updatedAt: serverTimestamp,
        totalNewUsers: admin.firestore.FieldValue.increment(1),
    }, { merge: true })

    batch.set(newUserDoc, {
        createdAt: serverTimestamp,
        displayName: null,
        email: user.email,
        uid: user.uid,
        updatedAt: serverTimestamp,
    }, { merge: true });

    return batch.commit();
};