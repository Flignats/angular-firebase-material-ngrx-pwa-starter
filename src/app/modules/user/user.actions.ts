import { IUser } from './user.model';
import { createAction, props } from '@ngrx/store';

export const loadUser = createAction('[User] Load User');
export const loadUserFailure = createAction('[User] Load User => Failed', props<{error: any}>());
export const loadUserSuccess = createAction('[User] Load User => Succeeded', props<{user: IUser}>());
