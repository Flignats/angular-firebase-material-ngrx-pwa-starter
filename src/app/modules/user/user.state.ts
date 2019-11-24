import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { reducer } from './user.reducers';
import { UserStateDetails } from './user.model';
import { AppState } from '@app/core/core.state';

export const FEATURE_NAME = 'user';
export const selectUser = createFeatureSelector<State, UserState>(FEATURE_NAME);

export const reducers: ActionReducerMap<UserState> = {
    state: reducer
};

export interface UserState {
    state: UserStateDetails;
}

export interface State extends AppState {
    user: UserState;
}
