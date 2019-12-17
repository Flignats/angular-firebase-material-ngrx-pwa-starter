import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-building',
    templateUrl: './building.component.html',
    styleUrls: ['./building.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingComponent implements OnInit {
    @Input() building: any;
    @Input() userBuildings: any;

    @Output() modalOpen = new EventEmitter();

    constructor() {}

    public ngOnInit() {}

    public classStyler(building) {
        const underConstruction = building.status === 'construction';

        const classes = {
            ['home_node_build']: building.status === 'empty',
            ['home_node_lock']: building.status === 'locked',
            ['home_node_main']: !underConstruction && building.buildingId === 'keep',
            ['home_1']: !underConstruction && building.buildingId === 'house',
            // Barracks
            ['home_barracks_resource_basic']: !underConstruction && building.buildingId === 'barracks_resource'
        };

        return classes;
    }

    public onModalOpen() {
        const modalData = {
            node: this.building.value,
            buildingsUnlocked: this.userBuildings.unlocked,
        };
        this.modalOpen.emit(modalData);
    }
}
