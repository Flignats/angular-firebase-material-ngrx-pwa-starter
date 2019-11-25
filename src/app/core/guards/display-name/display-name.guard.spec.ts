import { TestBed, async, inject } from '@angular/core/testing';

import { DisplayNameGuard } from './display-name.guard';

describe('DisplayNameGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DisplayNameGuard]
        });
    });

    it('should ...', inject([DisplayNameGuard], (guard: DisplayNameGuard) => {
        expect(guard).toBeTruthy();
    }));
});
