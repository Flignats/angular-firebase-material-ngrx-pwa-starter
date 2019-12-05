import { Component, OnInit } from '@angular/core';
import { QuestsFacade } from '../quests.facade';
import { IUserQuests } from '@app/core/models/game-data/user-quests.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-quests',
    templateUrl: './quests.component.html',
    styleUrls: ['./quests.component.scss']
})
export class QuestsComponent implements OnInit {
    public userQuests$: Observable<IUserQuests>;
    public questsLoading$: Observable<boolean>;

    constructor(
        private questsFacade: QuestsFacade,
    ) {}

    ngOnInit() {
        this.questsFacade.loadUserQuests();
        this.userQuests$ = this.questsFacade.selectUserQuests$();
    }
}
