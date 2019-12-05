import { Component, OnInit, Input } from '@angular/core';
import { IUserQuests } from '@app/core/models/game-data/user-quests.model';

@Component({
    selector: 'app-quest-card',
    templateUrl: './quest-card.component.html',
    styleUrls: ['./quest-card.component.scss']
})
export class QuestCardComponent implements OnInit {
    // TODO: Update type
    @Input() quest: any;

    public questDetails = {
        house_a: {
            id: 'house_a',
            headline: 'Build 1 House',
            description: 'Get started by building your first house.',
        },
        house_b: {
            id: 'house_b',
            headline: 'Upgrading Houses',
            description: 'Build a level 3 house.',
        },
        house_c: {
            id: 'house_c',
            headline: '3 Houses',
            description: 'Have 3 houses in your town.',
        },
    };

    constructor() {}

    ngOnInit() {}
}
