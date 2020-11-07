import { TestBed } from '@angular/core/testing';

import { AsgardGuard } from './asgard.guard';

describe('AsgardGuard', () => {
  let guard: AsgardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AsgardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
