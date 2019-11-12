import { SettingsState } from './settings/settings.model';
import { ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './router/router.state';
import { environment } from '../../environments/environment';
import { debug } from './meta-reducers/debug.reducer';
import { authReducer } from './auth/auth.reducers';
import { AuthState } from './auth/auth.models';
import { settingsReducer } from './settings/settings.reducer';

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    router: routerReducer,
    settings: settingsReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

if (!environment.production) {
    metaReducers.unshift(debug);
}

export const selectAuthState = createFeatureSelector<AppState, AuthState>('auth');
export const selectRouterState = createFeatureSelector<AppState, RouterReducerState<RouterStateUrl>>('router');
export const selectSettingsState = createFeatureSelector<AppState, SettingsState>('settings');

export interface AppState {
    auth: AuthState;
    router: RouterReducerState<RouterStateUrl>;
    settings: SettingsState;
}
