import { createSelector } from '@ngrx/store';
import { selectAuthState } from '../core.state';
import { AuthState } from './auth.models';

export const selectError = createSelector(selectAuthState, (state: AuthState) => state.error);
export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.isAuthenticated
);
export const selectIsPending = createSelector(selectAuthState, (state: AuthState) => state.isPending);
export const selectUid = createSelector(selectAuthState, (state: AuthState) => state.uid);
