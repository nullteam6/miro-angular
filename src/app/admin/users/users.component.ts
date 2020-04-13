import { Component, OnInit } from '@angular/core';
import { PaginatedList } from 'src/app/models/paginated-list';
import { UserAdminService } from '../services/user-admin.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  userList: PaginatedList<User>;
  profile: Observable<Profile>;
  selectedUser: User;
  form: FormGroup;

  constructor(private userService: UserAdminService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.userService.getUsers().subscribe((data: PaginatedList<User>) => this.userList = data);
    this.form = formBuilder.group({
      'email': ['', Validators.required],
      'firstName': [''],
      'lastName': ['']
    })
   }

  ngOnInit(): void {
    
  }

  displayUserProfile(content, u: User) {
    this.selectedUser = u;
    this.modalService.open(content);
  }

  updateUser() {
    //TODO: Some stuffs with the form controls
  }

}
