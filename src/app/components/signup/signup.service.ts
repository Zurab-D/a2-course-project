import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';

import { ResponseService } from '../../services/response.service';
import { CONFIG } from '../../config';


@Injectable()
export class SignupService {
  private urlSignin = CONFIG.urlsAuth.urlSignin; // '/signin';
  private urlSignup = CONFIG.urlsAuth.urlSignup; // '/signup';

  public user = {};


  constructor(private router: Router,
              private http: Http,
              private responseService: ResponseService) {
  }


  // -- Sign up --------------------------------------------------
  signup(nick: string, pass: string, email: string): Observable<boolean> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = { username: nick, password: pass, email: email };
    return this.http
               .post(this.urlSignup, body, <RequestOptionsArgs> {headers: headers, withCredentials: true})
               .map(this.responseService.extractData)
               .catch(this.responseService.handleError);
  }


  // -- Sign in --------------------------------------------------
  signin(formValue): Observable<boolean> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = { username: formValue.nick, password: formValue.pass };
    return this.http
               .post(this.urlSignin, body, <RequestOptionsArgs> {headers: headers, withCredentials: true})
               .map(this.responseService.extractData)
               .map(res => this.user = res)
               .catch(this.responseService.handleError);
  }

}
