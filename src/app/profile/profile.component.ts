import { Component, OnInit, ViewChild } from '@angular/core';

import { ProfileDisplayComponent } from '../profile-display/profile-display.component';

import { UserService } from '../services/user.service';

import { Profile } from '../models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  public profile = new Profile();
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
