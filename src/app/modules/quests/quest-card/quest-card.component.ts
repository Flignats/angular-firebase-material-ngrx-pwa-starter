import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { defaultQuests, IQuestDetails, IUserQuests } from '@shared-data/models/user-quests.model';
import { IQuestTriggers } from '../quests.model';

@Component({
    selector: 'app-quest-card',
    templateUrl: './quest-card.component.html',
    styleUrls: ['./quest-card.component.scss']
})
export class QuestCardComponent implements OnInit {
    @Input() quest: { key: string; value: IQuestDetails };
    @Input() triggers: IQuestTriggers;

    @Output() completeQuest = new EventEmitter<string>();

    public quests: Partial<IUserQuests>;

    constructor() {}

    public ngOnInit() {
        this.quests = defaultQuests;
    }

    public onCompleteQuest(questId) {
        this.completeQuest.emit(questId);
    }
}
