import { createAction, props } from '@ngrx/store';
import { IUserQuests } from '@app/core/models/game-data/user-quests.model';

export const loadUserQuests = createAction('[Quests] Load User Quests');
export const loadUserQuestsFailure = createAction('[Quests] Load User Quests => Failed', props<{ error: any }>());
export const loadUserQuestsSuccess = createAction('[Quests] Load User Quests => Succeeded', props<{ quests: IUserQuests }>());

export const completeQuest = createAction('[Quests] Complete Quest', props<{ questId: string }>());
export const completeQuestFailure = createAction('[Quests] Complete Quest => Failed', props<{ error: any }>());
export const completeQuestSuccess = createAction('[Quests] Complete Quest => Succeeded', props<{ quests: any }>());
