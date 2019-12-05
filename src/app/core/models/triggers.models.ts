import { HttpErrorResponse } from '@angular/common/http';

export interface ITriggers {
    [key: string]: {
        action?: string;
        buildingId?: string;
        error?: HttpErrorResponse | string;
        id?: string;
        level?: number;
        pending: boolean;
        success?: boolean;
        successMsg?: string;
    };
}

export interface ITriggerDetails {
    action?: string;
    buildingId?: string;
    error?: HttpErrorResponse | string;
    id?: string;
    level?: number;
    pending: boolean;
    success?: boolean;
    successMsg?: string;
}
