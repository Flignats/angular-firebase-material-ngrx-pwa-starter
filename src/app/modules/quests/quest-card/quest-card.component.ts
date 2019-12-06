import { Component, OnInit, Input } from '@angular/core';
import { IUserQuests, defaultQuests } from '@shared-data/models/user-quests.model';

@Component({
    selector: 'app-quest-card',
    templateUrl: './quest-card.component.html',
    styleUrls: ['./quest-card.component.scss']
})
export class QuestCardComponent implements OnInit {
    // TODO: Update types
    @Input() quest: any;
    @Input() triggers: any;

    quests = defaultQuests;

    constructor() {}

    ngOnInit() {}
}
