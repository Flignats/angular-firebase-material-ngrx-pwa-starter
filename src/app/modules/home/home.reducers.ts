import { Action, createReducer, on } from '@ngrx/store';
import * as homeActions from './home.actions';
import { HomeStateDetails } from './home.model';

export const initialState: HomeStateDetails = {
    error: undefined,
    loading: false,
    buildings: undefined,
    triggers: undefined
};

const featureReducer = createReducer(
    initialState,
    // Load User Buildings
    on(homeActions.loadUserBuildings, state => ({ ...state, loading: true })),
    on(homeActions.loadUserBuildingsFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
    on(homeActions.loadUserBuildingsSuccess, (state, { buildings }) => ({
        ...state,
        buildings,
        loading: false
    })),
);

export function reducer(state: HomeStateDetails | undefined, action: Action) {
    return featureReducer(state, action);
}
