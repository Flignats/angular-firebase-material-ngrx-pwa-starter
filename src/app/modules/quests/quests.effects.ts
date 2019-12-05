import { ITriggers } from '@app/core/models/triggers.models';
import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { AppState } from '@app/core/core.state';
import { selectUid } from '@app/core/auth/auth.selectors';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { loadUserQuests, loadUserQuestsSuccess, loadUserQuestsFailure } from './quests.actions';

@Injectable()
export class QuestsEffects {
    constructor(private actions$: Actions<Action>, private afs: FirestoreService, private store: Store<AppState>) {}

    loadUserQuests$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUserQuests),
            withLatestFrom(this.store.pipe(select(selectUid))),
            switchMap(([action, uid]) =>
                this.afs.loadUserQuests(uid).pipe(
                    map(quests => loadUserQuestsSuccess({ quests })),
                    catchError(error => of(loadUserQuestsFailure({ error })))
                )
            )
        )
    );
}
