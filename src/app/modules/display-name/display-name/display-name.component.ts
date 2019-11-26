import { UserFacade } from './../../../core/facades/user.facade';
import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { DisplayNameValidator } from '@app/shared/validators';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUserTriggers } from '@app/modules/user/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-display-name',
    templateUrl: './display-name.component.html',
    styleUrls: ['./display-name.component.scss'],
})
export class DisplayNameComponent implements OnInit {
    public triggers$: Observable<IUserTriggers>;

    displayNameForm = this.fb.group({
        displayName: [
            '',
            [Validators.required, Validators.minLength(4), Validators.maxLength(30)],
            DisplayNameValidator.displayName(this.afs)
        ]
    });

    constructor(
        private afs: AngularFirestore,
        private fb: FormBuilder,
        private router: Router,
        private userFacade: UserFacade
    ) {}

    public ngOnInit(): void {
        this.triggers$ = this.userFacade.selectUserTriggers$();
    }

    get displayNameStr() {
        return this.displayNameForm.get('displayName') as FormControl;
    }

    get displayNameExistsInvalid() {
        return this.displayNameStr.hasError('uid');
    }

    public onGoHome(): void {
        this.router.navigate(['/home']);
    }

    public onSubmitDisplayNameForm(): void {
        if (this.displayNameForm.valid) {
            const displayName: string = this.displayNameForm.value;
            this.userFacade.setDisplayName(displayName);
        }
    }
}
