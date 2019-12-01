import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusCollectModalComponent } from './bonus-collect.component';

describe('BonusCollectComponent', () => {
    let component: BonusCollectModalComponent;
    let fixture: ComponentFixture<BonusCollectModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BonusCollectModalComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BonusCollectModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
