import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-build',
    templateUrl: './build-modal.component.html',
    styleUrls: ['./build-modal.component.scss']
})
export class BuildModalComponent {
    selections = {
        arsenal: false,
        assembly: false,
        bell_tower: false,
        house: {
            active: false,
            description:
                'Houses provide much needed comfort for your residents. Upgrade housing to increase your population.',
            title: 'House'
        },
        barracks_resource: {
            active: false,
            description:
                // tslint:disable-next-line: max-line-length
                'Barracks provide training to turn your population into productive units. Resource barracks specialize in training Resource Troops.',
            title: 'Barracks: Resource'
        },
        barracks_soldier: false,
        barracks_archer: false,
        barracks_dragon: false,
        pet: false,
        research: false,
        warehouse: false,
        watchtower: false
    };

    selected = undefined;

    constructor(
        public dialogRef: MatDialogRef<BuildModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSelectBuilding(selected) {
        for (const key in this.selections) {
            if (this.selections[key]) {
                this.selections[key].active = false;
            }
        }
        this.selections[selected].active = true;
        this.selected = this.selections[selected];
    }
}
