import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

import { User } from '../models/user';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private keycloakService: KeycloakService,
  ) { }

  getUsername(): string {
    return this.keycloakService.getUsername();
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>('https://api.4ray.co/BackEnd/user/' + this.getUsername());
  }
}
