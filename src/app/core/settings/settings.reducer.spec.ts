import { initialState, settingsReducer } from './settings.reducer';

import {
    actionSettingsChangeLanguage,
    actionSettingsChangeTheme
} from './settings.actions';

describe('SettingsReducer', () => {
    it('should return default state', () => {
        const action = {} as any;
        const state = settingsReducer(undefined, action);
        expect(state).toBe(initialState);
    });

    it('should update language', () => {
        const action = actionSettingsChangeLanguage({ language: 'es' });
        const state = settingsReducer(undefined, action);
        expect(state.language).toEqual('sk');
    });

    it('should update theme', () => {
        const action = actionSettingsChangeTheme({ theme: 'dark' });
        const state = settingsReducer(undefined, action);
        expect(state.theme).toEqual('dark');
    });
});
