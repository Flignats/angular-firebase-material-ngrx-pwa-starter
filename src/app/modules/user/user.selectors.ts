import { createSelector } from '@ngrx/store';
import { selectUser, UserState } from './user.state';
import { IUser } from './user.model';

export const selectUserAccount = createSelector(
    selectUser,
    (state: UserState) => state.state.account
);

export const selectUserAccountDisplayName = createSelector(
    selectUserAccount,
    (state: IUser) => {
        if (state) {
            return state.displayName;
        } else {
            return null;
        }
    }
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
