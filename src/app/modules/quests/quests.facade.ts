import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUserQuests } from './quests.actions';
import { IUserQuests } from '@app/core/models/game-data/user-quests.model';
import { selectUserQuests, selectQuestsLoading } from './quests.selectors';

@Injectable({
    providedIn: 'root'
})
export class QuestsFacade {
    constructor(private store: Store<{}>) {}

    // Actions
    public loadUserQuests(): void {
        this.store.dispatch(loadUserQuests());
    }

    // Selectors
    public selectUserQuests$(): Observable<IUserQuests> {
        return this.store.select(selectUserQuests);
    }

    public selectQuestsLoading$(): Observable<boolean> {
        return this.store.select(selectQuestsLoading);
    }
}
