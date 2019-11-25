import { HttpErrorResponse } from '@angular/common/http';
import { Timestamp } from '@firebase/firestore-types';
import { ITriggers } from '@app/core/models/triggers.models';

export interface IUser {
    createdAt: Timestamp;
    displayName?: string;
    email: string;
    fcmTokens?: { [token: string]: true };
    uid: string;
    updatedAt?: Timestamp;
}

export interface IUserTriggers {
    setDisplayName: {
        action?: string;
        pending?: boolean;
        error?: HttpErrorResponse | string;
        success?: boolean;
        successMsg?: string;
    };
}

export interface UserStateDetails {
    error: HttpErrorResponse | string;
    loading: boolean;

    account: IUser;
    triggers: IUserTriggers;
}
