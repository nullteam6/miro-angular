import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Profile } from '../models/profile';

import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profile = new Profile();

  constructor(
    private userServ: UserService,
    private httpClient: HttpClient,
  ) { }

  getProfile(): Observable<Profile> {
    return this.userServ.getUser()
      .pipe(map((data: any) => {
        return data.profile;
      }));
  }

  // passProfile(username: string): Profile{
  //   this.getProfile();
  //   console.log(this.profile);
  //   return this.profile;
  // }

  sendProfile(profile: Profile) {
    console.log("Profile = " + this.profile);
    // this.authService.getToken().then(token => {
      // console.log(`"${token}"`);
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer: ' + token + '\''
      //   })
      // };
    // });
    this.httpClient.put("http://api.4ray.co/BackEnd/profile", profile).subscribe();
  }
}
