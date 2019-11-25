import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firestore);

import * as authFunctions from './auth';
import * as userFunctions from './user';

// Auth
export const onNewUserCreated = functions.auth.user().onCreate(function(user, context) {
    return authFunctions.onNewUserCreated(user, context);
});

// User
export const onTriggerSetDisplayName = functions.firestore.document('users/{userId}/triggers/setDisplayName').onWrite((change, context) => {
    return userFunctions.onTriggerSetDisplayName(change, context);
});
