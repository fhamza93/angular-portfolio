import { TestBed } from '@angular/core/testing';

import { AcquisitionsFirebaseService } from './acquisitions-firebase.service';

describe('AcquisitionsFirebaseService', () => {
  let service: AcquisitionsFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcquisitionsFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
