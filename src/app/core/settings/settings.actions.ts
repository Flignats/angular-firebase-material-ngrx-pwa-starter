import { createAction, props } from '@ngrx/store';

import { Language } from './settings.model';

export const actionSettingsChangeLanguage = createAction('[Settings] Change Language', props<{ language: Language }>());
export const actionSettingsChangeTheme = createAction('[Settings] Change Theme', props<{ theme: string }>());
