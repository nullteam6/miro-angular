import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Anime } from '../models/anime';

@Injectable({
  providedIn: 'root'
})

export class SearchAnimeService {
  selectedAnime: Anime;

  constructor(private http: HttpClient) { }

  getAnime(name: string): Observable<any> {
    return this.http.get<any>(`https://api.4ray.co/BackEnd/anime/${name}`);
  }

  getAnimeOffset(name: String, offset: number): Observable<any> {
    name = name.replace(' ', '%20');
    return this.http.get<any>(`https://api.4ray.co/BackEnd/anime/${name}?offset=${offset}`);
  }

  saveAnime(anime: Anime){
    this.selectedAnime = anime;
  }

  passAnime(): Anime {
    return this.selectedAnime;
  }
}
