import { IUser, IUserTriggers } from './user.model';
import { createAction, props } from '@ngrx/store';
import { ITriggers } from '@app/core/models/triggers.models';

export const loadUser = createAction('[User] Load User');
export const loadUserFailure = createAction('[User] Load User => Failed', props<{ error: any }>());
export const loadUserSuccess = createAction('[User] Load User => Succeeded', props<{ user: IUser }>());

/**
 * Trigger: Set User Display Name
 */
export const triggerSetDisplayName = createAction(
    '[User] Trigger: Set Display Name => Initiated',
    props<{ displayName: string }>()
);
export const triggerSetDisplayNameFailure = createAction(
    '[User] Trigger: Set Display Name => Failure',
    props<{ error: any }>()
);
export const triggerLoadStatusSetDisplayName = createAction('[User] Trigger: Load Set Display Name Status');
export const triggerLoadStatusSetDisplayNameSuccess = createAction(
    '[User] Trigger: Load Set Display Name Status => Success',
    props<{ triggerStatus: any }>()
);
export const triggerLoadStatusSetDisplayNameFailure = createAction(
    '[User] Trigger: Load Set Display Name Status => Failure',
    props<{ error: any }>()
);
