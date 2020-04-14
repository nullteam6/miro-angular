import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { PaginatedList } from '../models/paginated-list';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  selectedProfileContent = [];
  selectedIsFollowed: boolean = false;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    public modalService: NgbModal) {
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

  open(content, profile: Profile) {
    this.selectedIsFollowed = false;
    this.selectedProfile = profile;
    this.buildModalList(profile);
    if (this.loggedInProfile.followingList.includes(profile))
      this.selectedIsFollowed = true;
    this.modalService.open(content,{size: 'xl', scrollable: true});
  }

  buildModalList(profile: Profile) {
    this.selectedProfileContent = new Array();
    const planToWatchList = {
      id: 'backlist',
      name: 'Plan to Watch',
      listContent: profile.aniBacklog.backlist,
    };
    const inProgressList = {
      id: 'inProgList',
      name: 'In Progress',
      listContent: profile.aniBacklog.inProgList,
    };
    const finishedList = {
      id: 'finishedList',
      name: 'Finished',
      listContent: profile.aniBacklog.finishedList,
    };
    const droppedList = {
      id: 'droppedList',
      name: 'Dropped',
      listContent: profile.aniBacklog.droppedList,
    };
    this.selectedProfileContent.push(planToWatchList);
    this.selectedProfileContent.push(inProgressList);
    this.selectedProfileContent.push(finishedList);
    this.selectedProfileContent.push(droppedList);
  }

  follow(profile: Profile) {
    this.loggedInProfile.followingList.push(this.selectedProfile);
    this.profileService.sendProfile(this.loggedInProfile);
    this.modalService.dismissAll();
  }

  unfollow(profile: Profile) {
    this.loggedInProfile.followingList = this.loggedInProfile.followingList.filter(e => e.uid != profile.uid);
    this.profileService.sendProfile(this.loggedInProfile);
    this.modalService.dismissAll();
  }
}
