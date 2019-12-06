import { IUserTriggers } from './user.model';
import { createAction, props } from '@ngrx/store';
import { ITriggers } from '@app/core/models/triggers.models';
import { IUser } from '@shared-data/models/user.model';

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

/**
 * Trigger: Build
 */
export const triggerBuild = createAction(
    '[User] Trigger: Build => Initiated',
    props<{ buildingId: string; level: number; node: number }>()
);
export const triggerBuildFailure = createAction('[User] Trigger: Build => Failure', props<{ error: any }>());
export const triggerLoadStatusBuild = createAction('[User] Trigger: Build Status');
export const triggerLoadStatusBuildSuccess = createAction(
    '[User] Trigger: Build Status => Success',
    props<{ triggerStatus: any }>()
);

/**
 * Trigger: Collect Bonus
 */
export const triggerCompleteTourStep = createAction('[User] Trigger: Complete Tour Step => Initiated', props<{ id: string }>());
export const triggerCompleteTourStepFailure = createAction(
    '[User] Trigger: Complete Tour Step => Failure',
    props<{ error: any }>()
);
export const triggerLoadStatusCompleteTourStep = createAction('[User] Trigger: Load Complete Tour Step Status');
export const triggerLoadStatusCompleteTourStepSuccess = createAction(
    '[User] Trigger: Load Complete Tour Step Status => Success',
    props<{ triggerStatus: any }>()
);
