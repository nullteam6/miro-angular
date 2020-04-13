import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  isLoggedIn: Observable<boolean>;
  isAdmin: boolean;

  constructor(public authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn();
    this.isAdmin = authService.isAdmin();
  }

  ngOnInit(): void { }
}
