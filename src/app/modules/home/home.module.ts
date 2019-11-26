import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FEATURE_NAME, reducers } from './home.state';
import { HomeEffects } from './home.effects';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'app/shared/shared.module';
import { TourComponent } from './tour/tour.component';
// Joyride
import { JoyrideModule } from 'ngx-joyride';

@NgModule({
    declarations: [HomeComponent, TourComponent],
    imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule,
        JoyrideModule.forChild(),
        StoreModule.forFeature(FEATURE_NAME, reducers),
        EffectsModule.forFeature([HomeEffects])
    ]
})
export class HomeModule {}
