import { HttpErrorResponse } from '@angular/common/http';
import { ITriggerDetails } from '@app/core/models/triggers.models';
import { IUser } from '@shared-data/models/user.model';

export interface IUserTriggers {
    build: ITriggerDetails;
    setDisplayName: ITriggerDetails;
    tour: ITriggerDetails;
}

export interface UserStateDetails {
    error: HttpErrorResponse | string;
    loading: boolean;

    account: IUser;
    triggers: IUserTriggers;
}
