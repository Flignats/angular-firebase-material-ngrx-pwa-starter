import { Component, OnInit } from '@angular/core';
import { CoreFacade } from '@app/core/facades/core.facade';
import { Authenticate } from '@app/core/auth/auth.models';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor(
        private facadeCore: CoreFacade
    ) {}

    ngOnInit() {}
}
