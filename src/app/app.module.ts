import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

// Core
import { CoreModule } from './core/core.module';
import { CustomSerializer } from './core/router/custom-serializer';
import { reducers, metaReducers } from './core/core.state';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// i18n
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from './shared/shared.module';
import { AuthEffects } from './core/auth/auth.effects';
import { GoogleAnalyticsEffects } from './core/google-analytics/google-analytics.effects';
import { SettingsEffects } from './core/settings/settings.effects';

// Joyride
import { JoyrideModule } from 'ngx-joyride';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        CoreModule,
        SharedModule,
        AppRoutingModule,
        // Tour guide
        JoyrideModule.forRoot(),
        // i18n
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([AuthEffects, SettingsEffects, GoogleAnalyticsEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, name: 'cryptorts' })
    ],
    providers: [
        { provide: RouterStateSerializer, useClass: CustomSerializer },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: { hasBackdrop: true, closeOnNavigation: false, disableClose: true, panelClass: 'default-theme' }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, `${environment.i18nPrefix}/assets/i18n/`, '.json');
}
