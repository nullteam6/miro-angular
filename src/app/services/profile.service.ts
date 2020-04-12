import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Profile } from '../models/profile';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
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
    private authService: AuthService,
  ) { }

  getProfile(): Observable<Profile> {
    return this.userServ.getUser(this.authService.getCurrentUsername())
      .pipe(map((data: any) => {
        return data.profile;
      }));
  }

  passProfile(username: string): Profile{
    this.getProfile();
    console.log(this.profile);
    return this.profile;
  }

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
