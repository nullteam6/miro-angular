import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Anime } from '../models/anime';
import { PaginatedList } from '../models/paginated-list';

@Injectable({
  providedIn: 'root'
})

export class SearchAnimeService {
  selectedAnime: Anime;

  constructor(private http: HttpClient) { }

  getAllAnime(offset?: number) {
    if (offset === undefined) {
      return this.http.get<PaginatedList<Anime>>('https://api.4ray.co/BackEnd/anime');
    }
    return this.http.get<PaginatedList<Anime>>(`https://api.4ray.co/BackEnd/anime?offset=${offset}`);
  }

  getAnime(name: string, offset?: number): Observable<PaginatedList<Anime>> {
    name = name.replace(' ', '%20');
    if(offset === undefined){
      return this.http.get<PaginatedList<Anime>>(`https://api.4ray.co/BackEnd/anime/${name}`);
    }
    return this.http.get<PaginatedList<Anime>>(`https://api.4ray.co/BackEnd/anime/${name}?offset=${offset}`);
  }

  saveAnime(anime: Anime){
    this.selectedAnime = anime;
  }

  passAnime(): Anime {
    return this.selectedAnime;
  }
}
