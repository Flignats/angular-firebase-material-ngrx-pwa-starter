import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'app/shared/shared.module';
import { TourComponent } from './tour/tour.component';
// Joyride
import { JoyrideModule } from 'ngx-joyride';

@NgModule({
    declarations: [HomeComponent, TourComponent],
    imports: [CommonModule, SharedModule, HomeRoutingModule, JoyrideModule.forChild()]
})
export class HomeModule {}
