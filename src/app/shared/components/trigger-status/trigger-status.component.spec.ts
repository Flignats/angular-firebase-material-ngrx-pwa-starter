import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerStatusComponent } from './trigger-status.component';

describe('TriggerStatusComponent', () => {
  let component: TriggerStatusComponent;
  let fixture: ComponentFixture<TriggerStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
