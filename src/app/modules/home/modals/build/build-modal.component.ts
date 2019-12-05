import { defaultBuildings } from '@app/core/models/game-data/buildings.models';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-build',
    templateUrl: './build-modal.component.html',
    styleUrls: ['./build-modal.component.scss']
})
export class BuildModalComponent implements OnInit {
    buildings: any;
    payload: { data: any; submit: any; } = { data: undefined, submit: undefined };
    selections = {
        arsenal: {
            active: false,
            description:
                'Arsenals provide the ability to store weapons, equipment, and research / train higher level troops.',
            id: 'arsenal',
            title: 'Arsenal'
        },
        assembly: {
            active: false,
            description:
                'The Assembly Point provides the ability to send additional / higher troop count marches.',
            id: 'assembly',
            title: 'Assembly Point'
        },
        flight_tower: {
            active: false,
            description:
                'Bell Towers provide the capability to research ranged and flight abilities as well as train higher level troops.',
            id: 'assembly',
            title: 'Bell Tower'
        },
        house: {
            active: true,
            description:
                'Houses provide much needed comfort for your residents. Upgrade housing to increase your population.',
            id: 'house',
            title: 'House'
        },
        barracks_worker: {
            active: false,
            description:
                // tslint:disable-next-line: max-line-length
                'Barracks provide training to turn your population into productive units. Resource barracks specialize in training Resource Troops.',
            id: 'barracks',
            title: 'Barracks: Resource'
        },
        barracks_soldier: {
            active: false,
            description:
                // tslint:disable-next-line: max-line-length
                'Barracks provide training to turn your population into productive units. Ground barracks specialize in training Ground Troops.',
            id: 'barracks',
            title: 'Barracks: Ground'
        },
        barracks_archer: {
            active: false,
            description:
                // tslint:disable-next-line: max-line-length
                'Barracks provide training to turn your population into productive units. Ranged barracks specialize in training Ranged Troops.',
            id: 'barracks',
            title: 'Barracks: Ranged'
        },
        barracks_magic: {
            active: false,
            description:
                // tslint:disable-next-line: max-line-length
                'Barracks provide training to turn your population into productive units. Magic barracks specialize in training Magic Troops.',
            id: 'barracks',
            title: 'Barracks: Magic'
        },
        // pet: {
        //     active: false,
        //     description:
        //         // tslint:disable-next-line: max-line-length
        //         'Barracks provide training to turn your population into productive units. Pet barracks specialize in training Pets.',
        //     id: 'pet',
        //     title: 'Barracks: Pet'
        // },
        furnace: {
            active: false,
            description:
                // tslint:disable-next-line: max-line-length
                'The Furnaces enables higher levels of research and training.',
            id: 'furnace',
            title: 'Furnace'
        },
        research: {
            active: false,
            description:
                // tslint:disable-next-line: max-line-length
                'The Research Center is vital to improving your troops, buildings, and resource collection.',
            id: 'thinktank',
            title: 'Research Center'
        },
        warehouse: {
            active: false,
            description:
                // tslint:disable-next-line: max-line-length
                'A Warehouse provides a safe way to store resources away from enemies.',
            id: 'warehouse',
            title: 'Warehouse'
        },
        watchtower: {
            active: false,
            description:
                // tslint:disable-next-line: max-line-length
                'The Watchtower provides the ability to detect incoming enemies and better defend your city.',
            id: 'watchtower',
            title: 'Watchtower'
        }
    };
    selected = undefined;

    constructor(
        public dialogRef: MatDialogRef<BuildModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.buildings = defaultBuildings;
        this.onSelectBuilding('house');
    }

    onSelectBuilding(selected) {
        // Deactivate previous selected building
        for (const key in this.selections) {
            if (this.selections[key]) {
                this.selections[key].active = false;
            }
        }
        // Activate selected building
        this.selections[selected].active = true;
        // Assign selected to update view
        this.selected = this.selections[selected];
        // Payload for the modal to act on when closed
        this.payload.submit = {
            ...this.buildings[this.selected.id].a,
            buildingId: this.selected.id,
            id: 'building_new',
            node: this.data.node
        };
    }
}
