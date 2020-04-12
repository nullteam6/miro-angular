import { Component, OnInit } from '@angular/core';

import { KeycloakService } from 'keycloak-angular';

import { Profile } from '../models/profile';
import { AnimeBacklog } from '../models/anime-backlog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  public profile = new Profile();

  constructor(
    private keycloakService: KeycloakService,
    private userService: UserService,
  ) {
    this.profile.aniBacklog = new AnimeBacklog();

    this.userService.getUser().subscribe(
      user => {
        this.profile = user.profile;
      }
    );
  }

  ngOnInit() { }
}
