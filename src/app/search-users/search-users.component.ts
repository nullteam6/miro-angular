import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { PaginatedList } from '../models/paginated-list';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileDisplayComponent } from '../profile-display/profile-display.component';

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
  selectedProfile: Profile;
  selectedIsFollowed: boolean = false;
  @ViewChild(ProfileDisplayComponent) profileDisplay: ProfileDisplayComponent;
  collectionSize = 0;
  page = 1;
  pageSize = 10;
  searched = false;

  constructor(
    private profileService: ProfileService,
    public modalService: NgbModal) {
    this.profileList = new PaginatedList<Profile>();
    this.profileService.getProfile().subscribe((data: Profile) => {
      this.loggedInProfile = data;
    });
    this.profileService.getAll().subscribe((data: PaginatedList<Profile>) => {
      this.profileList = data;
      this.collectionSize = data.totalCount;
    });
   }

  ngOnInit(): void {
  }

  pageChange() {
    if (this.searched) {
      this.profileService.search(this.formGroup.controls.userInput.value, this.page * 10 - 10);
    }
    this.profileService.getAll(this.page * 10 - 10);
  }

  searchForUser() {
    if (this.formGroup.controls.userInput.value == null) {
      this.searched = false;
      this.profileService.getAll().subscribe(data => this.profileList = data);
    } else {
      this.searched = true;
      this.profileService.search(this.formGroup.controls.userInput.value).subscribe(data => this.profileList = data);
    }

  }

  keydown(event): void {
    if (event.key === 'Enter') {
      this.searchForUser();
    }
  }

  openModal(profile: Profile) {
    this.selectedIsFollowed = false;
    this.selectedProfile = profile;
    this.loggedInProfile.followingList.forEach(element => {
      if (element.uid === profile.uid)
        this.selectedIsFollowed = true;      
    });
    this.profileDisplay.setProfile(profile, false);
    document.getElementById('profileHeader').innerHTML = `User profile: ${profile.uid}`;
    document.getElementById('profileModal').style.display = 'block';
  }

  closeModal() {
    document.getElementById('profileModal').style.display = 'none';
  }

  follow(profile: Profile): void {
    this.loggedInProfile.followingList.push(this.selectedProfile);
    this.profileService.sendProfile(this.loggedInProfile);
    this.modalService.dismissAll();
  }

  unfollow(profile: Profile): void {
    this.loggedInProfile.followingList = this.loggedInProfile.followingList.filter(e => e.uid != profile.uid);
    this.profileService.sendProfile(this.loggedInProfile);
    this.modalService.dismissAll();
  }
}