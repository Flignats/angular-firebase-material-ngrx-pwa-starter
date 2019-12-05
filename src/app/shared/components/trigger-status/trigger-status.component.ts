import { Component, OnInit, Input } from '@angular/core';
import { ITriggerDetails } from '@app/core/models/triggers.models';

@Component({
    selector: 'app-trigger-status',
    templateUrl: './trigger-status.component.html',
    styleUrls: ['./trigger-status.component.scss']
})
export class TriggerStatusComponent implements OnInit {
    @Input() icon: string;
    @Input() defaultActionText: string;
    @Input() mode: string;
    @Input() trigger: ITriggerDetails;

    constructor() {}

    ngOnInit() {}
}
