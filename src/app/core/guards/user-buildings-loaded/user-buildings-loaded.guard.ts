import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { HomeFacade } from '@app/core/facades/home.facade';

@Injectable({
    providedIn: 'root'
})
export class UserBuildingsLoadedGuard implements Resolve<boolean> {
    private subUserBuildings: Subscription;
    private hasLoaded: boolean;
    constructor(private facade: HomeFacade) {}

    public resolve(): Observable<boolean> {
        this.hasLoaded = false;
        this.subUserBuildings = this.facade.selectUserBuildings$().subscribe(buildings =>
            !buildings ? this.facade.loadUserBuildings() : (this.hasLoaded = true)
        );

        return this.hasLoaded
            ? of(this.hasLoaded)
            : this.facade.selectUserBuildings$().pipe(
                filter(account => !account),
                take(1),
                tap(() => this.subUserBuildings.unsubscribe()),
                map(() => true)
            );
    }
}
