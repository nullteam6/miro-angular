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
  private tokenSubject = new BehaviorSubject<boolean>(false);
  private token: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private keycloakAngular: KeycloakService
  ) { }

  logout(): void {
    this.keycloakAngular.logout().then(r => {
      this.isLoginSubject.next(false);
      // location.reload();
      this.token = null;
      this.router.navigate(['/']).then();
    });
  }

  isLoggedIn(): Observable<boolean> {
    this.keycloakAngular.isLoggedIn().then(r => {
      if (r) { this.isLoginSubject.next(true); }
    });

    return this.isLoginSubject.asObservable();
  }

  getCurrentUsername(): string {
    return this.keycloakAngular.getUsername();
  }

  getToken(): string {
    return this.token;
  }

  // isManager(): boolean {
  //   if (this.hasToken()) {
  //     const user: User = JSON.parse(localStorage.getItem('currentUser'));
  //     return (user.admin ? true : false);
  //   }
  //
  //   return false;
  // }

  // getUserId(): number {
  //   return this.hasToken() ? this.user.id : null;
  // }
  //
  // getUsername(): string {
  //   return this.hasToken() ? this.user.username : null;
  // }
}
