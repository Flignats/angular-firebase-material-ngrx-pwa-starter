import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '@app/modules/user/user.model';

@Component({
    selector: 'app-tour',
    templateUrl: './tour.component.html',
    styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
    @Input() user: IUser;

    @Output() newPlayerBonus = new EventEmitter<string>();

    constructor() {}

    ngOnInit() {
        // Launch New Player Bonus
        if (!this.user.tours || !this.user.tours.hasCollectedNewPlayerBonus) {
            this.newPlayerBonus.emit(this.user.displayName);
        }
    }
}
