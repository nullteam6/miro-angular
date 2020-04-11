import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchAnimeService {
  constructor(private http: HttpClient) { }

  getAnime(name: string): Observable<any> {
    return this.http.get<any>(`http://api.4ray.co/BackEnd/anime/${name}`);
  }

  getAnimeOffset(name: String, offset: number): Observable<any> {
    name = name.replace(' ', '%20');
    return this.http.get<any>(`http://api.4ray.co/BackEnd/anime/${name}?offset=${offset}`);
  }
}
