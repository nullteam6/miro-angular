import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedList } from 'src/app/models/paginated-list';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {

  constructor(private httpClient: HttpClient) { }

  getUsers(offset?: number): Observable<PaginatedList<User>>{
    return this.httpClient.get<PaginatedList<User>>('https://api.4ray.co/BackEnd/user');
  }
}
