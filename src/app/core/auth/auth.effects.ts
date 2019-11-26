import { AppState } from './../core.state';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Action, select, Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { map, catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {
    login,
    loginSuccess,
    loginFailure,
    register,
    registerSuccess,
    registerFailure,
    logout,
    updateAuth,
    updateAuthSuccess,
    updateAuthFailure
} from './auth.actions';
import { Authenticate, AuthedUser } from './auth.models';
import { selectUserAccountDisplayName } from '@app/modules/user/user.selectors';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions<Action>,
        private authService: AngularFireAuth,
        private router: Router,
        private store: Store<AppState>
    ) {
        firebase.auth().onAuthStateChanged(authedUser => {
            if (!authedUser) {
                logout();
            }
            if (authedUser) {
                updateAuth();
            }
        });
    }

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
                        };

                        return loginSuccess({ authedUser: user });
                    }),
                    catchError(error => of(loginFailure({ error: error.message })))
                )
            )
        )
    );

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(logout),
                tap(() => {
                    this.authService.auth.signOut();
                    this.router.navigate(['/about']);
                })
            ),
        { dispatch: false }
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(register),
            map(action => action.auth),
            switchMap((auth: Authenticate) =>
                from(this.authService.auth.createUserWithEmailAndPassword(auth.email, auth.password)).pipe(
                    map(authedUser => {
                        const user: AuthedUser = {
                            displayName: authedUser.user.displayName,
                            email: authedUser.user.email,
                            emailVerified: authedUser.user.emailVerified,
                            phoneNumber: authedUser.user.phoneNumber,
                            photoUrl: authedUser.user.photoURL,
                            refreshToken: authedUser.user.refreshToken,
                            uid: authedUser.user.uid
                        };

                        return registerSuccess({ authedUser: user });
                    }),
                    catchError(error => of(registerFailure({ error })))
                )
            )
        )
    );

    redirectHome$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginSuccess, registerSuccess),
                map(action => action.authedUser),
                switchMap(() => this.router.navigate(['/home']))
            ),
        { dispatch: false }
    );

    updateAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateAuth),
            withLatestFrom(this.store.pipe(select(selectUserAccountDisplayName))),
            switchMap(([action, userDisplayName]) =>
                from(this.authService.authState).pipe(
                    map(authedUser => {
                        const user: AuthedUser = {
                            displayName: authedUser.displayName ? authedUser.displayName : userDisplayName,
                            email: authedUser.email,
                            emailVerified: authedUser.emailVerified,
                            phoneNumber: authedUser.phoneNumber,
                            photoUrl: authedUser.photoURL,
                            refreshToken: authedUser.refreshToken,
                            uid: authedUser.uid
                        };
                        return updateAuthSuccess({ authedUser: user });
                    }),
                    catchError(error => of(updateAuthFailure({ error })))
                )
            )
        )
    );
}
