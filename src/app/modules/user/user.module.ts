import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FEATURE_NAME, reducers } from './user.state';
import { UserEffects } from './user.effects';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(FEATURE_NAME, reducers),
        EffectsModule.forFeature([UserEffects])
    ]
})
export class UserModule { }
