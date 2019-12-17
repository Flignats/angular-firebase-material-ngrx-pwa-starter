import { ITriggers } from '@app/core/models/triggers.models';
import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { AppState } from '@app/core/core.state';
import { selectUid } from '@app/core/auth/auth.selectors';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import {
    loadUserQuests,
    loadUserQuestsSuccess,
    loadUserQuestsFailure,
    completeQuest,
    completeQuestSuccess,
    completeQuestFailure,
    loadStatusCompleteQuest
} from './quests.actions';
import { IQuestTriggers } from './quests.model';

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

    completeQuest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(completeQuest),
            withLatestFrom(this.store.pipe(select(selectUid))),
            switchMap(([action, uid]) =>
                this.afs.triggerCompleteQuest(action.questId, uid).pipe(
                    map(_ => loadStatusCompleteQuest()),
                    catchError(error => of(completeQuestFailure({ error })))
                )
            )
        )
    );

    loadStatusCompleteQuest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadStatusCompleteQuest),
            withLatestFrom(this.store.pipe(select(selectUid))),
            switchMap(([action, uid]) =>
                this.afs.getTriggerStatusCompleteQuest(uid).pipe(
                    map((triggerStatus: IQuestTriggers) => completeQuestSuccess({ triggerStatus })),
                    catchError(error => of(completeQuestFailure({ error })))
                )
            )
        )
    );
}
