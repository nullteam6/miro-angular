import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from '../services/profile.service';
import {User} from '../models/user';
import {Profile} from '../models/profile';
import {UserService} from '../services/user.service';
import {Anime} from '../models/anime';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-selected-profile-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ selectedProfile.uid }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body text-center">
<!--      <p>User</p>-->
      <ngb-accordion [closeOthers]="true" activeIds="backlist">
        <ngb-panel *ngFor="let animeList of animeListArr" id="{{ animeList['id'] }}" title="{{ animeList['name'] }}">
          <ng-template ngbPanelContent>
            <table class="table table-borderless table-hover table-responsive-md">
              <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Title</th>
                <th scope="col">Episodes</th>
                <th scope="col">Format</th>
                <th scope="col">Status</th>
                <th scope="col">Started</th>
                <th scope="col">Ended</th>
              </tr>
              </thead>
              <tbody>
              <tr *ngFor="let anime of animeList['listName']">
                <td>
                  <img src="{{ anime['logo'] | jsonParser }}" alt="Anime logo" width="50px" height="50px" class="rounded">
                </td>
                <td>
                  <p>{{ anime['name'] | jsonParser }}</p>
                </td>
                <td>
                  <p>{{ anime['episodeCount'] }}</p>
                </td>
                <td>
                  <p>{{ anime['showType'] | jsonParser }}</p>
                </td>
                <td>
                  <p>{{ anime['status'] | jsonParser | titlecase }}</p>
                </td>
                <td>
                  <p>{{ anime['startDate'] | jsonParser | date }}</p>
                </td>
                <td>
                  <p>{{ anime['endDate'] | jsonParser | date }}</p>
                </td>
              </tr>
              </tbody>
            </table>
          </ng-template>
        </ngb-panel>
      </ngb-accordion>
<!--      <app-profile-display></app-profile-display>-->

<!--      <div class="btn-group" role="group" aria-label="Move buttons">-->
<!--        <button *ngIf="!isInList('backlist')" type="button" class="btn btn-dark" (click)="moveAnime('backlist'); activeModal.close('Close click')">Planning</button>-->
<!--        <button *ngIf="!isInList('inProgList')" type="button" class="btn btn-dark" (click)="moveAnime('inProgList'); activeModal.close('Close click')">Watching</button>-->
<!--        <button *ngIf="!isInList('finishedList')" type="button" class="btn btn-dark" (click)="moveAnime('finishedList'); activeModal.close('Close click')">Completed</button>-->
<!--        <button *ngIf="!isInList('droppedList')" type="button" class="btn btn-dark" (click)="moveAnime('droppedList'); activeModal.close('Close click')">Dropped</button>-->
<!--      </div>-->

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-warning" (click)="profileService.unfollow(loggedInProfile, selectedProfile); activeModal.close('Close click')">Unfollow</button>
    </div>
  `
})
export class SelectedProfileModalComponent implements OnInit {
  @Input() loggedInProfile: Profile;
  @Input() selectedProfile: Profile;
  public animeListArr = [];

  constructor(
    public activeModal: NgbActiveModal,
    public profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.setProfile();
  }

  setProfile() {
    const planToWatchList = {
      id: 'backlist',
      name: 'Planning',
      listName: this.selectedProfile.aniBacklog.backlist,
    };
    const inProgressList = {
      id: 'inProgList',
      name: 'Watching',
      listName: this.selectedProfile.aniBacklog.inProgList,
    };
    const finishedList = {
      id: 'finishedList',
      name: 'Completed',
      listName: this.selectedProfile.aniBacklog.finishedList,
    };
    const droppedList = {
      id: 'droppedList',
      name: 'Dropped',
      listName: this.selectedProfile.aniBacklog.droppedList,
    };

    this.animeListArr.push(planToWatchList);
    this.animeListArr.push(inProgressList);
    this.animeListArr.push(finishedList);
    this.animeListArr.push(droppedList);
  }
  // updateProfile() {
  //   this.profileService.sendProfile(this.profile);
  // }
}

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.sass']
})
export class FollowingComponent implements OnInit {
  loggedInProfile = new Profile();
  // selectedProfile: Profile;

  constructor(
    private profileService: ProfileService,
    private modalService: NgbModal
  ) {
    this.profileService.getProfile().subscribe((data: Profile) => {
      this.loggedInProfile = data;
    });
  }

  ngOnInit(): void {
  }

  // open(profile: Profile) {
  //   this.profileService.profile = profile;
  //
  // }

  open(selectedProfile: Profile) {
    const modalRef = this.modalService.open(SelectedProfileModalComponent, { size: 'lg' });
    modalRef.componentInstance.loggedInProfile = this.loggedInProfile;
    modalRef.componentInstance.selectedProfile = selectedProfile;
    // modalRef.componentInstance.username = profile.uid;
    // modalRef.componentInstance.animeList = animeList;
    // modalRef.componentInstance.anime = anime;
    // modalRef.componentInstance.title = this.jsonParse.transform(anime.name);
  }
}
