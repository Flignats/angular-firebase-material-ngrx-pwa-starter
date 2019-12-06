import { Component, OnInit, Input } from '@angular/core';
import { IUserQuests, defaultQuests } from '@app/core/models/game-data/user-quests.model';

@Component({
    selector: 'app-quest-card',
    templateUrl: './quest-card.component.html',
    styleUrls: ['./quest-card.component.scss']
})
export class QuestCardComponent implements OnInit {
    // TODO: Update type
    @Input() quest: any;

    quests = defaultQuests;

    constructor() {}

    ngOnInit() {}
}
