import { TestBed } from '@angular/core/testing';

import { BookFirebaseService } from './book-firebase.service';

describe('BookFirebaseService', () => {
  let service: BookFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
