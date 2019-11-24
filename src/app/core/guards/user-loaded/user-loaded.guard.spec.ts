import { TestBed, async, inject } from '@angular/core/testing';

import { UserLoadedGuard } from './user-loaded.guard';

describe('UserLoadedGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserLoadedGuard]
        });
    });

    it('should ...', inject([UserLoadedGuard], (guard: UserLoadedGuard) => {
        expect(guard).toBeTruthy();
    }));
});
