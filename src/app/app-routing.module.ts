import { UserBuildingsLoadedGuard } from '@app/core/guards/user-buildings-loaded/user-buildings-loaded.guard';
import { UserLoadedGuard } from '@app/core/guards/user-loaded/user-loaded.guard';
import { DisplayNameGuard } from '@app/core/guards/display-name/display-name.guard';
import { AuthGuard } from '@app/core/guards/auth-guard/auth-guard.guard';
import { HomeComponent } from './modules/home/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
    },
    {
        path: 'about',
        loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)
    },
    {
        path: 'display-name',
        loadChildren: () => import('./modules/display-name/display-name.module').then(m => m.DisplayNameModule)
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard, DisplayNameGuard],
        resolve: [UserLoadedGuard, UserBuildingsLoadedGuard]
        // loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'quests',
        loadChildren: () => import('./modules/quests/quests.module').then(m => m.QuestsModule)
    },
    {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
    },
    {
        path: 'world',
        loadChildren: () => import('./modules/world/world.module').then(m => m.WorldModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
