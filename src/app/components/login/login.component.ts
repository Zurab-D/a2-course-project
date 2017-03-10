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

  public authorised = false;
  public invalidAttemptCount = 0;
  public fucusPassField = false;
  public loginForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private authGuardService: AuthGuardService) {
    this.authorised = false;
  }


  ngOnInit() {
    this.loginService
        .isAuthorised()
        .subscribe( res => {
            this.authorised = res['authorised'];
            if (this.authorised) {
              this.router.navigate(['']);
            }
        } );

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
          .signin(this.loginForm.value)
          .subscribe(data => {
            this.loginService
                .isAuthorised()
                .subscribe(
                  res => {
                    this.authorised = res['authorised'];
                    if (!this.authorised) { this.invalidAttemptCount++; }

                    if (this.authGuardService.initialUrl && this.authGuardService.initialUrl.replace('/', '')) {
                      this.router.navigate([this.authGuardService.initialUrl]);
                    } else {
                      this.router.navigate(['/mail/Inbox']);
                    }
                  },
                  err => this.invalidAttemptCount ++
                );
          });
    }
  }


  onInput() {
    this.invalidAttemptCount = 0;
  }


  onKeydown(e, nextField) {
    if (e.keyCode === 13) { // press enter
      nextField.focus();
    }
  }
}
