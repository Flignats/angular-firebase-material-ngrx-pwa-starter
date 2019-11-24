import { HttpErrorResponse } from '@angular/common/http';
import { Timestamp } from '@firebase/firestore-types';

export interface IUser {
    createdAt: Timestamp;
    displayName?: string;
    email: string;
    fcmTokens?: { [token: string]: true };
    uid: string;
    updatedAt?: Timestamp;
}

export interface UserStateDetails {
    error: HttpErrorResponse | string;
    loading: boolean;

    account: IUser;
}
