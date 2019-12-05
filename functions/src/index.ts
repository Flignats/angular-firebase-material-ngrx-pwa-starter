import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firestore);
import * as authFunctions from './auth';
// import * as bonusCollectFunctions from './bonus_collect';
import * as buildFunctions from './build';
import * as buildingsFunctions from './buildings';
import * as taskRunnerFunctions from './task-runners';
import * as userFunctions from './user';
import * as tourFunctions from './tour';

// Auth
export const onNewUserCreated = functions.auth.user().onCreate(function(user, context) {
    return authFunctions.onNewUserCreated(user, context);
});

// Tour: Complete Step
export const onTriggerCompleteTourStep = functions.firestore.document('users/{userId}/triggers/tour').onWrite((change, context) => {
    return tourFunctions.onTriggerCompleteTourStep(change, context);
});

// Task Runner
export const onTaskRunnerTriggered = functions.runWith({ memory: '2GB' }).pubsub.schedule('* * * * *').onRun(context => {
    return taskRunnerFunctions.onTaskRunnerTriggered(context);
});

// User
export const onTriggerBuild = functions.firestore.document('users/{userId}/triggers/build').onWrite((change, context) => {
    return buildFunctions.onTriggerBuild(change, context);
});
export const onTriggerSetDisplayName = functions.firestore.document('users/{userId}/triggers/setDisplayName').onWrite((change, context) => {
    return userFunctions.onTriggerSetDisplayName(change, context);
});

// Private Triggers
export const onSetBuildingsTriggered = functions.firestore.document('privateTriggers/setBuildings').onWrite((change, context) => {
    return buildingsFunctions.onSetBuildingsTriggered(change, context);
});
