import { IUser } from './../../modules/user/user.model';
import { loadUser } from './../../modules/user/user.actions';
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
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as firebase from 'firebase/app';

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

    /// Firebase Server Timestamp
    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }

    // User
    public loadUser(uid: any): Observable<IUser> {
        return this.doc$('users/' + uid);
    }
}
