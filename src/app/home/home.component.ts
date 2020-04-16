import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { Anime } from '../models/anime';

import { AnimeService } from '../services/anime.service';
import { SearchAnimeService } from '../services/search-anime.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [NgbCarouselConfig],
})
export class HomeComponent implements OnInit {
  public trendingList: Anime[] = [];

  constructor(
    private carouselConfig: NgbCarouselConfig,
    private animeService: AnimeService,
    private searchAnimeService: SearchAnimeService,
    private router: Router,
  ) {
    carouselConfig.interval = 5000;
    carouselConfig.wrap = false;
    carouselConfig.keyboard = false;
    carouselConfig.pauseOnHover = true;

    animeService.getTrending().subscribe(
      (animeArr: Anime[]) => {
        this.trendingList = animeArr;
      }
    );
  }

  open(anime: Anime) {
    this.searchAnimeService.selectedAnime = anime;
  }

  ngOnInit(): void { }
}
