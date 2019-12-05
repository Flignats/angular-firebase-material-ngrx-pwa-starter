import { HttpErrorResponse } from '@angular/common/http';
import { Timestamp } from '@firebase/firestore-types';

export interface IHomeTriggers {
    upgradeNode: {
        action?: string;
        pending?: boolean;
        error?: HttpErrorResponse | string;
        success?: boolean;
        successMsg?: string;
    };
}

export interface IBuildings {
    createdAt: Timestamp;
    hasCreatedFirstBuilding: boolean;
    nodes: INodes;
    uid: string;
    updatedAt: Timestamp;
}

export type BuildingIds =
    | 'arsenal'
    | 'assembly'
    | 'barracks'
    | 'flight_tower'
    | 'furnace'
    | 'house'
    | 'keep'
    | 'thinktank'
    | 'warehouse'
    | 'watchtower';

export type BuildingStatus = 'construction' | 'empty' | 'locked' | 'occupied';

export interface INodes {
    [key: string]: {
        buildingId: BuildingIds;
        level: number;
        node: number;
        status: BuildingStatus;
    };
}

export interface HomeStateDetails {
    error: HttpErrorResponse | string;
    loading: boolean;

    buildings: IBuildings;
    triggers: IHomeTriggers;
}
