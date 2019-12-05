import { IUserQuests } from '@app/core/models/game-data/user-quests.model';
import { IUser } from './../../modules/user/user.model';
import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection,
    DocumentChangeAction,
    Action,
    DocumentSnapshotDoesNotExist,
    DocumentSnapshotExists
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import { IBuildings } from '@app/modules/home/home.model';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    constructor(private afs: AngularFirestore) {}

    /// **************
    /// Get a Reference
    /// **************

    col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
        return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
    }

    doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
        return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
    }

    /// **************
    /// Get Data
    /// **************

    doc$<T>(ref: DocPredicate<T>): Observable<T> {
        return this.doc(ref)
            .snapshotChanges()
            .pipe(
                map((doc: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>>) => {
                    return doc.payload.data() as T;
                })
            );
    }

    col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
        return this.col(ref, queryFn)
            .snapshotChanges()
            .pipe(
                map((docs: DocumentChangeAction<T>[]) => {
                    return docs.map((a: DocumentChangeAction<T>) => a.payload.doc.data()) as T[];
                })
            );
    }

    // Firebase Server Timestamp
    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }

    // Set a document
    set<T>(ref: DocPredicate<T>, data: any): Promise<void> {
        const timestamp = this.timestamp;
        return this.doc(ref).set({
            ...data,
            updatedAt: timestamp,
            createdAt: timestamp
        });
    }

    // Home
    public loadUserBuildings(uid: any): Observable<IBuildings> {
        return this.doc$('userCities/' + uid);
    }

    // Quests
    public loadUserQuests(uid: any): Observable<IUserQuests> {
        return this.doc$('userQuests/' + uid);
    }

    // User
    public loadUser(uid: any): Observable<IUser> {
        return this.doc$('users/' + uid);
    }

    // User: Trigger Build
    public getTriggerStatusBuild(uid) {
        return this.doc$('users/' + uid + '/triggersStatus/build');
    }
    public triggerBuild(uid: string, buildingId: string, level: number, node: number, hasCreatedFirstBuilding: boolean) {
        const batch                 = firebase.firestore().batch();
        const timestamp             = this.timestamp;

        const triggerDocRef         = firebase.firestore().doc('users/' + uid + '/triggers/build');
        const triggerStatusDocRef   = firebase.firestore().doc('users/' + uid + '/triggersStatus/build');

        batch.set(triggerDocRef, {
            action: 'Setting up build...',
            buildingId,
            createdAt: timestamp,
            hasCreatedFirstBuilding,
            level,
            node,
            uid,
        });

        batch.set(triggerStatusDocRef, {
            action: 'Setting up build...',
            buildingId,
            createdAt: timestamp,
            level,
            node,
            pending: true,
            uid,
        });

        return from(batch.commit());
    }

    // User: Trigger Complete Tour Step
    public getTriggerStatusCompleteTourStep(uid) {
        return this.doc$('users/' + uid + '/triggersStatus/tour');
    }
    public triggerCompleteTourStep(uid: string, bonusId: string) {
        const batch                 = firebase.firestore().batch();
        const timestamp             = this.timestamp;

        const triggerDocRef         = firebase.firestore().doc('users/' + uid + '/triggers/tour');
        const triggerStatusDocRef   = firebase.firestore().doc('users/' + uid + '/triggersStatus/tour');

        batch.set(triggerDocRef, {
            action: 'Completing tour step',
            createdAt: timestamp,
            id: bonusId,
            uid,
        });

        batch.set(triggerStatusDocRef, {
            action: 'Completing tour step',
            createdAt: timestamp,
            id: bonusId,
            pending: true,
            uid,
        });

        return from(batch.commit());
    }

    // User: Trigger Set Display Name
    public getTriggerStatusSetDisplayName(uid) {
        return this.doc$('users/' + uid + '/triggersStatus/setDisplayName');
    }
    public triggerSetDisplayName(uid: string, name) {
        const batch                 = firebase.firestore().batch();
        const timestamp             = this.timestamp;

        const triggerDocRef         = firebase.firestore().doc('users/' + uid + '/triggers/setDisplayName');
        const triggerStatusDocRef   = firebase.firestore().doc('users/' + uid + '/triggersStatus/setDisplayName');

        batch.set(triggerDocRef, {
            createdAt: timestamp,
            uid,
            displayName: name.displayName
        });

        batch.set(triggerStatusDocRef, {
            createdAt: timestamp,
            displayName: name.displayName,
            pending: true,
            uid,
        });

        return from(batch.commit());
    }
}
