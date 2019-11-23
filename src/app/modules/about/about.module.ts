import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';

@NgModule({
    declarations: [AboutComponent],
    imports: [CommonModule, SharedModule, AboutRoutingModule]
})
export class AboutModule {}
