import { Action, createReducer, on } from '@ngrx/store';
import { UserStateDetails } from './user.model';
import * as userActions from './user.actions';

export const initialState: UserStateDetails = {
    error: undefined,
    loading: false,
    account: undefined,
};

const featureReducer = createReducer(
    initialState,
    on(userActions.loadUser, state => ({ ...state, loading: true })),
    on(userActions.loadUserFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false,
    })),
    on(userActions.loadUserSuccess, (state, { user }) => ({
        ...state,
        account: user,
        loading: false,
    })),
);

export function reducer(state: UserStateDetails | undefined, action: Action): UserStateDetails {
    return featureReducer(state, action);
}
