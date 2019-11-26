import { selectUserAccount, selectUserAccountDisplayName } from './../../../modules/user/user.selectors';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/core.state';
import { map, take } from 'rxjs/operators';
import { selectUserDisplayName } from '@app/core/auth/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class DisplayNameGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.store.pipe(
            select(selectUserDisplayName),
            map(displayName => {
                if (!displayName) {
                    this.router.navigate(['/display-name']);
                    return false;
                } else {
                    return true;
                }
            }),
            take(1)
        );
    }
}
