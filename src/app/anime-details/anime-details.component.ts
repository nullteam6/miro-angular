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
    private profileServ: ProfileService, 
    private authService: AuthService
    ) {
    this.authService.isLoggedIn().subscribe((data) => {
      this.isLoggedIn = data;
      if (data) { 
        this.profileServ.getProfile().subscribe((profile: any) => {
          this.profile = profile;
        });
      }
    });
  }

  ngOnInit(): void {
    this.selectedAnime = this.searchService.passAnime();
  }

  addWatchedList() {
    this.deleteAnime();
    this.profile.aniBacklog.finishedList.push(this.selectedAnime);
    this.profileServ.sendProfile(this.profile);
  }
  addWatchList() {
    this.deleteAnime();
    this.profile.aniBacklog.inProgList.push(this.selectedAnime);
    this.profileServ.sendProfile(this.profile);
  }
  addWatchLater() {
    this.deleteAnime();
    this.profile.aniBacklog.backlist.push(this.selectedAnime);
    this.profileServ.sendProfile(this.profile);
  }
  
  deleteAnime()
  {
    let index: number = this.checkList(this.profile.aniBacklog.finishedList);
    
    if( index !== -1){
      this.profile.aniBacklog.finishedList.splice(index, 1);
      this.profileServ.sendProfile(this.profile);
      return;
    }
    index = this.checkList(this.profile.aniBacklog.inProgList);
    if( index !== -1){
      this.profile.aniBacklog.inProgList.splice(index, 1);
      this.profileServ.sendProfile(this.profile);
      return;
    }
    index = this.checkList(this.profile.aniBacklog.backlist);
    if( index !== -1){
      this.profile.aniBacklog.backlist.splice(index, 1);
      this.profileServ.sendProfile(this.profile);
      return;
    } 
  }
  checkList(list: Anime[]): number
  {
    let index: number = -1;
    for( let anime of list)
    {
      index=index+1;
      console.log(this.selectedAnime.id === anime.id)
      if(this.selectedAnime.id === anime.id)
      {
        return index;
      }
    }
    return -1;
  } 
}