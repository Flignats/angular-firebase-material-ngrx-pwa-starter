import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserLoadedGuard } from '@app/core/guards/userLoaded/user-loaded.guard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: [UserLoadedGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
