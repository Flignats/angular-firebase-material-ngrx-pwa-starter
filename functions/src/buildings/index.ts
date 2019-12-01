// import * as admin from 'firebase-admin';
// import * as utils from '../utils';

// const firestoreInstance = admin.firestore();

export async function onSetBuildingsTriggered(change: any, context: any) {
    // const serverTimestamp       = admin.firestore.Timestamp.now();

    try {
        // const batch             = firestoreInstance.batch();
        // const buildingsDoc      = firestoreInstance.collection(utils.API_URLS.buildings).doc('view');

        // // TODO: Finish
        // batch.set(buildingsDoc, {
        //     housing: {
        //         ['1']: {

        //         }
        //     }
        // });

        return Promise.resolve();
    } catch (error) {
        console.log(error);
        return Promise.resolve();
    }
}