import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ResponseService } from './response.service';
import { IUser } from '../interfaces/user';
import { CONFIG } from '../config';
import { usersData } from '../data/users.data';

@Injectable()
export class UsersService {

  currentUser: IUser;


  constructor(private http: Http, private responseService: ResponseService) { }


  getAll(): Observable<IUser[]> {
    return this.http
      .get(CONFIG.urls.users)
      .map(this.responseService.extractData)
      .catch(this.responseService.handleError);
  }


  getById(id: string): Observable<IUser> {
    return this.http
      .get(`${CONFIG.urls.users}/${id}`)
      .map(this.responseService.extractData)
      .catch(this.responseService.handleError);
  }


  createUsersBunch() {
    const users: Array<IUser> = [];

    for (let j = 0; j < usersData.length; j++) {
      const user: IUser = {
        _id: undefined,
        fullName: usersData[j].fullName,
        email: usersData[j].email,
        birthdate: usersData[j].birthdate,
        gender: usersData[j].gender,
        address: usersData[j].address
      };
      users.push(user);
    }

    const data = { users: users };

    return this.http
      .post(CONFIG.urls.root, data)
      .map(this.responseService.extractData)
      .catch(this.responseService.handleError)
    ;
  }


  deleteAllUsers() {
    return this.http
        .delete(CONFIG.urls.users)
        .map(x => x)
        .catch(this.responseService.handleError);
  }


  setCurrentUser(user: IUser) {
    this.currentUser = user;
  }


  getCurrentUser(): IUser {
    return this.currentUser;
  }


  patchUser(user: IUser) {
    return this.http.patch(`${CONFIG.urls.users}/${user._id}`, user)
             .map(this.responseService.extractData)
             .catch(this.responseService.handleError);
  }


  createUser(user: IUser) {
    return this.http.post(`${CONFIG.urls.users}`, user)
             .map(this.responseService.extractData)
             .catch(this.responseService.handleError);
  }


  deleteUser(user) {
    return this.http.delete(`${CONFIG.urls.users}/${user._id}`, user)
             .map(this.responseService.extractData)
             .catch(this.responseService.handleError);
  }


  saveEmailIfNotExists(email) {
    this.getAll().subscribe(data => {
      const flExists: boolean = data.map(item => item.email).indexOf(email) >= 0;

      if (!flExists) {
        this.createUser(<IUser>{
          _id: undefined,
          fullName: email,
          email: email
        }).subscribe(
          null,
          err => console.log(`Error on saving user ${email} : ${err}`)
        );
      }
    });
  }

}
