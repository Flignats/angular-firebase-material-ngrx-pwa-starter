import * as admin from 'firebase-admin';
import * as utils from '../utils';

const firestoreInstance = admin.firestore();

export async function onTriggerSetDisplayName(change: any, context: any) {
    const serverTimestamp       = admin.firestore.Timestamp.now();
    const triggerData           = change.after.data();
    const displayName           = triggerData.displayName;
    const lDisplayName          = displayName.toLowerCase();
    const uid                   = triggerData.uid;

    try {
        const batch             = firestoreInstance.batch();
        const displayNameDoc    = firestoreInstance.collection(utils.API_URLS.displayNames).doc(lDisplayName);
        const userDoc           = firestoreInstance.collection(utils.API_URLS.users).doc(uid);
        const triggerStatusDoc  = firestoreInstance.collection(utils.API_URLS.users).doc(uid).collection('triggersStatus').doc('setDisplayName');

        /**
         *  1. Update afUser
         *  2. Update userDoc
         *  3. Update displayNameDoc
         *  4. Update triggerStatusDoc
         */
        const updateAfUser = await admin.auth().updateUser(uid, {
            displayName
        });

        batch.set(userDoc, {
            displayName: displayName,
            updatedAt: serverTimestamp,
        }, { merge: true });

        batch.set(displayNameDoc, {
            createdAt: serverTimestamp,
            displayName: displayName,
            uid,
        }, { merge: true });

        batch.set(triggerStatusDoc, {
            pending: false,
            success: true,
            successMsg: 'Display name updated!'
        }, { merge: true });

        if (updateAfUser) {
            return batch.commit();
        } else {
            console.log('afUser did not update, error');
            return Promise.resolve();
        }        
    } catch (error) {
        console.log(error);
        return Promise.resolve();
    }
}

export async function updateUserExperience(exp: number, userDocRef: FirebaseFirestore.DocumentReference, ) {
    try {
        return userDocRef.set({
            level: {
                number: 1,
                experience: admin.firestore.FieldValue.increment(exp),
            },
        }, { merge: true });
    } catch (error) {
        console.log(error);
        return Promise.resolve();
    }
}