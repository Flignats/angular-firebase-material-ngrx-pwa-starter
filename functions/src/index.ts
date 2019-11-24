import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firestore);

import * as authFunctions from './auth';

export const onNewUserCreated = functions.auth.user().onCreate(function(user, context) {
    return authFunctions.onNewUserCreated(user, context);
});

