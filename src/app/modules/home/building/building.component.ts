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
            ['home_node_build']: building.type === 'empty',
            ['home_node_lock']: building.type === 'locked',
            ['home_node_main']: building.type === 'main'
        };

        return classes;
    }

    public onModalOpen() {
        this.modalOpen.emit(this.building.value);
    }
}
