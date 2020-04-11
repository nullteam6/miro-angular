import { Anime } from '../models/anime';
import { SearchAnimeService } from '../services/search-anime.service';

import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.sass']
})
export class AnimeDetailsComponent implements OnInit {

  constructor(private s: SearchAnimeService) { }

  ngOnInit(): void {
    this.selectedAnime = this.s.passAnime();
    console.log(this.selectedAnime.logo)
  }

  selectedAnime = new Anime()

}
