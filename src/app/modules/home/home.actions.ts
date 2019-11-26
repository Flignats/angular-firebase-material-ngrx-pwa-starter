import { createAction, props } from '@ngrx/store';
import { IBuildings } from './home.model';

export const loadUserBuildings = createAction('[User] Load User Buildings');
export const loadUserBuildingsFailure = createAction('[User] Load User Buildings => Failed', props<{ error: any }>());
export const loadUserBuildingsSuccess = createAction('[User] Load User Buildings => Succeeded', props<{ buildings: IBuildings }>());
