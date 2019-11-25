import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayNameComponent } from './display-name/display-name.component';
import { SharedModule } from '@app/shared/shared.module';
import { DisplayNameRoutingModule } from './display-name-routing.module';

@NgModule({
    declarations: [DisplayNameComponent],
    imports: [CommonModule, SharedModule, DisplayNameRoutingModule]
})
export class DisplayNameModule {}
