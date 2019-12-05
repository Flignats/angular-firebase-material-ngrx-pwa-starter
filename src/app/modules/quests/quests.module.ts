import { SharedModule } from '@app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { QuestsRoutingModule } from './quests-routing.module';
import { QuestsComponent } from './quests/quests.component';
import { FEATURE_NAME, reducers } from '../quests/quests.state';
import { QuestsEffects } from './quests.effects';
import { QuestCardComponent } from './quest-card/quest-card.component';

@NgModule({
    declarations: [QuestsComponent, QuestCardComponent],
    imports: [
        CommonModule,
        QuestsRoutingModule,
        SharedModule,
        StoreModule.forFeature(FEATURE_NAME, reducers),
        EffectsModule.forFeature([QuestsEffects])
    ]
})
export class QuestsModule {}
