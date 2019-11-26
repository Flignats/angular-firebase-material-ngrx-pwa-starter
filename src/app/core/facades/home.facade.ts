import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUserBuildings } from '@app/modules/home/home.actions';
import { selectUserBuildings, selectHomeLoading, selectHomeTriggers, selectHomeError } from '@app/modules/home/home.selectors';
import { IBuildings, IHomeTriggers } from '@app/modules/home/home.model';

@Injectable({
    providedIn: 'root'
})
export class HomeFacade {
    constructor(private store: Store<{}>) {}

    // Actions
    public loadUserBuildings(): void {
        this.store.dispatch(loadUserBuildings());
    }

    // Selectors
    public selectUserBuildings$(): Observable<IBuildings> {
        return this.store.select(selectUserBuildings);
    }

    public selectHomeError$(): Observable<any> {
        return this.store.select(selectHomeError);
    }

    public selectHomeLoading$(): Observable<boolean> {
        return this.store.select(selectHomeLoading);
    }

    public selectHomeTriggers$(): Observable<IHomeTriggers> {
        return this.store.select(selectHomeTriggers);
    }
}
