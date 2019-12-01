import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { defaultBuildings } from '@app/core/models/game-data/buildings.models';

@Component({
    selector: 'app-world',
    templateUrl: './world.component.html',
    styleUrls: ['./world.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorldComponent implements OnInit {
    buildings = defaultBuildings;
    nodes: any[] = [];
    types = [
        'city',
        'sand',
        'stone',
        'water',
        'wood'
    ];

    constructor() {}

    public ngOnInit() {
        for (let index = 0; index < 594; index++) {
            const num = this.getRandomInt(5);
            const numLevel = this.getRandomInt(10) + 1;
            const data = {
                type: this.types[num],
                level: numLevel
            };
            this.nodes.push(data);
        }

        console.log('defaultBuildings:::', this.buildings);
    }

    public classStyler(node) {
        const classes = {
            ['world-node--city']: node.type === 'city',
            ['world-node--sand']: node.type === 'sand',
            ['world-node--stone']: node.type === 'stone',
            ['world-node--water']: node.type === 'water',
            ['world-node--wood']: node.type === 'wood',
        };

        return classes;
    }

    private getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
