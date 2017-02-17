/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterStub } from '../../../testing';

import { LoginComponent } from './login.component';
import { LoginService } from '../../services/login.service';
import { AuthGuardService } from '../../services/auth-guard.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ LoginComponent ],
      providers: [
        LoginService,
        AuthGuardService,
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


  it('should create', () => {
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


  it('should pass', () => {
    component.loginForm.setValue({nick: 'aaa', pass: 'aaa'});
    component.onSubmit();
    expect(component.authorised).toBe(true);
  });


  it('should not pass', () => {
    component.loginForm.setValue({nick: 'aaa', pass: 'bbb'});
    component.onSubmit();
    expect(component.authorised).toBe(false);
  });
});
