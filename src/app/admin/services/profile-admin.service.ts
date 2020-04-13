import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginatedList } from 'src/app/models/paginated-list';
import { Profile } from 'src/app/models/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileAdminService {

  constructor(private httpClient: HttpClient) { }

  getProfiles(offset?: number): Observable<PaginatedList<Profile>> {
    if (offset === undefined) {
      return this.httpClient.get<PaginatedList<Profile>>('https://api.4ray.co/BackEnd/profile');
    } else {
      return this.httpClient.get<PaginatedList<Profile>>(`https://api.4ray.co/BackEnd/profile?offset=${offset}`);
    }
  }

}
