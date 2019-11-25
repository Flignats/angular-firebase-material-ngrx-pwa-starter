import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoadedGuard } from '@app/core/guards/user-loaded/user-loaded.guard';
import { AuthGuard } from '@app/core/guards/auth-guard/auth-guard.guard';
import { DisplayNameComponent } from './display-name/display-name.component';
import { DisplayNameExistsGuard } from '@app/core/guards/display-name/display-name-exists.guard';

const routes: Routes = [
    {
        path: '',
        component: DisplayNameComponent,
        canActivate: [AuthGuard, DisplayNameExistsGuard],
        resolve: [UserLoadedGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DisplayNameRoutingModule {}
