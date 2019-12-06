import { UserFacade } from '@app/modules/user/user.facade';
import { IUserTriggers } from '@app/modules/user/user.model';
import { CoreFacade } from '@app/core/facades/core.facade';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IUser } from '@shared-data/models/user.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public user$: Observable<IUser>;
    public userTriggers$: Observable<IUserTriggers>;

    constructor(
        private coreFacade: CoreFacade,
        public dialog: MatDialog,
        private router: Router,
        private userFacade: UserFacade,
    ) {}

    public navigation = [
        { link: 'about', label: 'navigation.about' },
        { link: 'home', label: 'navigation.home' },
        { link: 'quests', label: 'navigation.quests' },
        { link: 'settings', label: 'navigation.settings' },
        { link: 'world', label: 'navigation.world' },
    ];
    public navigationSideMenu = [...this.navigation];

    public ngOnInit() {
        this.user$ = this.userFacade.selectUserAccount$();
        this.userTriggers$ = this.userFacade.selectUserTriggers$();
    }

    public classStyler() {
        const classes = {
            ['grid-container--about']: this.router.url === '/about',
            ['grid-container--home']: this.router.url === '/home',
            ['grid-container--settings']: this.router.url === '/settings',
            ['grid-container--world']: this.router.url === '/world',
        };

        return classes;
    }
}
