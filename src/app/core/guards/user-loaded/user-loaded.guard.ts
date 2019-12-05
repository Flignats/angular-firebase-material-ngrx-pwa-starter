import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { UserFacade } from '@app/modules/user/user.facade';

@Injectable({
    providedIn: 'root'
})
export class UserLoadedGuard implements Resolve<boolean> {
    private subUser: Subscription;
    private hasLoaded: boolean;
    constructor(private facade: UserFacade) {}

    public resolve(): Observable<boolean> {
        this.hasLoaded = false;
        this.subUser = this.facade.selectUserAccount$().subscribe(account =>
            !account ? this.facade.loadUser() : (this.hasLoaded = true)
        );

        return this.hasLoaded
            ? of(this.hasLoaded)
            : this.facade.selectUserAccount$().pipe(
                filter(account => !account),
                take(1),
                tap(() => this.subUser.unsubscribe()),
                map(() => true)
            );
    }
}
