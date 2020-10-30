import { TestBed } from '@angular/core/testing';

import { TreatmentsoptionsService } from './treatmentsoptions.service';

describe('TreatmentsoptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreatmentsoptionsService = TestBed.get(TreatmentsoptionsService);
    expect(service).toBeTruthy();
  });
});
