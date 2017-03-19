/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ResponseService } from './response.service';
import { LoginService } from './login.service';
import { Router, RouterStub } from '../../testing';

describe('LoginService', () => {
  beforeAll(() => {
    console.log('');
    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        LoginService,
        ResponseService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: Router, useClass: RouterStub }
      ]
    });
  });

  it('should login service exists', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  it('should logout() function exists', inject([LoginService], (service: LoginService) => {
    expect(service.logout).toBeTruthy();
  }));

  it('should service to be instance of LoginService', inject([LoginService], (service: LoginService) => {
    expect(service instanceof LoginService).toBe(true);
  }));

  it('-> login() should --succeed-- with correct login/pass', inject([LoginService], (service: LoginService) => {
    service.signin({nick: 'abc', pass: 'abc'}).subscribe(res => expect(res).toBe(true));
  }));

  it('-> login() should --fail-- with incorrect login/pass', inject([LoginService], (service: LoginService) => {
    service.signin({nick: 'aaa', pass: 'bbb'}).subscribe(res => expect(res).toBe(false));
  }));

  it('-> service.isAuthorised exists & it\'s an Subscribable ', inject([LoginService], (service: LoginService) => {
    expect(service.isAuthorised().subscribe).toBeTruthy;
  }));

  it('-> service.isAuthorised type is Observable ', inject([LoginService], (service: LoginService) => {
    expect( service.isAuthorised instanceof Observable ).toBeTruthy;
  }));

  it('-> logout() should --succeed--', inject([XHRBackend, LoginService], (mockBackend: MockBackend, service: LoginService) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      const responseOptions = new ResponseOptions({ body: 'Ok' });
      connection.mockRespond(new Response(responseOptions));
      expect(connection.request.url).toEqual('/logout');
    });

    service.logout().subscribe(res => {
      expect(res).toBe;
    });
  }));

});
