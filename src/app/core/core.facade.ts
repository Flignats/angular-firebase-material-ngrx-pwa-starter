import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { login, register, resetPassword, logout } from './auth/auth.actions';
import { actionSettingsChangeLanguage, actionSettingsChangeTheme } from './settings/settings.actions';
import * as authSelectors from './auth/auth.selectors';
import * as settingsSelectors from './settings/settings.selectors';
import { Authenticate, AuthedUser } from './auth/auth.models';
import { Language } from './settings/settings.model';

@Injectable({
    providedIn: 'root'
})
export class CoreFacade {
    constructor(private store: Store<{}>) {}

    // Auth Actions
    public login(auth: Authenticate): void {
        this.store.dispatch(login({ auth }));
    }

    public logout(): void {
        this.store.dispatch(logout());
    }

    public register(auth: Authenticate): void {
        this.store.dispatch(register({ auth }));
    }

    public resetPassword(email: string): void {
        this.store.dispatch(resetPassword({ email }));
    }
    // Auth Selectors
    public selectAuthIsAuthenticated$(): Observable<boolean> {
        return this.store.select(authSelectors.selectIsAuthenticated);
    }
    public selectAuthError$(): Observable<any> {
        return this.store.select(authSelectors.selectError);
    }
    public selectAuthIsPending$(): Observable<boolean> {
        return this.store.select(authSelectors.selectIsPending);
    }
    public selectUid$(): Observable<string> {
        return this.store.select(authSelectors.selectUid);
    }

    // Settings Actions
    public changeLanguage(language: Language): void {
        this.store.dispatch(actionSettingsChangeLanguage({ language }));
    }

    public changeTheme(theme: string): void {
        this.store.dispatch(actionSettingsChangeTheme({ theme }));
    }
    // Settings Selectors
    public selectSettingsLanguage$(): Observable<string> {
        return this.store.select(settingsSelectors.selectSettingsLanguage);
    }
    public selectTheme$(): Observable<string> {
        return this.store.select(settingsSelectors.selectTheme);
    }
}
