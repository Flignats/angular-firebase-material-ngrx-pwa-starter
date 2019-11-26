import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '@app/modules/user/user.model';

@Component({
    selector: 'app-tour',
    templateUrl: './tour.component.html',
    styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
    @Input() user: IUser;

    @Output() startTour = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {
        if (!this.user.tours || !this.user.tours.hasCompletedHomeTour) {
            this.startTour.emit();
        }
    }
}
