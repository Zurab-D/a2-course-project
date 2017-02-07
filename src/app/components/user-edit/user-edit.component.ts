/**
 * This form is template-driven
 * Letter editing form (mail-edit) is reactive
 */


import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../../services/users.service';
import { User, IUser } from '../../interfaces/user';

import { IMyDateModel, IMyOptions } from 'mydatepicker';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, AfterViewInit {

  private id: string;
  public user: IUser = new User();
  public tmpUser: IUser = undefined;
  private errorMsg;

  private model: Object;


  myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd.mm.yyyy',
  };

  onDateChanged(event: IMyDateModel) {
    this.user.birthdate = new Date(event.jsdate);
  }

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) {
    this.tmpUser = this.route.snapshot.data['user'];
  }


  ngOnInit() {

    // get user from resolved data
    this.tmpUser = this.route.snapshot.data['user'];

    this.route
        .params
        .subscribe(params => {
          this.id = params['id'] || '';
          if (!this.tmpUser) {
            // user data not resolved. go get user data from the server.
            // this happens when user comes here by direct link (previously saved, for example)
            if (this.id) {
              this.usersService
                  .getById(this.id)
                  .subscribe(data => {
                    this.user = {
                      _id: data._id,
                      fullName: data.fullName,
                      email: data.email,
                      birthdate: new Date(data.birthdate),
                      gender: data.gender,
                      address: data.address
                    };

                    this.ngAfterViewInit_Function();
                    console.log('user data not resolved & got from the server!!!');
                  });
            }
          } else {
            this.user = this.tmpUser;
            this.ngAfterViewInit_Function();
            console.log('user data resolved.');
          }
      });

  }


  ngAfterViewInit() {
  }

  ngAfterViewInit_Function() {
    let dt: Date;

    if (this.user.birthdate) {
      dt = this.user.birthdate;
    } else {
      dt = new Date();
    };

    this.model = { date: {
      year: dt.getFullYear(),
      month: dt.getMonth() + 1,
      day: dt.getDate()
    }};
  }


  onSubmit(f: NgForm) {
    if (this.user._id) {
      this.usersService
          .patchUser(this.user)
          .subscribe(
            data => {
              console.log('user patched');
              this.router.navigate(['/users']);
            },
            err => {
              this.errorMsg = err;
            }
          );
    } else {
      this.usersService
          .createUser(this.user)
          .subscribe(
            data => {
              console.log('user created!');
              this.router.navigate(['/users']);
            },
            err => {
              this.errorMsg = err;
            }
          );
    }
  }


  clickBack() {
    // const prevRouterState = this.router.url.split('/').filter(item => !!item).splice(-2, 1);
    // this.router.navigate(['/users']);
    this.location.back();
  }

}
