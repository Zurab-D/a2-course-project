import { /*ElementRef,*/ Component, OnInit, AfterViewInit } from '@angular/core';
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
  public fucusPassField: boolean = false;
  public loginForm: FormGroup;
  // public el: HTMLElement = this.elementRef.nativeElement.querySelector('input.pass') as HTMLElement;


  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private authGuardService: AuthGuardService/*,
              private elementRef: ElementRef*/) {
    this.authorised = false;
  }


  ngOnInit() {
    this.loginService
        .isAuthorised()
        .subscribe( res => {
            this.authorised = res['authorised'];
            /*this.loginService.user = res;
            console.log('this.loginService.user = ');
            console.log(this.loginService.user);*/
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
                    // this.loginService.user = res;
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
