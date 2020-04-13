import { Component, OnInit } from '@angular/core';

import { Anime } from '../models/anime';
import { Profile } from '../models/profile';
import { AnimeBacklog } from '../models/anime-backlog';

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
  cleanedAnime = new Anime();
  backLog = new AnimeBacklog();

  constructor(private s: SearchAnimeService, private profServ: ProfileService) {
    this.profServ.getProfile().subscribe((data: any) => {
      this.profile = data;
    });
  }

  ngOnInit(): void {
    this.selectedAnime = this.s.passAnime();
  }

  addWatchedList()
  {
    if(this.profile.aniBacklog === null)
    {
      this.backLog.backlist = [];
      this.backLog.droppedList = [];
      this.backLog.finishedList = [];
      this.backLog.inProgList = [];
      this.profile.aniBacklog = this.backLog;
    }
    this.cleanAnime();
    this.profile.aniBacklog.finishedList.push(this.cleanedAnime);
    this.profServ.sendProfile(this.profile);
  }
  addWatchList()
  {
    if(this.profile.aniBacklog === null)
    {
      this.backLog.backlist = [];
      this.backLog.droppedList = [];
      this.backLog.finishedList = [];
      this.backLog.inProgList = [];
      this.profile.aniBacklog = this.backLog;
    }

    this.cleanAnime();
    this.profile.aniBacklog.inProgList.push(this.cleanedAnime);
    this.profServ.sendProfile(this.profile);
  }
  addWatchLater()
  {
    if(this.profile.aniBacklog === null)
    {
      this.backLog.backlist = [];
      this.backLog.droppedList = [];
      this.backLog.finishedList = [];
      this.backLog.inProgList = [];
      this.profile.aniBacklog = this.backLog;
    }
    this.cleanAnime();
    this.profile.aniBacklog.backlist.push(this.cleanedAnime);
    alert("Added anime to your list!")
    this.profServ.sendProfile(this.profile);
  }

  cleanAnime(){
    this.cleanedAnime.logo = JSON.stringify(this.selectedAnime.logo);
    this.cleanedAnime.name = JSON.stringify(this.selectedAnime.name);
    this.cleanedAnime.synopsis = JSON.stringify(this.selectedAnime.synopsis);
    this.cleanedAnime.status = this.selectedAnime.status;
    this.cleanedAnime.id = this.selectedAnime.id;
    this.cleanedAnime.episodeCount = this.selectedAnime.episodeCount;
    this.cleanedAnime.showType = this.selectedAnime.showType;
    this.cleanedAnime.startDate = this.selectedAnime.startDate;
    this.cleanedAnime.endDate= this.selectedAnime.endDate;
  }
}
