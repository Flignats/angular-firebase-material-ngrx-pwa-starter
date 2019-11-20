import { Injectable } from '@angular/core';
// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AppState } from '@app/core/core.state';
import { select, Store, Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, switchMap, tap, filter, exhaustMap } from 'rxjs/operators';
import { login, loginSuccess, loginFailure, register, registerSuccess, registerFailure } from './auth.actions';
import { Authenticate, AuthedUser } from './auth.models';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions<Action>, private authService: AngularFireAuth) {}
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            map(action => action.auth),
            switchMap((auth: Authenticate) =>
                from(
                    this.authService.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
                        return this.authService.auth.signInWithEmailAndPassword(auth.email, auth.password);
                    })
                ).pipe(
                    map(authedUser => {
                        const user: AuthedUser = {
                            displayName: authedUser.user.displayName,
                            email: authedUser.user.email,
                            emailVerified: authedUser.user.emailVerified,
                            phoneNumber: authedUser.user.phoneNumber,
                            photoUrl: authedUser.user.photoURL,
                            refreshToken: authedUser.user.refreshToken,
                            uid: authedUser.user.uid
                        }

                        return loginSuccess({ authedUser: user });
                    }),
                    catchError(error => of(loginFailure({ error: error.message })))
                )
            )
        )
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(register),
            map(action => action.auth),
            switchMap((auth: Authenticate) =>
                from(
                    this.authService.auth.createUserWithEmailAndPassword(
                        auth.email,
                        auth.password
                    )
                ).pipe(
                    map(authedUser => {
                        const user: AuthedUser = {
                            displayName: authedUser.user.displayName,
                            email: authedUser.user.email,
                            emailVerified: authedUser.user.emailVerified,
                            phoneNumber: authedUser.user.phoneNumber,
                            photoUrl: authedUser.user.photoURL,
                            refreshToken: authedUser.user.refreshToken,
                            uid: authedUser.user.uid
                        }

                        return registerSuccess({ authedUser: user });
                    }),
                    catchError(error => of(registerFailure({ error })))
                )
            )
        )
    );
}
