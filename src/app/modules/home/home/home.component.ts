import { HomeFacade } from '@app/core/facades/home.facade';
import { Observable } from 'rxjs';
import { UserFacade } from '@app/modules/user/user.facade';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoreFacade } from '@app/core/facades/core.facade';
import { IBuildings } from '../home.model';
import { MatDialog } from '@angular/material/dialog';
import { BuildModalComponent } from '../modals/build/build-modal.component';
import { BonusCollectModalComponent } from '@app/shared/modals/bonus-collect/bonus-collect.component';
import { BasicModalComponent } from '@app/shared/modals/basic/basic.component';
import { Router } from '@angular/router';
import { IUser } from '@shared-data/models/user.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
    public user$: Observable<IUser>;
    public userBuildings$: Observable<IBuildings>;

    constructor(
        public dialog: MatDialog,
        private coreFacade: CoreFacade,
        private homeFacade: HomeFacade,
        private userFacade: UserFacade,
        private router: Router,
    ) {}

    public ngOnInit() {
        this.user$ = this.userFacade.selectUserAccount$();
        this.userBuildings$ = this.homeFacade.selectUserBuildings$();
    }

    // Used to open from building cell
    public onModalOpen(modalData) {
        const options = {
            width: 'auto',
            data: undefined
        };
        if (modalData.node.status === 'empty') {
            options.data = { name: 'MODAL NAME', buildingsUnlocked: modalData.buildingsUnlocked, node: modalData.node.node };
            this.openModal(BuildModalComponent, options);
        }
    }

    // Tour Events
    public onNewPlayerBonus(displayName) {
        // exit if the new player bonus modal is already open
        const dialogExists = this.dialog.openDialogs.find(matDialog => matDialog.id === 'modal-new-player');
        if (dialogExists) {
            return true;
        }

        const options = {
            width: 'auto',
            data: {
                name: displayName,
                bonus: {
                    id: 'new_player_bonus',
                    sand: 500,
                    stone: 200,
                    water: 350,
                    wood: 600
                }
            },
            id: 'modal-new-player'
        };

        this.openModal(BonusCollectModalComponent, options);
    }
    public onTourQuestsIntro() {
        // exit if the new player bonus modal is already open
        const modalId = 'modal-quests-intro';
        const dialogExists = this.dialog.openDialogs.find(matDialog => matDialog.id === modalId);
        if (dialogExists) {
            return true;
        }

        const options = {
            width: 'auto',
            data: {
                description:
                    // tslint:disable-next-line: max-line-length
                    'Quests guide you along specific tasks that must be accomplished to play the game and provide rewards. Next Step: Collect your first quest reward',
                headline: 'Quests Intro',
                id: modalId,
                name: 'Quests Intro',
                submit_text: 'Go To Quests'
            },
            id: modalId
        };

        this.openModal(BasicModalComponent, options);
    }

    private openModal(component, options) {
        const dialogRef = this.dialog.open(component, options);
        dialogRef.afterClosed().subscribe(data => {
            if (!data) {
                return;
            }
            if (data.submit.id === 'new_player_bonus') {
                this.userFacade.triggerCompleteTourStep(data.submit.id);
            } else if (data.submit.id === 'building_new') {
                this.userFacade.triggerBuild(data.submit.buildingId, data.submit.level, data.submit.node);
            } else if (data.submit.id === 'modal-quests-intro') {
                this.router.navigate(['/quests']);
            }
        });
    }
}
