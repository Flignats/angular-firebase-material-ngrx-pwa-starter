import { HttpErrorResponse } from '@angular/common/http';
import { ITriggers, ITriggerDetails } from '@app/core/models/triggers.models';
import { IUserQuests } from '@shared-data/models/user-quests.model';

export interface IQuestTriggers {
    collectQuest: ITriggerDetails;
}

export interface QuestsStateDetails {
    error: HttpErrorResponse | string;
    loading: boolean;

    quests: IUserQuests;
    triggers: IQuestTriggers;
}
