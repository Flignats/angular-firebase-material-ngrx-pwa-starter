import { Component, OnInit, Input, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-basic',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicModalComponent implements OnInit {
    payload: { data: any; submit: any } = { data: undefined, submit: { id: undefined } };

    constructor(
        public dialogRef: MatDialogRef<BasicModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.payload.data = this.data;
        this.payload.submit.id = data.id;
    }

    ngOnInit() {}
}
