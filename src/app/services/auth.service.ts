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
    private keycloakAngular: KeycloakService
  ) { }

  isLoggedIn(): Observable<boolean> {
    this.keycloakAngular.isLoggedIn().then(r => {
      if (r) { this.isLoginSubject.next(true); }
    });

    return this.isLoginSubject.asObservable();
  }

  isAdmin(): boolean {
    return this.keycloakAngular.getUserRoles().includes('ROLE_ADMIN');
  }

  logout(): void {
    this.keycloakAngular.logout().then(r => {
      this.isLoginSubject.next(false);
      this.router.navigate(['/']).then();
    });
  }
}
