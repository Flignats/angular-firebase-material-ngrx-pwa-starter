import * as admin from 'firebase-admin';
import * as utils from '../utils';
import { defaultBuildings } from '../models/game-data/buildings.models';

const firestoreInstance = admin.firestore();

export async function onSetBuildingsTriggered(change: any, context: any) {
    // const serverTimestamp       = admin.firestore.Timestamp.now();

    try {
        const batch             = firestoreInstance.batch();
        const buildingsDoc      = firestoreInstance.collection(utils.API_URLS.buildings).doc('view');

        batch.set(buildingsDoc, {...defaultBuildings});

        return batch.commit();
    } catch (error) {
        console.log(error);
        return Promise.resolve();
    }
}