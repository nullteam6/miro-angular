import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Login } from '../models/login';
import { User } from '../models/user';
import {KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  private isLoginSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private keycloakAngular: KeycloakService
  ) {
    // this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  // private hasToken(): boolean {
  //   return !!localStorage.getItem('currentUser');
  // }

  // login(login: Login): void {
    // TODO: Would be nice to use a token later
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     // 'Authorization': 'my-auth-token'
    //   })
    // };

    // this.httpClient.post<User>('https://api.4ray.co/BackEnd/login', login)
    //   .pipe(
    //     map((user: User) => {
    //       if (user != null) {
    //         this.user = user;
    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //         this.isLoginSubject.next(true);
    //       }
    //     })
    //   ).subscribe();

  // }

  logout(): void {
    // localStorage.removeItem('currentUser');
    this.keycloakAngular.logout().then(r => {
      this.isLoginSubject.next(false);
      // location.reload();
      this.router.navigate(['/']).then();
    }
  );
    // this.router.navigate([ 'login' ]).then();
    // location.reload();
  }

  isLoggedIn(): Observable<boolean> {
    this.keycloakAngular.isLoggedIn().then(r =>
      r && this.isLoginSubject.next(true)
    );

    return this.isLoginSubject.asObservable();
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
