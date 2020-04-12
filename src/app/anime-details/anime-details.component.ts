import { Anime } from '../models/anime';
import { SearchAnimeService } from '../services/search-anime.service';

import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';
import { AnimeBackLog } from '../models/anime-backlog';


@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.sass']
})
export class AnimeDetailsComponent implements OnInit {

  constructor(private s: SearchAnimeService, private profServ: ProfileService) { 
    this.profServ.getProfile().subscribe((data: any) => {
      this.profile = data;
      console.log("Hello")
      console.log("Profile = " + this.profile);
    });
  }

  ngOnInit(): void 
  {
    this.selectedAnime = this.s.passAnime();
    console.log(this.selectedAnime.logo);
  }

  profile = new Profile();
  selectedAnime = new Anime();

  addWatchedList(anime: Anime) {
    if(this.profile.aniBackLog.finishedList === null){
      console.log(this.profile.aniBackLog.finishedList)
    }
    // this.profile.aniBackLog.finishedList.push(anime);
    // console.log(this.profile.aniBackLog)
  }
  addWatchList(anime: Anime)
  {
    this.profile.aniBackLog.inProgList.push(anime);
  }
  addWatchLater(anime: Anime)
  {
    this.profile.aniBackLog.backList.push(anime);
  }
}
