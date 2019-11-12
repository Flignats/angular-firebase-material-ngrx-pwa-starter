import { Action, createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { AuthState } from './auth.models';

export const initialState: AuthState = {
    error: undefined,
    uid: undefined,
    isAuthenticated: false,
    isPending: false
};

const reducer = createReducer(
    initialState,
    // Login
    on(authActions.login, authActions.register, state => ({
        ...state,
        isPending: true
    })),
    on(authActions.loginFailure, authActions.registerFailure, (state, { error }) => ({
        ...state,
        error,
        isPending: false
    })),
    on(authActions.loginSuccess, authActions.registerSuccess, (state, { authedUser }) => ({
        ...state,
        isAuthenticated: true,
        isPending: false,
        uid: authedUser.uid
    })),
    // Logout
    on(authActions.logout, () => ({
        ...initialState
    }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return reducer(state, action);
}
