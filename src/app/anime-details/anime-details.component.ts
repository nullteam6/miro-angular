import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { Anime } from '../models/anime';
import { Profile } from '../models/profile';

import { SearchAnimeService } from '../services/search-anime.service';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.sass']
})
export class AnimeDetailsComponent {
  profile: Profile;
  selectedAnime = new Anime();
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private searchService: SearchAnimeService,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    ) {
    const anime = this.searchService.passAnime();
    if (anime !== undefined) {
      this.selectedAnime = anime;
    } else {
      this.router.navigate(['/']).then();
    }

    this.authService.isLoggedIn().subscribe((r) => {
      if (r) {
        this.profileService.getProfile().subscribe((profile: Profile) => {
          this.profile = profile;
          this.isLoggedIn.next(true);
        });
      }
    });
  }

  addWatchedList() {
    this.deleteAnime();
    this.profile.aniBacklog.finishedList.push(this.selectedAnime);
    this.profileService.sendProfile(this.profile);
  }

  addWatchList() {
    this.deleteAnime();
    this.profile.aniBacklog.inProgList.push(this.selectedAnime);
    this.profileService.sendProfile(this.profile);
  }

  addWatchLater() {
    this.deleteAnime();
    this.profile.aniBacklog.backlist.push(this.selectedAnime);
    this.profileService.sendProfile(this.profile);
  }

  deleteAnime() {
    let index: number = this.checkList(this.profile.aniBacklog.finishedList);
    if (index !== -1) {
      this.profile.aniBacklog.finishedList.splice(index, 1);
      this.profileService.sendProfile(this.profile);
      return;
    }

    index = this.checkList(this.profile.aniBacklog.inProgList);
    if (index !== -1) {
      this.profile.aniBacklog.inProgList.splice(index, 1);
      this.profileService.sendProfile(this.profile);
      return;
    }

    index = this.checkList(this.profile.aniBacklog.backlist);
    if (index !== -1) {
      this.profile.aniBacklog.backlist.splice(index, 1);
      this.profileService.sendProfile(this.profile);
      return;
    }
  }

  checkList(list: Anime[]): number {
    let index = -1;
    for (const anime of list) {
      index = index + 1;
      if (this.selectedAnime.id === anime.id) {
        return index;
      }
    }

    return -1;
  }
}
