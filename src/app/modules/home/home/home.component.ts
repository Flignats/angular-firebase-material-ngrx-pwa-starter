import { HomeFacade } from '@app/core/facades/home.facade';
import { Observable } from 'rxjs';
import { UserFacade } from '@app/core/facades/user.facade';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoreFacade } from '@app/core/facades/core.facade';
import { Authenticate } from '@app/core/auth/auth.models';
import { IUser } from '@app/modules/user/user.model';
import { JoyrideService } from 'ngx-joyride';
import { IBuildings } from '../home.model';
import { MatDialog } from '@angular/material/dialog';
import { BuildModalComponent } from '../modals/build/build-modal.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
    public tourGuide$: any;
    public user$: Observable<IUser>;
    public userBuildings$: Observable<IBuildings>;

    public steps = {
        title: {
            firstStep: 'Let\'s Begin!',
            secondStep: 'Land Plot'
        },
        content: {
            firstStep: 'This is your home base. Your goal is to increase your base\'s level and grow your city wisely!',
            secondStep:
                'A \'Land Plot\' is an area in which you can build a new structure [barracks, housing, research, ect]'
        }
    };

    animal: any;

    constructor(
        public dialog: MatDialog,
        private facadeCore: CoreFacade,
        private homeFacade: HomeFacade,
        private userFacade: UserFacade,
        private readonly joyrideService: JoyrideService
    ) {}

    ngOnInit() {
        this.user$ = this.userFacade.selectUserAccount$();
        this.userBuildings$ = this.homeFacade.selectUserBuildings$();
    }

    onModalOpen(node) {
        if (node.type === 'empty') {
            const dialogRef = this.dialog.open(BuildModalComponent, {
                width: '966px',
                data: { name: 'MODAL NAME', animal: 'ANIMAL!' }
            });
            dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed:::', this.animal);
                this.animal = result;
            });
        }
    }

    onStartTour() {
        const options = {
            steps: ['firstStep', 'secondStep'],
            stepDefaultPosition: 'top',
            themeColor: '#000',
            showPrevButton: true,
            logsEnabled: true
        };
        this.tourGuide$ = this.joyrideService.startTour(options);
    }
}
