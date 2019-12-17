import { createAction, props } from '@ngrx/store';
import { IUserQuests } from '@shared-data/models/user-quests.model';

export const loadUserQuests = createAction('[Quests] Load User Quests');
export const loadUserQuestsFailure = createAction('[Quests] Load User Quests => Failed', props<{ error: any }>());
export const loadUserQuestsSuccess = createAction(
    '[Quests] Load User Quests => Succeeded',
    props<{ quests: IUserQuests }>()
);

export const completeQuest = createAction('[Quests] Complete Quest', props<{ questId: string }>());
export const completeQuestFailure = createAction('[Quests] Complete Quest => Failed', props<{ error: any }>());
export const completeQuestSuccess = createAction(
    '[Quests] Trigger: Complete Quest => Success',
    props<{ triggerStatus: any }>()
);
export const loadStatusCompleteQuest = createAction('[Quests] Trigger: Complete Quest Status');
