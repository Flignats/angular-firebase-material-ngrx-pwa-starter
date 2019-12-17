import { Action, createReducer, on } from '@ngrx/store';
import * as questsActions from './quests.actions';
import { QuestsStateDetails } from './quests.model';

export const initialState: QuestsStateDetails = {
    error: undefined,
    loading: false,
    quests: undefined,
    triggers: {
        collectQuest: undefined
    }
};

const featureReducer = createReducer(
    initialState,
    // Load User Quests
    on(questsActions.loadUserQuests, state => ({ ...state, loading: true })),
    on(questsActions.loadUserQuestsFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
    on(questsActions.loadUserQuestsSuccess, (state, { quests }) => ({
        ...state,
        quests,
        loading: false
    })),
    // Complete User Quest
    on(questsActions.completeQuest, state => ({
        ...state,
        triggers: {
            ...state.triggers,
            completeQuest: {
                action: questsActions.completeQuest.type,
                pending: true,
                error: undefined,
                success: undefined,
                successMsg: undefined
            }
        }
    })),
    on(questsActions.completeQuestFailure, (state, { error }) => ({
        ...state,
        triggers: {
            ...state.triggers,
            completeQuest: {
                pending: false,
                error
            }
        }
    })),
    on(questsActions.completeQuestSuccess, (state, { triggerStatus }) => ({
        ...state,
        triggers: {
            ...state.triggers,
            completeQuest: {
                ...triggerStatus
            }
        }
    }))
);

export function reducer(state: QuestsStateDetails | undefined, action: Action) {
    return featureReducer(state, action);
}
