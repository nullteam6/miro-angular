import { Component, OnInit } from '@angular/core';

import { Anime } from '../models/anime';
import { Profile } from '../models/profile';
import { AnimeBacklog } from '../models/anime-backlog';

import { SearchAnimeService } from '../services/search-anime.service';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.sass']
})
export class AnimeDetailsComponent implements OnInit {
  profile = new Profile();
  selectedAnime = new Anime();
  backLog = new AnimeBacklog();
  isLoggedIn: boolean;

  constructor(
    private searchService: SearchAnimeService, 
    private profilfeServ: ProfileService, 
    private authService: AuthService
    ) {
    this.authService.isLoggedIn().subscribe((data) => {
      this.isLoggedIn = data;
      if (data) { 
        this.profilfeServ.getProfile().subscribe((data: any) => {
          this.profile = data;
        });
      }
    });
  }

  ngOnInit(): void {
    this.selectedAnime = this.searchService.passAnime();
  }

  addWatchedList() {
    this.profile.aniBacklog.finishedList.push(this.selectedAnime);
    this.profilfeServ.sendProfile(this.profile);
  }
  addWatchList() {
    this.profile.aniBacklog.inProgList.push(this.selectedAnime);
    this.profilfeServ.sendProfile(this.profile);
  }
  addWatchLater() {
    this.profile.aniBacklog.backlist.push(this.selectedAnime);
    this.profilfeServ.sendProfile(this.profile);
  }
}
