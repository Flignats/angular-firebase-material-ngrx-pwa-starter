import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FEATURE_NAME, reducers } from './home.state';
import { HomeEffects } from './home.effects';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'app/shared/shared.module';
// Joyride
import { JoyrideModule } from 'ngx-joyride';
import { BuildingComponent } from './building/building.component';
import { BuildModalComponent } from './modals/build/build-modal.component';

@NgModule({
    declarations: [HomeComponent, BuildingComponent, BuildModalComponent],
    imports: [
        CommonModule,
        SharedModule,
        // HomeRoutingModule,
        JoyrideModule.forChild(),
        StoreModule.forFeature(FEATURE_NAME, reducers),
        EffectsModule.forFeature([HomeEffects])
    ],
    entryComponents: [BuildModalComponent]
})
export class HomeModule {}
