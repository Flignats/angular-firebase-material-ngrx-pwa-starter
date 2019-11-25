import { HttpErrorResponse } from '@angular/common/http';

export interface ITriggers {
    [key: string]: {
        action?: string;
        pending: boolean;
        error: HttpErrorResponse | string;
        success?: boolean;
        successMsg?: string;
    };
}
