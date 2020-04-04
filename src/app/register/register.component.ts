import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  user: User = new User();

  rForm= new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  })

  constructor(private us: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.user.username = this.rForm.controls.username.value;
    this.user.password = this.rForm.controls.password.value;
    this.user.firstName = this.rForm.controls.firstName.value;
    this.user.lastName = this.rForm.controls.lastName.value;

    this.us.sendReg(this.user);
  }

}
