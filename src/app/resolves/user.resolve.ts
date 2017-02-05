import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UsersService } from '../services/users.service';

@Injectable()
export class UserResolve implements Resolve<any> {

  constructor(private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.usersService.getCurrentUser();
  }
}
