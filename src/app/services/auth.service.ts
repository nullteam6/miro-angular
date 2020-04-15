import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoginSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private keycloakService: KeycloakService
  ) { }

  isLoggedIn(): Observable<boolean> {
    this.keycloakService.isLoggedIn().then(r => {
      if (r) { this.isLoginSubject.next(true); }
    });

    return this.isLoginSubject.asObservable();
  }

  isAdmin(): boolean {
    return this.keycloakService.getUserRoles().includes('ROLE_ADMIN');
  }

  login(): void {
    this.keycloakService.login().then();
  }

  logout(): void {
    this.keycloakService.logout().then(r => {
      this.isLoginSubject.next(false);
      this.router.navigate(['/']).then();
    });
  }
}
