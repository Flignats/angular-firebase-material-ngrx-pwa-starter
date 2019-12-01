import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorldRoutingModule } from './world-routing.module';
import { WorldComponent } from './world/world.component';

@NgModule({
    declarations: [WorldComponent],
    imports: [CommonModule, WorldRoutingModule]
})
export class WorldModule {}
