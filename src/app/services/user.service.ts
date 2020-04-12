import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  sendReg(user: User) {
    this.httpClient.post<User>('http://api.4ray.co:8081/BackEnd/user', user).subscribe();
  }

  getUser(username: string): Observable<User> {
    // return this.httpClient.get<User>(`http://localhost:8080/BackEnd/user/${username}`);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
    return this.httpClient.get<User>(`https://api.4ray.co/BackEnd/user/${username}`);
  }
}
