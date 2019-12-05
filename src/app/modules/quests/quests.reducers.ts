import { Action, createReducer, on } from '@ngrx/store';
import * as questsActions from './quests.actions';
import { QuestsStateDetails } from './quests.model';

export const initialState: QuestsStateDetails = {
    error: undefined,
    loading: false,
    quests: undefined,
    triggers: {
        collectQuest: undefined
    },
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
);

export function reducer(state: QuestsStateDetails | undefined, action: Action) {
    return featureReducer(state, action);
}
