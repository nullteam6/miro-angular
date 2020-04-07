import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../services/anime.service';
import { Anime } from '../models/anime';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor() { }

  favAnime = new Anime();

  ngOnInit(): void {
  }

}
