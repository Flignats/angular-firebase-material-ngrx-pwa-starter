import { QuestsComponent } from './quests/quests.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth-guard/auth-guard.guard';
import { DisplayNameGuard } from '@app/core/guards/display-name/display-name.guard';
import { UserLoadedGuard } from '@app/core/guards/user-loaded/user-loaded.guard';

const routes: Routes = [
    {
        path: '',
        component: QuestsComponent,
        // canActivate: [AuthGuard, DisplayNameGuard],
        // resolve: [UserLoadedGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestsRoutingModule { }
