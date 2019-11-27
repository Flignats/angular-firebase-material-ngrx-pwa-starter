import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Translation
import { TranslateModule } from '@ngx-translate/core';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';


// Components
import { AuthFormComponent } from './auth-form/auth-form.component';

@NgModule({
    declarations: [AuthFormComponent],
    imports: [
        CommonModule,
        // Forms
        FormsModule,
        ReactiveFormsModule,
        // Translations
        TranslateModule,
        // Material
        MatButtonModule,
        MatToolbarModule,
        MatSelectModule,
        MatTabsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatCardModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatProgressBarModule,
        MatDialogModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        MatButtonModule,
        MatMenuModule,
        MatTabsModule,
        MatChipsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatCardModule,
        MatSidenavModule,
        MatListModule,
        MatSelectModule,
        MatToolbarModule,
        MatIconModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatProgressBarModule,
        MatDialogModule,
        MatDatepickerModule,
        AuthFormComponent
    ]
})
export class SharedModule {}
