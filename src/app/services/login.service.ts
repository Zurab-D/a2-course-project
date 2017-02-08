import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';

@Injectable()
export class LoginService {

  private auth: boolean = false;

  constructor(private router: Router) { }

  login(nick: string, pass: string): Observable<boolean> {
    // here ask server if user is ok
    // do not send pass, use hash function (MD5, SHA1, or SHA2) instead

    // this code is just a dummy
    this.authorised = nick === pass;

    return Observable.of(this.isAuthorised);
  }


  logout() {
    this.authorised = false;
    this.router.navigate(['/login']);
  }


  get isAuthorised(): boolean {
    console.log(`=====>> LoginService : isAuthorised : ${this.auth}`);

    return this.auth;
  }


  set authorised(value: boolean) {
    this.auth = value;
  }
}
