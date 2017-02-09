import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { AuthGuardService } from '../../services/auth-guard.service';


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
              private router: Router,
              private authGuardService: AuthGuardService)
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
          if (this.authGuardService.initialUrl && this.authGuardService.initialUrl.replace('/', '')) {
            this.router.navigate([this.authGuardService.initialUrl]);
          } else {
            this.router.navigate(['/mail/inbox']);
          }
        });
  }



}
