import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Anime } from '../models/anime';

import { SearchAnimeService } from '../services/search-anime.service';
import { Observable } from 'rxjs';
import { PaginatedList } from '../models/paginated-list';

@Component({
  selector: 'app-search-anime',
  templateUrl: './search-anime.component.html',
  styleUrls: ['./search-anime.component.sass']
})
export class SearchAnimeComponent implements OnInit {
  animes: Anime[] = [];
  searched: boolean;
  page = 1;
  pageSize = 10;
  collectionSize: number;
  searchTerm: string;

  constructor(private searchService: SearchAnimeService) {
    this.searchService.getAllAnime().subscribe(data => {
      this.animes = data.list;
      this.collectionSize = data.totalCount;
      this.page = 1;
    });
  }

  searchForm = new FormGroup({
    name: new FormControl(''),
  });

  ngOnInit(): void {
    this.searched = false;
  }

  onSubmit() {
    this.searchTerm = this.searchForm.controls.name.value;
    let obs: Observable<PaginatedList<Anime>>;
    if (this.searchTerm == null) {
      this.searched = false;
      obs = this.searchService.getAllAnime();
    } else {
      this.searched = true;
      obs = this.searchService.getAnime(this.searchTerm);
    }
    this.getPage(obs);
  }

  getPage(animeObservable: Observable<PaginatedList<Anime>>) {
    animeObservable.subscribe(data => {
      this.animes = data.list;
      this.collectionSize = data.totalCount;
    })
  }

  pageChange() {
    if (this.searched) {
            this.searchService.getAnime(this.searchTerm, (this.page * 10) - 10).subscribe(
        (data: any) => {
          this.animes = data.list;
        }
      );
    } else {
      this.searchService.getAllAnime(this.page * 10 - 10).subscribe(data => {
        this.animes = data.list;
      }); 
    }

  }

  onClick(anime: Anime): void {
    this.searchService.saveAnime(anime);
  }
}
