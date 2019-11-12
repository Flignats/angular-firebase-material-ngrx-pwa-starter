import { createAction, props } from '@ngrx/store';
import { Authenticate } from './auth.models';

export const login = createAction(
    '[Auth] Login',
    props<{ auth: Authenticate }>()
);

export const loginFailure = createAction(
    '[Auth] Login => Fail',
    props<{ error: any }>()
);
// TODO: create interface for the payload
export const loginSuccess = createAction(
    '[Auth] Login => Success',
    props<{ authedUser: any }>()
);

export const register = createAction(
    '[Auth] Register',
    props<{ auth: Authenticate }>()
);

export const registerFailure = createAction(
    '[Auth] Register => Fail',
    props<{ error: any }>()
);
// TODO: create interface for the payload
export const registerSuccess = createAction(
    '[Auth] Register => Success',
    props<{ authedUser: any }>()
);

export const resetPassword = createAction(
    '[Auth] ResetPassword',
    props<{ email: string }>()
);

export const logout = createAction('[Auth] Logout');
