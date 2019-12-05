import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-bonus-collect',
    templateUrl: './bonus-collect.component.html',
    styleUrls: ['./bonus-collect.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BonusCollectModalComponent implements OnInit {
    payload: { data: any; submit: any } = { data: undefined, submit: { id: 'new_player_bonus' } };

    constructor(
        public dialogRef: MatDialogRef<BonusCollectModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.payload.data = this.data;
    }
}
