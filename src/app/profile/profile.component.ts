import { Component, Input, OnInit } from '@angular/core';

import { KeycloakService } from 'keycloak-angular';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../services/user.service';
import { ProfileService } from '../services/profile.service';

import { Profile } from '../models/profile';
import { AnimeBacklog } from '../models/anime-backlog';
import { Anime } from '../models/anime';

import { JsonParse } from '../pipes/json-parse';

@Component({
  selector: 'app-selected-anime-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ title }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body text-center">
      <p>Move to:</p>
      <div class="btn-group" role="group" aria-label="Move buttons">
        <button *ngIf="!isInList('backlist')" type="button" class="btn btn-dark" (click)="moveAnime('backlist'); activeModal.close('Close click')">Planning</button>
        <button *ngIf="!isInList('inProgList')" type="button" class="btn btn-dark" (click)="moveAnime('inProgList'); activeModal.close('Close click')">Watching</button>
        <button *ngIf="!isInList('finishedList')" type="button" class="btn btn-dark" (click)="moveAnime('finishedList'); activeModal.close('Close click')">Completed</button>
        <button *ngIf="!isInList('droppedList')" type="button" class="btn btn-dark" (click)="moveAnime('droppedList'); activeModal.close('Close click')">Dropped</button>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="deleteAnime(); updateProfile(); activeModal.close('Close click')">Remove</button>
    </div>
  `
})
export class SelectedAnimeModalComponent {
  @Input() profile: Profile;
  @Input() animeListId: string;
  @Input() animeList: Anime[];
  @Input() anime: Anime;
  @Input() title: string;

  constructor(
    public activeModal: NgbActiveModal,
    private profileService: ProfileService
  ) { }

  moveAnime(listName: string) {
    this.deleteAnime();
    this.profile.aniBacklog[listName].push(this.anime);
    this.updateProfile();
  }

  getAnimeId(): number {
    return this.animeList.indexOf(this.anime, 0);
  }

  isInList(listName: string): boolean {
    return this.profile.aniBacklog[listName].includes(this.anime);
  }

  deleteAnime() {
    this.profile.aniBacklog[this.animeListId].splice(this.getAnimeId(), 1);
  }

  updateProfile() {
    this.profileService.sendProfile(this.profile);
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  providers: [JsonParse]
})
export class ProfileComponent implements OnInit {
  public profile = new Profile();
  public animeListArr = [];

  constructor(
    private keycloakService: KeycloakService,
    private userService: UserService,
    private modalService: NgbModal,
    private jsonParse: JsonParse,
  ) {
    this.profile.aniBacklog = new AnimeBacklog();

    this.userService.getUser().subscribe(
      user => {
        this.profile = user.profile;

        const planToWatchList = {
          id: 'backlist',
          name: 'Planning',
          listName: this.profile.aniBacklog.backlist,
        };
        const inProgressList = {
          id: 'inProgList',
          name: 'Watching',
          listName: this.profile.aniBacklog.inProgList,
        };
        const finishedList = {
          id: 'finishedList',
          name: 'Completed',
          listName: this.profile.aniBacklog.finishedList,
        };
        const droppedList = {
          id: 'droppedList',
          name: 'Dropped',
          listName: this.profile.aniBacklog.droppedList,
        };

        this.animeListArr.push(planToWatchList);
        this.animeListArr.push(inProgressList);
        this.animeListArr.push(finishedList);
        this.animeListArr.push(droppedList);
      }
    );
  }

  open(profile: Profile, animeListId: string, animeList: Anime[], anime: Anime) {
    const modalRef = this.modalService.open(SelectedAnimeModalComponent);
    modalRef.componentInstance.profile = profile;
    modalRef.componentInstance.animeListId = animeListId;
    modalRef.componentInstance.animeList = animeList;
    modalRef.componentInstance.anime = anime;
    modalRef.componentInstance.title = this.jsonParse.transform(anime.name);
  }

  ngOnInit() { }
}
