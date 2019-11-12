import { ActivationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { tap, map, distinctUntilChanged, filter } from 'rxjs/operators';

// import { LocalStorageService } from '../local-storage/local-storage.service';
import { TitleService } from '../title/title.service';

import {
    actionSettingsChangeLanguage,
    actionSettingsChangeTheme,
} from './settings.actions';
import {
    selectSettingsLanguage,
} from './settings.selectors';
import { State } from './settings.model';

export const SETTINGS_KEY = 'SETTINGS';

@Injectable()
export class SettingsEffects {
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private router: Router,
        private overlayContainer: OverlayContainer,
        // private localStorageService: LocalStorageService,
        private titleService: TitleService,
        private translateService: TranslateService
    ) {}

    // persistSettings = createEffect(
    //     () =>
    //         this.actions$.pipe(
    //             ofType(
    //                 actionSettingsChangeLanguage,
    //                 actionSettingsChangeTheme
    //             ),
    //             withLatestFrom(this.store.pipe(select(selectSettingsState))),
    //             tap(([action, settings]) => this.localStorageService.setItem(SETTINGS_KEY, settings))
    //         ),
    //     { dispatch: false }
    // );

    updateTheme = createEffect(() =>
        this.actions$.pipe(
            ofType(actionSettingsChangeTheme),
            map(action => {
                const classList = this.overlayContainer.getContainerElement().classList;
                const toRemove = Array.from(classList).filter((item: string) => item.includes('-theme'));
                if (toRemove.length) {
                    classList.remove(...toRemove);
                }
                classList.add(action.theme);
            }),
        ),
        { dispatch: false }
    );

    setTranslateServiceLanguage = createEffect(() =>
        this.store.pipe(
            select(selectSettingsLanguage),
            distinctUntilChanged(),
            tap(language => this.translateService.use(language))
        ),
        { dispatch: false }
    );

    setTitle = createEffect(() =>
        merge(
            this.actions$.pipe(ofType(actionSettingsChangeLanguage)),
            this.router.events.pipe(filter(event => event instanceof ActivationEnd))
        ).pipe(
            tap(() => {
                this.titleService.setTitle(this.router.routerState.snapshot.root, this.translateService);
            })
        ),
        { dispatch: false }
    );
}
