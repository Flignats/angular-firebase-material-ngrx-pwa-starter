import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ITriggerDetails } from '@app/core/models/triggers.models';
import { IUserTaskDetails } from '@shared-data/models/user.model';

@Component({
    selector: 'app-trigger-status',
    templateUrl: './trigger-status.component.html',
    styleUrls: ['./trigger-status.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TriggerStatusComponent implements OnInit {
    @Input() actionText = '';
    @Input() icon: string;
    @Input() defaultActionText: string;
    @Input() mode: string;
    @Input() trigger: ITriggerDetails;
    @Input() task: IUserTaskDetails;

    progressValue: number;
    now = new Date();
    timer;

    startedAt = 0;
    completesAt = 0;
    timeRemaining = 0;
    totalTime = 0;

    constructor() {}

    ngOnInit() {
        if (this.task && this.task.active) {
            this.showTaskCountdown(this.task);
        }
    }

    logThis(trigger) {
        console.log('trigger:::', trigger);
    }

    showTaskCountdown(task: IUserTaskDetails) {
        this.startedAt = task.startedAt.toDate().valueOf();
        this.completesAt = task.completesAt.toDate().valueOf();
        this.totalTime = (this.completesAt - this.startedAt) / 60000;


        this.timer = setInterval(() => {
            this.now = new Date();
            this.timeRemaining = (this.completesAt - this.now.valueOf()) / 60000;
            this.progressValue = (1 - (this.timeRemaining / this.totalTime)) * 100;
            this.actionText = this.progressValue.toString().slice(0, 5) + '%';
        }, 1000);
    }
}
