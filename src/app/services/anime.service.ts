import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Anime } from '../models/anime';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  constructor(private httpClient: HttpClient) { }

  getTrending(): Observable<Anime[]> {
    return this.httpClient.get<Anime[]>('https://api.4ray.co/BackEnd/anime/trending');
  }


}
