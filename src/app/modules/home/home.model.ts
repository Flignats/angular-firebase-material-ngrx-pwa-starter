import { HttpErrorResponse } from '@angular/common/http';
import { Timestamp } from '@firebase/firestore-types';

export type BuildingTypes = 'empty' | 'main';

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
    nodes: INodes;
    uid: string;
    updatedAt: Timestamp;
}

export interface INodes {
    [key: string]: {
        level: number;
        node: number;
        type: BuildingTypes;
    };
}

export interface HomeStateDetails {
    error: HttpErrorResponse | string;
    loading: boolean;

    buildings: IBuildings;
    triggers: IHomeTriggers;
}
