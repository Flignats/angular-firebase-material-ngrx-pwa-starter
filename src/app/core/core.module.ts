// Angular
import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
// HTTP
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
// Firebase
import { FirestoreService } from './firestore/firestore.service';
// Notifications
import { NotificationService } from './notifications/notifications.service';
// Interceptors
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';
// App Error Handler
import { AppErrorHandler } from './error-handler/app-error-handler.service';
// Shared
import { SharedModule } from '../shared/shared.module';
import { TitleService } from './title/title.service';
import { LocalStorageService } from './local-storage/local-storage.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule, SharedModule],
    providers: [
        FirestoreService,
        NotificationService,
        TitleService,
        LocalStorageService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
        { provide: ErrorHandler, useClass: AppErrorHandler }
    ]
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import only in AppModule');
        }
    }
}
