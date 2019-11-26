import { Action, createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { AuthState, AuthedUser } from './auth.models';

export const initialState: AuthState = {
    error: undefined,
    isAuthenticated: false,
    isPending: false,
    displayName: undefined,
    email: undefined,
    emailVerified: false,
    phoneNumber: undefined,
    photoUrl: undefined,
    refreshToken: undefined,
    uid: undefined,
};

const reducer = createReducer(
    initialState,
    // Login & Register
    on(authActions.login, authActions.register, authActions.updateAuth, state => ({
        ...state,
        isPending: true
    })),
    on(authActions.loginFailure, authActions.registerFailure, authActions.updateAuthFailure, (state, { error }) => ({
        ...state,
        error,
        isPending: false
    })),
    on(authActions.loginSuccess, authActions.registerSuccess, authActions.updateAuthSuccess, (state, { authedUser }) => ({
        ...state,
        ...authedUser,
        isAuthenticated: true,
        isPending: false,
    })),
    // Logout
    on(authActions.logout, () => ({
        ...initialState
    })),
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
    return reducer(state, action);
}
