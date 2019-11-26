import { createSelector } from '@ngrx/store';
import { selectHome, HomeState } from './home.state';

export const selectUserBuildings = createSelector(
    selectHome,
    (state: HomeState) => state.state.buildings
);

export const selectHomeError = createSelector(
    selectHome,
    (state: HomeState) => state.state.error
);

export const selectHomeLoading = createSelector(
    selectHome,
    (state: HomeState) => state.state.loading
);

export const selectHomeTriggers = createSelector(
    selectHome,
    (state: HomeState) => state.state.triggers
);
