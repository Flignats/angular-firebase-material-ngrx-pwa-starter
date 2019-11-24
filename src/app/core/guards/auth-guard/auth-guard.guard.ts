import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/core.state';
import { selectIsAuthenticated } from '@app/core/auth/auth.selectors';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.store.pipe(
            select(selectIsAuthenticated),
            map(isAuthed => {
                if (!isAuthed) {
                    this.router.navigate(['/']);
                    return false;
                } else {
                    return true;
                }
            }),
            take(1)
        );
    }
}
