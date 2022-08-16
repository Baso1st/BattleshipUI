import { TestBed } from '@angular/core/testing';

import { BattleshipHttpService } from './battleship-http.service';

describe('BattleshipHttpService', () => {
  let service: BattleshipHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleshipHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
