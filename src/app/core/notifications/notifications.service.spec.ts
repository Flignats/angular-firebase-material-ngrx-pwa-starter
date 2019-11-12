import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notifications.service';

describe('NotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });
});
