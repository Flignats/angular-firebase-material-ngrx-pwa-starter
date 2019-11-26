import { HomeStateDetails } from './home.model';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { reducer } from './home.reducers';
import { AppState } from '@app/core/core.state';

export const FEATURE_NAME = 'home';
export const selectHome = createFeatureSelector<State, HomeState>(FEATURE_NAME);

export const reducers: ActionReducerMap<HomeState> = {
    state: reducer
};

export interface HomeState {
    state: HomeStateDetails;
}

export interface State extends AppState {
    home: HomeState;
}
