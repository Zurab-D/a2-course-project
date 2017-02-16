import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { AuthGuardService } from '../../services/auth-guard.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  public authorised: boolean = false;

  public invalidAttemptCount: number = 0;

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private authGuardService: AuthGuardService) {
    this.authorised = this.loginService.isAuthorised;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      nick: ['', [
        Validators.required
        // Validators.pattern("[^ @]*@[^ @]*")  <<-- pattern for email
      ]],
      pass: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
    });
  }

  ngAfterViewInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService
          .login(this.loginForm.value.nick, this.loginForm.value.pass)
          .subscribe(res => {
            this.invalidAttemptCount ++;
            this.authorised = this.loginService.isAuthorised;
            if (this.authGuardService.initialUrl && this.authGuardService.initialUrl.replace('/', '')) {
              this.router.navigate([this.authGuardService.initialUrl]);
            } else {
              this.router.navigate(['/mail/Inbox']);
            }
          });
    }
  }


  onInput() {
    this.invalidAttemptCount = 0;
  }

}
