import { createSelector } from '@ngrx/store';
import { QuestsState, selectQuests } from './quests.state';

export const selectUserQuests = createSelector(
    selectQuests,
    (state: QuestsState) => state.state.quests
);

export const selectQuestsError = createSelector(
    selectQuests,
    (state: QuestsState) => state.state.error
);

export const selectQuestsLoading = createSelector(
    selectQuests,
    (state: QuestsState) => state.state.loading
);

export const selectQuestsTriggers = createSelector(
    selectQuests,
    (state: QuestsState) => state.state.triggers
);
