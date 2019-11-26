import { TestBed, async, inject } from '@angular/core/testing';

import { UserBuildingsLoadedGuard } from './user-buildings-loaded.guard';

describe('UserBuildingsLoadedGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserBuildingsLoadedGuard]
        });
    });

    it('should ...', inject([UserBuildingsLoadedGuard], (guard: UserBuildingsLoadedGuard) => {
        expect(guard).toBeTruthy();
    }));
});
