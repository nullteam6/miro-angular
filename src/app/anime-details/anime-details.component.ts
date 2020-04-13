import { Anime } from '../models/anime';
import { SearchAnimeService } from '../services/search-anime.service';

import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';
import { AnimeBacklog } from '../models/anime-backlog';


@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.sass']
})
export class AnimeDetailsComponent implements OnInit {

  profile = new Profile();
  selectedAnime = new Anime();
  backLog = new AnimeBacklog();

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
  }

  addWatchedList(anime: Anime) 
  {
    if(this.profile.aniBacklog === null)
    {
      this.backLog.backlist = [];
      this.backLog.droppedList = [];
      this.backLog.finishedList = [];
      this.backLog.inProgList = [];
      this.profile.aniBacklog = this.backLog;
    }
    this.cleanAnime(anime);
    this.profile.aniBacklog.finishedList.push(anime);
    this.profServ.sendProfile(this.profile);
  }
  addWatchList(anime: Anime)
  {
    if(this.profile.aniBacklog === null)
    {
      this.backLog.backlist = [];
      this.backLog.droppedList = [];
      this.backLog.finishedList = [];
      this.backLog.inProgList = [];
      this.profile.aniBacklog = this.backLog;
      console.log("Anime Backlog: "+ JSON.stringify(this.profile.aniBacklog))
    }
    this.cleanAnime(anime);
    this.profile.aniBacklog.inProgList.push(anime);
    this.profServ.sendProfile(this.profile);
  }
  addWatchLater(anime: Anime)
  {
    if(this.profile.aniBacklog === null)
    {
      this.backLog.backlist = [];
      this.backLog.droppedList = [];
      this.backLog.finishedList = [];
      this.backLog.inProgList = [];
      this.profile.aniBacklog = this.backLog;
    }
    this.cleanAnime(anime);
    this.profile.aniBacklog.backlist.push(anime);
    this.profServ.sendProfile(this.profile);
  }

  cleanAnime(anime: Anime){
    anime.logo = JSON.stringify(anime.logo);
    anime.name = JSON.stringify(anime.name);
    anime.synopsis = JSON.stringify(anime.synopsis);
  }
}
