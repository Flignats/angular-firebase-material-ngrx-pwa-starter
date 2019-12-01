import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-bonus-collect',
    templateUrl: './bonus-collect.component.html',
    styleUrls: ['./bonus-collect.component.scss']
})
export class BonusCollectModalComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<BonusCollectModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {}
}
