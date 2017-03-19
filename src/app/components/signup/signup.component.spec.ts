/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Router, RouterStub } from '../../../testing';
import { ResponseService } from '../../services/response.service';
import { SignupComponent } from './signup.component';
import { LoginService } from '../../services/login.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpModule],
      declarations: [ SignupComponent ],
      providers: [
        LoginService,
        ResponseService,
        { provide: Router, useClass: RouterStub },
      ],
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('form is valid when valid values', () => {
    component.signupForm.setValue({name: 'John', nick: 'Doe', email: 'a@a.a', pass: '12345', pass2: '12345'});
    expect(component.signupForm.valid).toBe(true);
  });


  it('form is invalid when empty', () => {
    component.signupForm.setValue({name: '', nick: '', email: '', pass: '', pass2: ''});
    expect(component.signupForm.valid).toBe(false);
  });


  it('form is invalid when short values', () => {
    component.signupForm.setValue({name: 'aa', nick: 'aa', email: 'a@a.a', pass: '1', pass2: '2'});
    expect(component.signupForm.valid).toBe(false);
  });


  it('form is invalid with bad email', () => {
    component.signupForm.setValue({name: 'John', nick: 'Doe', email: 'aaa', pass: '12345', pass2: '12345'});
    expect(component.signupForm.valid).toBe(false);
  });


});
