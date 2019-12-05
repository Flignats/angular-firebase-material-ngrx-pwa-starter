import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { reducer } from './quests.reducers';
import { AppState } from '@app/core/core.state';
import { QuestsStateDetails } from './quests.model';

export const FEATURE_NAME = 'quests';
export const selectQuests = createFeatureSelector<State, QuestsState>(FEATURE_NAME);

export const reducers: ActionReducerMap<QuestsState> = {
    state: reducer
};

export interface QuestsState {
    state: QuestsStateDetails;
}

export interface State extends AppState {
    quests: QuestsState;
}
