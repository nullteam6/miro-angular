import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  private login: Login = new Login();

  reactiveForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit() {
    this.login.username = this.reactiveForm.controls.username.value;
    this.login.password = this.reactiveForm.controls.password.value;

    this.authService.login(this.login);
  }
}
