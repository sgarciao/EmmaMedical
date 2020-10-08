import { TestBed } from '@angular/core/testing';

import { NashtreatmentService } from './nashtreatment.service';

describe('NashtreatmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NashtreatmentService = TestBed.get(NashtreatmentService);
    expect(service).toBeTruthy();
  });
});
