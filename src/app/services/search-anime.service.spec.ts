import { TestBed } from '@angular/core/testing';

import { SearchAnimeService } from './search-anime.service';

describe('SearchAnimeService', () => {
  let service: SearchAnimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchAnimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
