import { createSelector } from '@ngrx/store';
import { selectUser, UserState } from './user.state';

export const selectUserAccount = createSelector(
    selectUser,
    (state: UserState) => state.state.account
);

export const selectUserError = createSelector(
    selectUser,
    (state: UserState) => state.state.error
);

export const selectUserLoading = createSelector(
    selectUser,
    (state: UserState) => state.state.loading
);

export const selectUserTriggers = createSelector(
    selectUser,
    (state: UserState) => state.state.triggers
);
