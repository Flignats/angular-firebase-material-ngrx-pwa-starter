import { CoreFacade } from '@app/core/facades/core.facade';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BonusCollectModalComponent } from './shared/modals/bonus-collect/bonus-collect.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private coreFacade: CoreFacade,
        public dialog: MatDialog,
        private router: Router,
    ) {}
    public navigation = [
        { link: 'about', label: 'navigation.about' },
        { link: 'home', label: 'navigation.home' },
        { link: 'settings', label: 'navigation.settings' },
        { link: 'world', label: 'navigation.world' },
    ];
    public navigationSideMenu = [...this.navigation];

    animal: any;

    public classStyler() {
        const classes = {
            ['grid-container--about']: this.router.url === '/about',
            ['grid-container--home']: this.router.url === '/home',
            ['grid-container--settings']: this.router.url === '/settings',
            ['grid-container--world']: this.router.url === '/world',
        };

        return classes;
    }

    public onModalOpenBonus(node) {
        // if (node.type === 'new_player_bonus') {
        //     const options = {
        //         width: '966px',
        //         data: { name: 'MODAL NAME', animal: 'ANIMAL!' }
        //     };
        //     this.openModal(BonusCollectModalComponent, options);
        // }
    }

    private openModal(component, options) {
        // const dialogRef = this.dialog.open(BuildModalComponent, {
        //     width: '966px',
        //     data: { name: 'MODAL NAME', animal: 'ANIMAL!' }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed:::', this.animal);
        //     this.animal = result;
        // });
        const dialogRef = this.dialog.open(component, options);
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed:::', this.animal);
            this.animal = result;
        });
    }
}
