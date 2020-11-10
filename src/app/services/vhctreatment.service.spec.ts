import { TestBed } from '@angular/core/testing';

import { VhctreatmentService } from './vhctreatment.service';

describe('VhctreatmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VhctreatmentService = TestBed.get(VhctreatmentService);
    expect(service).toBeTruthy();
  });
});
