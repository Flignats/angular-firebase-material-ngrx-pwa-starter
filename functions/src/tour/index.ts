import * as admin from 'firebase-admin';
import * as utils from '../utils';

const firestoreInstance = admin.firestore();

const bonuses: { [key: string]: any } = {
    new_player_bonus: {
        sand: 100,
        stone: 50,
        water: 100,
        wood: 500
    }
}

export async function onTriggerCompleteTourStep(change: any, context: any) {
    const serverTimestamp       = admin.firestore.Timestamp.now();
    const triggerData           = change.after.data();
    const bonusId               = triggerData.id;
    const uid                   = triggerData.uid;

    try {
        const batch             = firestoreInstance.batch();
        const userDoc           = firestoreInstance.collection(utils.API_URLS.users).doc(uid);
        const triggerStatusDoc  = firestoreInstance.doc(utils.API_URLS.userTriggerStatus(uid, 'tour'));

        const bonus             = bonuses[bonusId];
        const tourId            = getTourId(bonusId);

        /**
         *  1. Update userDoc
         *  2. Update triggerStatusDoc
         */
        batch.set(userDoc, {
            resources: {
                sand: admin.firestore.FieldValue.increment(bonus.sand),
                stone: admin.firestore.FieldValue.increment(bonus.stone),
                water: admin.firestore.FieldValue.increment(bonus.water),
                wood: admin.firestore.FieldValue.increment(bonus.wood),
            },
            tours: {
                [tourId]: false,
            },
            updatedAt: serverTimestamp,
        }, { merge: true });

        batch.set(triggerStatusDoc, {
            pending: false,
            success: true,
            successMsg: 'Tour step completed'
        }, { merge: true });

        return batch.commit();
    } catch (error) {
        console.log(error);
        return Promise.resolve();
    }
}

export function getNextTourId(tourId: string) {
    const tourIds = [
        'isPendingNewPlayerBonus',
        'isPendingQuestsIntro',
        'isPendingNextTour'
    ];

    const currIndex = tourIds.findIndex(tour => tour === tourId);

    return tourIds[currIndex + 1];
}

export function getTourId(bonusId: string) {
    if (bonusId === 'new_player_bonus') { return 'isPendingNewPlayerBonus'; }

    return 'default';
}
