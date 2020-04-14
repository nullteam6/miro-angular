import { Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from '../services/user.service';

import { Profile } from '../models/profile';


import { JsonParse } from '../pipes/json-parse';
import { ProfileDisplayComponent } from '../profile-display/profile-display.component';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  providers: [JsonParse]
})
export class ProfileComponent implements OnInit {
  public profile = new Profile();
  public animeListArr = [];
  @ViewChild(ProfileDisplayComponent) profileDisplay: ProfileDisplayComponent;

  constructor(
    private userService: UserService,
  ) {
    this.userService.getUser().subscribe(
      user => {
        this.profile = user.profile;
        this.profileDisplay.setProfile(this.profile, true);
      }
    );
  }

  ngOnInit() { }

}
