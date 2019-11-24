import { IUser } from './../../modules/user/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUser } from '@app/modules/user/user.actions';
import { selectUserAccount, selectUserLoading } from '@app/modules/user/user.selectors';

@Injectable({
    providedIn: 'root'
})
export class UserFacade {
    constructor(private store: Store<{}>) {}

    // User Actions
    public loadUser(): void {
        this.store.dispatch(loadUser());
    }

    // User Selectors
    public selectUserAccount$(): Observable<IUser> {
        return this.store.select(selectUserAccount);
    }

    public selectUserLoading$(): Observable<boolean> {
        return this.store.select(selectUserLoading);
    }
}
