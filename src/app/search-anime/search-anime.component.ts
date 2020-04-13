import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Anime } from '../models/anime';

import { SearchAnimeService } from '../services/search-anime.service';

@Component({
  selector: 'app-search-anime',
  templateUrl: './search-anime.component.html',
  styleUrls: ['./search-anime.component.sass']
})
export class SearchAnimeComponent implements OnInit {
  constructor(private s: SearchAnimeService) { }

  animes: Anime[] = [];
  searched: boolean;
  page = 1;
  pageSize = 10;
  collectionSize: number;
  searchTerm: string;

  searchForm = new FormGroup({
   name: new FormControl(''),
  });

  ngOnInit(): void {
    this.searched = false;
  }

  viewParse(data: any): void {
    data.list.forEach((anime: Anime) => {
      anime.name = JSON.parse(anime.name);
      anime.synopsis = JSON.parse(anime.synopsis);
      anime.logo = JSON.parse(anime.logo);
      this.animes.push(anime);
    });
  }

  onSubmit() {
    this.searchTerm = this.searchForm.controls.name.value;
    this.s.getAnime(this.searchTerm).subscribe(
      (data: any) => {
        this.viewParse(data);
        this.searched = true;
        this.collectionSize = data.totalCount;
      }
    );
  }

  pageChange() {
    this.s.getAnimeOffset(this.searchTerm, (this.page * 10) - 10).subscribe(
      (data: any) => {
        // Empty the animes array so we don't write all over the page
        this.animes = [];
        this.viewParse(data);
      }
    );
  }

  onClick(anime: Anime): void {
    this.s.saveAnime(anime);
  }
}
