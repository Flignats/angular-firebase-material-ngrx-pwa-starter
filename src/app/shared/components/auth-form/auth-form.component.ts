import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Authenticate } from '@app/core/auth/auth.models';

@Component({
    selector: 'app-auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
    @Output() submitAuth = new EventEmitter<Authenticate>();
    @Output() submitRegister = new EventEmitter<Authenticate>();

    constructor(private fb: FormBuilder) {}

    public passwordResetSuccess = false;

    // Forms
    public authForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    public registerForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    public isResetPasswordDisabled(): boolean {
        if (this.authForm.controls.email.valid) {
            return false;
        }
        return true;
    }
    public onResetPassword(): void {
        // this.store.dispatch(
        //   new ActionAuthResetPassword({ email: this.authForm.controls.email.value })
        // );
        // this.passwordResetSuccess = true;
    }
    public onSubmitAuthForm() {
        this.submitAuth.emit(this.authForm.value);
    }
    public onSubmitRegisterForm() {
        this.submitRegister.emit(this.registerForm.value);
    }
}
