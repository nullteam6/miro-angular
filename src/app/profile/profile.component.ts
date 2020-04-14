import { Component, OnInit } from '@angular/core';

import { KeycloakService } from 'keycloak-angular';

import { UserService } from '../services/user.service';

import { Profile } from '../models/profile';
import {AnimeBacklog} from '../models/anime-backlog'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  public profile = new Profile();
  public animeListArr = [];

  constructor(
    private keycloakService: KeycloakService,
    private userService: UserService,
  ) {
    this.profile.aniBacklog = new AnimeBacklog();

    this.userService.getUser().subscribe(
      user => {
        this.profile = user.profile;

        const planToWatchList = {
          id: 'backlist',
          name: 'Plan to Watch',
          listName: this.profile.aniBacklog.backlist,
        };
        const inProgressList = {
          id: 'inProgList',
          name: 'In Progress',
          listName: this.profile.aniBacklog.inProgList,
        };
        const finishedList = {
          id: 'finishedList',
          name: 'Finished',
          listName: this.profile.aniBacklog.finishedList,
        };

        this.animeListArr.push(planToWatchList);
        this.animeListArr.push(inProgressList);
        this.animeListArr.push(finishedList);
      }
    );
  }

  ngOnInit() { }
}
