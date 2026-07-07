import { TestBed } from '@angular/core/testing';

import { MisconceptionService } from './misconception-service';

describe('MisconceptionService', () => {
  let service: MisconceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisconceptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
