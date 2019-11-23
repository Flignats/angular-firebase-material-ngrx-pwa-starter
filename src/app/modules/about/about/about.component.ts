import { selectUid } from './../../../core/auth/auth.selectors';
import { Component, OnInit } from '@angular/core';
import { CoreFacade } from '@app/core/core.facade';
import { Authenticate, AuthedUser } from '@app/core/auth/auth.models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    public authedUid$: Observable<string>;

    constructor(private facadeCore: CoreFacade) {}

    ngOnInit(): void {
        this.authedUid$ = this.facadeCore.selectUid$();
    }

    public onSubmitAuth(auth: Authenticate) {
        this.facadeCore.login(auth);
    }
    public onSubmitRegister(auth: Authenticate) {
        this.facadeCore.register(auth);
    }
}
