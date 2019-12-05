import { HttpErrorResponse } from '@angular/common/http';
import { Timestamp } from '@firebase/firestore-types';
import { ITriggers, ITriggerDetails } from '@app/core/models/triggers.models';
import { BuildingIds } from '@app/core/models/game-data/buildings.models';
import { IUserResources } from '../user/user.model';
import { IUserQuests } from '@app/core/models/game-data/user-quests.model';

export interface IQuestTriggers {
    collectQuest: ITriggerDetails;
}

export interface QuestsStateDetails {
    error: HttpErrorResponse | string;
    loading: boolean;

    quests: IUserQuests;
    triggers: IQuestTriggers;
}
