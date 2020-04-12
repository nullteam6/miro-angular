import { Component, OnInit } from '@angular/core';

import { KeycloakService } from 'keycloak-angular';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  private userDetails;

  constructor(private keycloakService: KeycloakService) {
    // console.log(this.userDa)
    // console.log(this.userDetails.attributes.username);
  }

  async ngOnInit(): Promise<void> {
    this.userDetails = await this.keycloakService.loadUserProfile();
    // console.log(this.userDetails.attributes.LDAP_ENTRY_DN[0].split(',')[0].split('=')[1]);
    // console.log(this.userDetails.firstName);
  }
}
