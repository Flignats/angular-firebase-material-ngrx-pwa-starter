import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserLoadedGuard } from '@app/core/guards/user-loaded/user-loaded.guard';
import { AuthGuard } from '@app/core/guards/auth-guard/auth-guard.guard';
import { DisplayNameGuard } from '@app/core/guards/display-name/display-name.guard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard, DisplayNameGuard],
        resolve: [UserLoadedGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
