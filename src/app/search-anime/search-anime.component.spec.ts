import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAnimeComponent } from './search-anime.component';

describe('SearchAnimeComponent', () => {
  let component: SearchAnimeComponent;
  let fixture: ComponentFixture<SearchAnimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAnimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
