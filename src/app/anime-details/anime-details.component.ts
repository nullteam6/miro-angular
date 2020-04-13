import { Component, OnInit } from '@angular/core';

import { Anime } from '../models/anime';
import { Profile } from '../models/profile';

import { SearchAnimeService } from '../services/search-anime.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.sass']
})
export class AnimeDetailsComponent implements OnInit {
  profile = new Profile();
  selectedAnime = new Anime();

  constructor(private s: SearchAnimeService, private profServ: ProfileService) {
    this.profServ.getProfile().subscribe((data: any) => {
      this.profile = data;
    });
  }

  ngOnInit(): void {
    this.selectedAnime = this.s.passAnime();
  }

  addWatchedList(anime: Anime) {
    this.profile.aniBacklog.finishedList.push(anime);
    this.profServ.sendProfile(this.profile);
  }

  addWatchList(anime: Anime) {
    this.profile.aniBacklog.inProgList.push(anime);
    this.profServ.sendProfile(this.profile);
  }

  addWatchLater(anime: Anime) {
    this.profile.aniBacklog.backlist.push(anime);
    this.profServ.sendProfile(this.profile);
  }
}
