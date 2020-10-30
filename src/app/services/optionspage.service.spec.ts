import { TestBed } from '@angular/core/testing';

import { OptionspageService } from './optionspage.service';

describe('OptionspageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OptionspageService = TestBed.get(OptionspageService);
    expect(service).toBeTruthy();
  });
});
