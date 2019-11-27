import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildModalComponent } from './build-modal.component';

describe('BuildComponent', () => {
    let component: BuildModalComponent;
    let fixture: ComponentFixture<BuildModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BuildModalComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BuildModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
