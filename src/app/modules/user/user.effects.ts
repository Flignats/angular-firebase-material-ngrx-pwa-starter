import { selectUserBuildings } from '@app/modules/home/home.selectors';
import { ITriggers } from '@app/core/models/triggers.models';
import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import {
    loadUser,
    loadUserSuccess,
    loadUserFailure,
    triggerSetDisplayName,
    triggerLoadStatusSetDisplayName,
    triggerLoadStatusSetDisplayNameFailure,
    triggerLoadStatusSetDisplayNameSuccess,
    triggerBuild,
    triggerLoadStatusBuild,
    triggerBuildFailure,
    triggerLoadStatusBuildSuccess,
    triggerCompleteTourStep,
    triggerLoadStatusCompleteTourStep,
    triggerCompleteTourStepFailure,
    triggerLoadStatusCompleteTourStepSuccess
} from './user.actions';
import { AppState } from '@app/core/core.state';
import { selectUid } from '@app/core/auth/auth.selectors';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { IUserTriggers } from './user.model';
import * as firebase from 'firebase/app';
import { updateAuth } from '@app/core/auth/auth.actions';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions<Action>, private afs: FirestoreService, private store: Store<AppState>) {}

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

    // Set Display Name
    setDisplayName$ = createEffect(() =>
        this.actions$.pipe(
            ofType(triggerSetDisplayName),
            withLatestFrom(this.store.pipe(select(selectUid))),
            switchMap(([action, uid]) =>
                this.afs.triggerSetDisplayName(uid, action.displayName).pipe(
                    map(user => triggerLoadStatusSetDisplayName()),
                    catchError(error => of(triggerLoadStatusSetDisplayNameFailure({ error })))
                )
            )
        )
    );
    loadTriggerStatusSetDisplayName$ = createEffect(() =>
        this.actions$.pipe(
            ofType(triggerLoadStatusSetDisplayName),
            withLatestFrom(this.store.pipe(select(selectUid))),
            switchMap(([action, uid]) =>
                this.afs.getTriggerStatusSetDisplayName(uid).pipe(
                    map((triggerStatus: IUserTriggers) => triggerLoadStatusSetDisplayNameSuccess({ triggerStatus })),
                    catchError(error => of(triggerLoadStatusSetDisplayNameFailure({ error })))
                )
            )
        )
    );
    triggerLoadStatusSetDisplayNameSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(triggerLoadStatusSetDisplayNameSuccess),
            map(() => updateAuth())
        )
    );

    // Build
    build$ = createEffect(() =>
        this.actions$.pipe(
            ofType(triggerBuild),
            withLatestFrom(
                this.store.pipe(select(selectUid)),
                this.store.pipe(select(selectUserBuildings))
            ),
            switchMap(([action, uid, userBuildings]) =>
                this.afs.triggerBuild(uid, action.buildingId, action.level, action.node, userBuildings.hasCreatedFirstBuilding).pipe(
                    map(() => triggerLoadStatusBuild()),
                    catchError(error => of(triggerBuildFailure({ error })))
                )
            )
        )
    );
    loadTriggerStatusBuild$ = createEffect(() =>
        this.actions$.pipe(
            ofType(triggerLoadStatusBuild),
            withLatestFrom(this.store.pipe(select(selectUid))),
            switchMap(([action, uid]) =>
                this.afs.getTriggerStatusBuild(uid).pipe(
                    map((triggerStatus: IUserTriggers) => triggerLoadStatusBuildSuccess({ triggerStatus })),
                    catchError(error => of(triggerBuildFailure({ error })))
                )
            )
        )
    );

    // Collect Bonus
    completeTourStep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(triggerCompleteTourStep),
            withLatestFrom(this.store.pipe(select(selectUid))),
            switchMap(([action, uid]) =>
                this.afs.triggerCompleteTourStep(uid, action.id).pipe(
                    map(user => triggerLoadStatusCompleteTourStep()),
                    catchError(error => of(triggerCompleteTourStepFailure({ error })))
                )
            )
        )
    );
    loadTriggerStatusCompleteTourStep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(triggerLoadStatusCompleteTourStep),
            withLatestFrom(this.store.pipe(select(selectUid))),
            switchMap(([action, uid]) =>
                this.afs.getTriggerStatusCompleteTourStep(uid).pipe(
                    map((triggerStatus: IUserTriggers) => triggerLoadStatusCompleteTourStepSuccess({ triggerStatus })),
                    catchError(error => of(triggerCompleteTourStepFailure({ error })))
                )
            )
        )
    );
}
