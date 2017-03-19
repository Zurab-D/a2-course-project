/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterStub } from '../../../testing';

import { ResponseService } from '../../services/response.service';
import { LoginComponent } from './login.component';
import { LoginService } from '../../services/login.service';
import { AuthGuardService } from '../../services/auth-guard.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpModule ],
      declarations: [ LoginComponent ],
      providers: [
        LoginService,
        AuthGuardService,
        ResponseService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should exists onSubmit() method', () => {
    expect(component.onSubmit).toBeTruthy();
  });


  it('form invalid when empty', () => {
    component.loginForm.setValue({nick: '', pass: ''});
    expect(component.loginForm.valid).toBeFalsy();
  });


  it('form invalid when short values', () => {
    component.loginForm.setValue({nick: 'a', pass: 'a'});
    component.onSubmit();
    expect(component.authorised).toBe(false);
  });


  /* -- это было написано для фейкового логина --
  it('should pass', () => {
    component.loginForm.setValue({nick: 'aaa', pass: 'aaa'});
    component.onSubmit();
    expect(component.authorised).toBe(true);
  });


  it('should not pass', () => {
    component.loginForm.setValue({nick: 'aaa', pass: 'bbb'});
    component.onSubmit();
    expect(component.authorised).toBe(false);
  });*/
});
