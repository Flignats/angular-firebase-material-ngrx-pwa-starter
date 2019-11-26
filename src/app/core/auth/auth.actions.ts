import { createAction, props } from '@ngrx/store';
import { Authenticate, AuthedUser } from './auth.models';

export const login = createAction(
    '[Auth] Login',
    props<{ auth: Authenticate }>()
);

export const loginFailure = createAction(
    '[Auth] Login => Fail',
    props<{ error: any }>()
);

export const loginSuccess = createAction(
    '[Auth] Login => Success',
    props<{ authedUser: AuthedUser }>()
);

export const logout = createAction('[Auth] Logout');

export const register = createAction(
    '[Auth] Register',
    props<{ auth: Authenticate }>()
);

export const registerFailure = createAction(
    '[Auth] Register => Fail',
    props<{ error: any }>()
);

export const registerSuccess = createAction(
    '[Auth] Register => Success',
    props<{ authedUser: AuthedUser }>()
);

export const resetPassword = createAction(
    '[Auth] ResetPassword',
    props<{ email: string }>()
);

export const updateAuth = createAction(
    '[Auth] Update'
);

export const updateAuthFailure = createAction(
    '[Auth] Update => Fail',
    props<{ error: any }>()
);

export const updateAuthSuccess = createAction(
    '[Auth] Update => Success',
    props<{ authedUser: AuthedUser }>()
);
