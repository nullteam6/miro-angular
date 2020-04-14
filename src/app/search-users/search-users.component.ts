import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { PaginatedList } from '../models/paginated-list';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.sass']
})
export class SearchUsersComponent implements OnInit {
  loggedInProfile: Profile;
  profileList: PaginatedList<Profile>;
  formGroup = new FormGroup({
    userInput: new FormControl(''),
  });

  constructor(private profileService: ProfileService, private userService: UserService) {
    this.profileService.getProfile().subscribe((data: Profile) => {
      this.loggedInProfile = data;
    });
    this.profileService.getAll().subscribe((data: PaginatedList<Profile>) => {
      this.profileList = data;
    });
   }

  ngOnInit(): void {
  }

  searchForUser() {
    alert (this.formGroup.controls.userInput.value);
    this.profileService.search(this.formGroup.controls.userInput.value).subscribe((data: PaginatedList<Profile>) => {
      this.profileList = data;
    })
  }

  keydown(event) {
    if (event.key === 'Enter') {
      this.searchForUser();
    }
  }

  displayUserProfile(profile: Profile) {
    
  }

}
