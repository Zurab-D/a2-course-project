import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  public authorised: boolean = false;

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router)
  {
    this.authorised = this.loginService.isAuthorised;

    this.loginForm = this.formBuilder.group({
      'nick': 'dummy',
      'pass': 'dummy'
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  onSubmit() {
    this.loginService
        .login(this.loginForm.value.nick, this.loginForm.value.pass)
        .subscribe(res => {
          this.authorised = this.loginService.isAuthorised;
          this.router.navigate(['']);
        });
  }



}
