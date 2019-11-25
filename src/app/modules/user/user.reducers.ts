import { Action, createReducer, on } from '@ngrx/store';
import { UserStateDetails } from './user.model';
import * as userActions from './user.actions';

export const initialState: UserStateDetails = {
    error: undefined,
    loading: false,
    account: undefined,
    triggers: undefined
};

const featureReducer = createReducer(
    initialState,
    // Load User
    on(userActions.loadUser, state => ({ ...state, loading: true })),
    on(userActions.loadUserFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
    on(userActions.loadUserSuccess, (state, { user }) => ({
        ...state,
        account: user,
        loading: false
    })),
    // Trigger: Set Display Name
    on(userActions.triggerSetDisplayName, state => ({
        ...state,
        triggers: {
            ...state.triggers,
            setDisplayName: {
                action: userActions.triggerSetDisplayName.type,
                pending: true,
                error: undefined,
                success: undefined,
                successMsg: undefined,
            }
        }
    })),
    on(userActions.triggerSetDisplayNameFailure, (state, { error }) => ({
        ...state,
        triggers: {
            ...state.triggers,
            setDisplayName: {
                pending: false,
                error,
            }
        }
    })),
    on(userActions.triggerLoadStatusSetDisplayNameFailure, (state, { error }) => ({
        ...state,
        triggers: {
            ...state.triggers,
            setDisplayName: {
                pending: false,
                error,
            }
        }
    })),
    on(userActions.triggerLoadStatusSetDisplayNameSuccess, (state, { triggerStatus }) => ({
        ...state,
        triggers: {
            setDisplayName: {
                ...triggerStatus
            }
        }
    })),
);

export function reducer(state: UserStateDetails | undefined, action: Action) {
    return featureReducer(state, action);
}
