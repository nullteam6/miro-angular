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
      console.log("Anime Backlog: "+ JSON.stringify(this.profile.aniBacklog));
    }
    console.log("Profile id: "+ JSON.stringify(this.profile.id));
    this.profile.aniBacklog.finishedList.push(anime);
    console.log("Anime finishedList: "+JSON.stringify(this.profile.aniBacklog.finishedList)+" Array Length: "+ this.profile.aniBacklog.finishedList.length);
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
    console.log("Profile id: "+ JSON.stringify(this.profile.id));
    this.profile.aniBacklog.inProgList.push(anime);
    console.log("Anime inProgList: "+JSON.stringify(this.profile.aniBacklog.inProgList));
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
      console.log("Anime Backlog: "+ JSON.stringify(this.profile.aniBacklog))
    }
    console.log("Profile id: "+ JSON.stringify(this.profile.id));
    this.profile.aniBacklog.backlist.push(anime);
    console.log("Anime backlist: "+JSON.stringify(this.profile.aniBacklog.backlist));
    this.profServ.sendProfile(this.profile);
  }
}
