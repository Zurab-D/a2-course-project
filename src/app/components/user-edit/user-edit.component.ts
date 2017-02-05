/**
 * This form is template-driven
 * Letter editing form (mail-edit) is reactive riven
 */


import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../../services/users.service';
import { User, IUser } from '../../interfaces/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, AfterViewInit {

  private id: string;
  public user: IUser = new User();
  public tmpUser: IUser = undefined;


  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) {
  }


  ngOnInit() {

    // get user from resolved data
    this.tmpUser = this.route.snapshot.data['user'];

    if (!this.tmpUser) {
      console.log('user data not resolved & got from the server!!!');

      // user data not resolved. go get user data from the server.
      // this happens when user comes here by direct link (previously saved, for example)
      this.route
          .params
          .subscribe(params => {
            this.id = params['id'] || '';
            if (this.id) {
              this.usersService
                  .getById(this.id)
                  .subscribe(data => {
                    this.user = data;
                  });
            }
        });
    } else {
      console.log('user data resolved.');
      this.user = this.tmpUser;
    }

  }


  ngAfterViewInit() {
  }


  onSubmit(f: NgForm) {
    console.log(f.value);
  }


  clickBack() {
    // const prevRouterState = this.router.url.split('/').filter(item => !!item).splice(-2, 1);
    // this.router.navigate(['/users']);
    this.location.back();
  }

}
