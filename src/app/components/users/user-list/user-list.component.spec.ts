/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UsersService } from '../../../services/users.service';
import { UsersListComponent } from './user-list.component';
import { Router, RouterStub, RouterLinkStubDirective, RouterOutletStubComponent } from '../../../../testing';


import { HttpModule } from '@angular/http';
import { ResponseService } from '../../../services/response.service';
import { IUser, User } from '../../../interfaces/user';

let spy: jasmine.Spy;
let usersService: UsersService;
const mockUserList: IUser[] = [];

mockUserList.push(new User(null, 'John', 'john@mail.com'));
mockUserList.push(new User(null, 'Mike', 'mike@mail.com'));
mockUserList.push(new User(null, 'Anna', 'anna@mail.com'));
mockUserList.push(new User(null, 'Sara', 'sara@mail.com'));
mockUserList.push(new User(null, 'Ivan', 'ivan@mail.com'));


describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [
        UsersListComponent, RouterLinkStubDirective, RouterOutletStubComponent
      ],
      providers: [
        UsersService,
        ResponseService,
        { provide: Router, useClass: RouterStub }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;

    usersService = fixture.debugElement.injector.get(UsersService);
    spy = spyOn(usersService, 'getAll').and.returnValue(Observable.of(mockUserList));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call UsersService', () => {
    component.ngOnInit();
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should user[0] == Anna', () => {
    component.ngOnInit();
    expect(component.users[0].fullName).toEqual('Anna');
  });

  it('should user[2] == John', () => {
    component.ngOnInit();
    expect(component.users[2].fullName).toEqual('John');
  });
});
