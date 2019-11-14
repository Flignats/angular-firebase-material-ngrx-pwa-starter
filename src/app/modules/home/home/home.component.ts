import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoreFacade } from '@app/core/core.facade';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor(
        private facadeCore: CoreFacade,
        private fb: FormBuilder
    ) {}

    // Forms
    authForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
    registerForm = this.fb.group({
        displayName: [
            '',
            Validators.required
            // DisplayNameValidator.displayName(this.afs)
        ],
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    isRegistering = false;
    passwordResetSuccess = false;

    ngOnInit() {}

    isResetPasswordDisabled() {
        if (this.authForm.controls.email.valid) {
            return false;
        }
        return true;
    }
    onResetPassword() {
        // this.store.dispatch(
        //   new ActionAuthResetPassword({ email: this.authForm.controls.email.value })
        // );
        // this.passwordResetSuccess = true;
    }
    onSubmitAuthForm() {}
    onSwitchAuthForm() {
        return (this.isRegistering = !this.isRegistering);
    }
}
