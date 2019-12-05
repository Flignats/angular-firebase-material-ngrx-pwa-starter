import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResourcesComponent } from './user-resources.component';

describe('UserResourcesComponent', () => {
  let component: UserResourcesComponent;
  let fixture: ComponentFixture<UserResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
