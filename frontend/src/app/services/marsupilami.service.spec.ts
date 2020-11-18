import { TestBed } from '@angular/core/testing';

import { MarsupilamiService } from './marsupilami.service';

describe('MarsupilamiService', () => {
  let service: MarsupilamiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarsupilamiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
