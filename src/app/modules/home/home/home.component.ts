import { HomeFacade } from '@app/core/facades/home.facade';
import { Observable } from 'rxjs';
import { UserFacade } from '@app/core/facades/user.facade';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoreFacade } from '@app/core/facades/core.facade';
import { IUser } from '@app/modules/user/user.model';
import { IBuildings } from '../home.model';
import { MatDialog } from '@angular/material/dialog';
import { BuildModalComponent } from '../modals/build/build-modal.component';
import { BonusCollectModalComponent } from '@app/shared/modals/bonus-collect/bonus-collect.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
    public user$: Observable<IUser>;
    public userBuildings$: Observable<IBuildings>;

    animal: any;

    constructor(
        public dialog: MatDialog,
        private coreFacade: CoreFacade,
        private homeFacade: HomeFacade,
        private userFacade: UserFacade,
    ) {}

    public ngOnInit() {
        this.user$ = this.userFacade.selectUserAccount$();
        this.userBuildings$ = this.homeFacade.selectUserBuildings$();
    }

    public onModalOpen(node) {
        if (node.type === 'empty') {
            const options = {
                width: 'auto',
                data: { name: 'MODAL NAME', animal: 'ANIMAL!' }
            };
            this.openModal(BuildModalComponent, options);
        }
    }

    public onNewPlayerBonus(displayName) {
        const dialogExists = this.dialog.openDialogs.find(matDialog => matDialog.id === 'modal-new-player');
        if (dialogExists) { return true; }
        const options = {
            width: 'auto',
            data: { name: displayName, bonus: {
                sand: 500,
                stone: 200,
                water: 350,
                wood: 600
            }},
            id: 'modal-new-player'
        };

        this.openModal(BonusCollectModalComponent, options);
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
            this.animal = result;
            console.log('The dialog was closed:::', this.animal);
        });
    }
}
