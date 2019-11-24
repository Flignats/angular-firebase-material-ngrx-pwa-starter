import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { loadUser, loadUserSuccess, loadUserFailure } from './user.actions';
import { AppState } from '@app/core/core.state';
import { selectUid } from '@app/core/auth/auth.selectors';
import { FirestoreService } from '@app/core/firestore/firestore.service';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions<Action>,
        private afs: FirestoreService,
        private store: Store<AppState>
    ) {}

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUser),
            withLatestFrom(this.store.pipe(select(selectUid))),
            switchMap(([action, uid]) =>
                this.afs.loadUser(uid).pipe(
                    map(user => loadUserSuccess({ user })),
                    catchError(error => of(loadUserFailure({ error })))
                )
            )
        )
    );

}
