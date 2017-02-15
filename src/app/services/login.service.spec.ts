/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginService } from './login.service';

import { Router, RouterStub } from '../../testing';

describe('LoginService', () => {
  beforeAll(() => {
    console.log('');
    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: Router, useClass: RouterStub }
      ]
    });
  });

  it('should service exists', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  it('should service to be instance of LoginService', inject([LoginService], (service: LoginService) => {
    expect(service instanceof LoginService).toBe(true);
  }));

  it('-> login() should --succeed-- with correct login/pass', inject([LoginService], (service: LoginService) => {
    service.login('abc', 'abc').subscribe(res => expect(res).toBe(true));
  }));

  it('-> login() should --fail-- with incorrect login/pass', inject([LoginService], (service: LoginService) => {
    service.login('aaa', 'bbb').subscribe(res => expect(res).toBe(false));
  }));

  it('-> getter & setter should work #1', inject([LoginService], (service: LoginService) => {
    service.authorised = true;
    expect(service.isAuthorised).toBe(true);
  }));

  it('-> getter & setter should work #2', inject([LoginService], (service: LoginService) => {
    service.authorised = false;
    expect(service.isAuthorised).toBe(false);
  }));

  it('-> logout() should --succeed--', inject([LoginService], (service: LoginService) => {
    service.authorised = true;
    service.logout();
    expect(service.isAuthorised).toBe(false);
  }));

});
