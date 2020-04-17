import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Profile } from '../models/profile';

import { UserService } from './user.service';
import { PaginatedList } from '../models/paginated-list';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile = new Profile();

  constructor(
    private userService: UserService,
    private httpClient: HttpClient,
  ) { }

  getProfile(): Observable<Profile> {
    return this.userService.getUser()
      .pipe(map((data: any) => {
        return data.profile;
      }));
  }

  sendProfile(profile: Profile) {
    this.httpClient.put('https://api.4ray.co/BackEnd/profile', profile).subscribe();
  }

  follow(loggedInProfile: Profile, selectedProfile: Profile): void {
    loggedInProfile.followingList.push(selectedProfile);
    this.sendProfile(loggedInProfile);
  }

  unfollow(loggedInProfile: Profile, selectedProfile: Profile): void {
    loggedInProfile.followingList = loggedInProfile.followingList.filter(e => e.uid !== selectedProfile.uid);
    this.sendProfile(loggedInProfile);
  }

  getAll(offset?: number): Observable<PaginatedList<Profile>> {
    if (offset === undefined){
      return this.httpClient.get<PaginatedList<Profile>>('https://api.4ray.co/BackEnd/profile');
    }

    return this.httpClient.get<PaginatedList<Profile>>(`https://api.4ray.co/BackEnd/profile?offset=${offset}`);
  }

  search(uid: string, offset?: number): Observable<PaginatedList<Profile>> {
    if (offset === undefined) {
      return this.httpClient.get<PaginatedList<Profile>>(`https://api.4ray.co/BackEnd/profile?search=${uid}`);
    }

    return this.httpClient.get<PaginatedList<Profile>>(`https://api.4ray.com/BackEnd/profile?search=${uid}&offset=${offset}`);
  }
}
