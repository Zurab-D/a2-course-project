import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, User } from '../../../interfaces/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: IUser[] = [];

  constructor(private usersService: UsersService,
              private router: Router) { }


  ngOnInit() {
    this.usersService
      .getAll()
      .subscribe(users => {
        this.users = users.sort((a, b) => a.fullName > b.fullName ? 1 : -1)
                          .map(user => {
                            return new User(
                              user._id,
                              user.fullName,
                              user.email,
                              (user.birthdate ? new Date(user.birthdate) : undefined),
                              user.gender,
                              user.address
                            );
                          });
      });

  }


  genUsers() {
    this.usersService.createUsersBunch().subscribe();
  }


  userClicked(user) {
    this.usersService.setCurrentUser(user);
  }


  clickAdd() {
    this.router.navigate(['users', 'new']);
  }


  clickXBtn(user) {
    if (window.confirm('Are you sure?')) {
      this.usersService
          .deleteUser(user)
          .subscribe(data => {
            const i = this.users.indexOf(user);
            if (i >= 0) {
              this.users.splice(i, 1);
            }
          });
    }
  }

}
