import { Component, OnInit } from '@angular/core';

import { IUser } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: IUser[] = [];

  constructor(private usersService: UsersService) { }


  ngOnInit() {
    this.usersService
      .getAll()
      .subscribe(users => {
        this.users = users.sort((a, b) => a.fullName > b.fullName ? 1 : -1);
      });
  }


  genUsers() {
    this.usersService.createUsersBunch().subscribe();
  }


  userClicked(user) {
    this.usersService.setCurrentUser(user);
  }
}
