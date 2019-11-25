import { TestBed, async, inject } from '@angular/core/testing';

import { DisplayNameExistsGuard } from './display-name-exists.guard';

describe('DisplayNameExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisplayNameExistsGuard]
    });
  });

  it('should ...', inject([DisplayNameExistsGuard], (guard: DisplayNameExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
