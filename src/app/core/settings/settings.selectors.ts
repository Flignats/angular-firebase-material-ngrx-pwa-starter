import { createSelector } from '@ngrx/store';
import { SettingsState } from './settings.model';
import { selectSettingsState } from '../core.state';

export const selectSettingsLanguage = createSelector(selectSettingsState, (state: SettingsState) => state.language);
export const selectTheme = createSelector(selectSettingsState, (state: SettingsState) => state.theme);
