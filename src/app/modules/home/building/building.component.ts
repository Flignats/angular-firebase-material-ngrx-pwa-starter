import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { INodes } from '../home.model';

@Component({
    selector: 'app-building',
    templateUrl: './building.component.html',
    styleUrls: ['./building.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingComponent implements OnInit {
    @Input() building: any;
    @Output() modalOpen = new EventEmitter();

    constructor() {}

    public ngOnInit() {}

    public classStyler(building) {
        const classes = {
            empty: building.type === 'empty',
            locked: building.type === 'locked'
        };

        return classes;
    }

    public onModalOpen() {
        this.modalOpen.emit(this.building.value);
    }
}
