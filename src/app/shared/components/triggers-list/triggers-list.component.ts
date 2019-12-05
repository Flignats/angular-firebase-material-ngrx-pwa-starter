import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IUserTriggers } from '@app/modules/user/user.model';

@Component({
    selector: 'app-triggers-list',
    templateUrl: './triggers-list.component.html',
    styleUrls: ['./triggers-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TriggersListComponent implements OnInit {
    @Input() triggers: IUserTriggers;

    constructor() {}

    ngOnInit() {}
}
