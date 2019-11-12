import { Injectable } from '@angular/core';
// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AppState } from '@app/core/core.state';
import { select, Store, Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, from } from 'rxjs';
import {
    map,
    mergeMap,
    catchError,
    withLatestFrom,
    switchMap,
    tap,
    filter,
    exhaustMap
} from 'rxjs/operators';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { Authenticate } from './auth.models';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions<Action>,
        private authService: AngularFireAuth
    ) {}
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            map(action => action.auth),
            switchMap((auth: Authenticate) =>
                from(
                    this.authService.auth
                        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
                        .then(() => {
                            return this.authService.auth.signInWithEmailAndPassword(
                                auth.email,
                                auth.password
                            );
                        })
                ).pipe(
                    map(authedUser => {
                        return loginSuccess({ authedUser });
                    }),
                    catchError(error => of(loginFailure({ error: error.message })))
                )
            )
        )
    );
}
