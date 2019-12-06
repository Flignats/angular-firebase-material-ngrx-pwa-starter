import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUserQuests, completeQuest } from './quests.actions';
import { IUserQuests } from '@app/core/models/game-data/user-quests.model';
import { selectUserQuests, selectQuestsLoading, selectQuestsTriggers } from './quests.selectors';
import { IQuestTriggers } from './quests.model';

@Injectable({
    providedIn: 'root'
})
export class QuestsFacade {
    constructor(private store: Store<{}>) {}

    // Actions
    public loadUserQuests(): void {
        this.store.dispatch(loadUserQuests());
    }

    public completeQuest({ questId }) {
        this.store.dispatch(completeQuest({ questId }));
    }

    // Selectors
    public selectUserQuests$(): Observable<IUserQuests> {
        return this.store.select(selectUserQuests);
    }

    public selectQuestsLoading$(): Observable<boolean> {
        return this.store.select(selectQuestsLoading);
    }

    public selectQuestsTriggers$(): Observable<IQuestTriggers> {
        return this.store.select(selectQuestsTriggers);
    }
}
