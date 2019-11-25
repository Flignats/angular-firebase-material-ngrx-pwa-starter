import { IUser, IUserTriggers } from './../../modules/user/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUser, triggerSetDisplayName } from '@app/modules/user/user.actions';
import { selectUserAccount, selectUserLoading, selectUserTriggers } from '@app/modules/user/user.selectors';
import { ITriggers } from '../models/triggers.models';

@Injectable({
    providedIn: 'root'
})
export class UserFacade {
    constructor(private store: Store<{}>) {}

    // Actions
    public loadUser(): void {
        this.store.dispatch(loadUser());
    }

    public setDisplayName(displayName: string) {
        this.store.dispatch(triggerSetDisplayName({ displayName }));
    }

    // Selectors
    public selectUserAccount$(): Observable<IUser> {
        return this.store.select(selectUserAccount);
    }

    public selectUserLoading$(): Observable<boolean> {
        return this.store.select(selectUserLoading);
    }

    public selectUserTriggers$(): Observable<IUserTriggers> {
        return this.store.select(selectUserTriggers);
    }
}
