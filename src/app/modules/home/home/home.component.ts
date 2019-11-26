import { HomeFacade } from '@app/core/facades/home.facade';
import { Observable } from 'rxjs';
import { UserFacade } from '@app/core/facades/user.facade';
import { Component, OnInit } from '@angular/core';
import { CoreFacade } from '@app/core/facades/core.facade';
import { Authenticate } from '@app/core/auth/auth.models';
import { IUser } from '@app/modules/user/user.model';
import { JoyrideService } from 'ngx-joyride';
import { IBuildings } from '../home.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public tourGuide$: any;
    public user$: Observable<IUser>;
    public userBuildings$: Observable<IBuildings>;

    public steps = {
        title: {
            firstStep:  'Let\'s Begin!',
            secondStep: 'Land Plot'
        },
        content: {
            firstStep:  'This is your home base. Your goal is to increase your base\'s level and grow your city wisely!',
            secondStep: 'A \'Land Plot\' is an area in which you can build a new structure [barracks, housing, research, ect]'
        }
    };

    constructor(
        private facadeCore: CoreFacade,
        private homeFacade: HomeFacade,
        private userFacade: UserFacade,
        private readonly joyrideService: JoyrideService
    ) {}

    public classStyler(building) {
        const classes = {
            empty: building.type === 'empty',
        };

        return classes;
    }

    ngOnInit() {
        this.user$ = this.userFacade.selectUserAccount$();
        this.userBuildings$ = this.homeFacade.selectUserBuildings$();
    }

    onStartTour() {
        const options = {
            steps: [
                'firstStep',
                'secondStep',
            ],
            stepDefaultPosition: 'top',
            themeColor: '#000',
            showPrevButton: true,
            logsEnabled: true
        };
        this.tourGuide$ = this.joyrideService.startTour(options);
    }
}
