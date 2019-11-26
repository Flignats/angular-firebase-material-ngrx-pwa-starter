import { ITriggers } from '@app/core/models/triggers.models';
import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '@app/core/core.state';
import { selectUid } from '@app/core/auth/auth.selectors';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { loadUserBuildings, loadUserBuildingsSuccess, loadUserBuildingsFailure } from './home.actions';

@Injectable()
export class HomeEffects {
    constructor(private actions$: Actions<Action>, private afs: FirestoreService, private store: Store<AppState>) {}

    loadUserBuildings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUserBuildings),
            withLatestFrom(this.store.pipe(select(selectUid))),
            switchMap(([action, uid]) =>
                this.afs.loadUserBuildings(uid).pipe(
                    map(buildings => loadUserBuildingsSuccess({ buildings })),
                    catchError(error => of(loadUserBuildingsFailure({ error })))
                )
            )
        )
    );
}
