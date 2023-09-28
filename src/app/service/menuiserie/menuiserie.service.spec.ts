import { TestBed } from '@angular/core/testing';

import { MenuiserieService } from './menuiserie.service';

describe('MenuiserieService', () => {
  let service: MenuiserieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuiserieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
