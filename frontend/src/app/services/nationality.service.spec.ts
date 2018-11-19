import { TestBed, inject } from '@angular/core/testing';

import { NationalityService } from './nationality.service';

describe('NationalityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NationalityService]
    });
  });

  it('should be created', inject([NationalityService], (service: NationalityService) => {
    expect(service).toBeTruthy();
  }));
});
