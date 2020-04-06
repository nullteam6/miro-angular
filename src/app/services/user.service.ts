import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  sendReg(user: User) {
    this.httpClient.post<User>('https://api.4ray.co/BackEnd/user', user).subscribe();
  }
}
