import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { IUser } from '@app/modules/user/user.model';

@Component({
    selector: 'app-tour',
    templateUrl: './tour.component.html',
    styleUrls: ['./tour.component.scss']
})
export class TourComponent implements  OnChanges {
    @Input() user: IUser;

    @Output() newPlayerBonus = new EventEmitter<string>();
    @Output() tourQuestsIntro = new EventEmitter<any>();

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        for (const propName in changes) {
            if (changes) {
                const chng = changes[propName];
                const cur = chng.currentValue;
                this.checkTour(cur);
            }
        }
    }

    private checkTour(data) {
        // Launch New Player Bonus
        if (this.user.tours.isPendingNewPlayerBonus) {
            this.newPlayerBonus.emit(this.user.displayName);
        } else if (this.user.tours.isPendingQuestsIntro) {
            // Launch [STEP AFTER BUILDING FIRST HOUSE]
            this.tourQuestsIntro.emit();
        } else {
            return;
        }
    }
}
