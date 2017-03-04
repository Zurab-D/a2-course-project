import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) {
  }


  ngOnInit() {
    this.signupForm = this.formBuilder.group({
        name: ['', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15)
        ]],
        nick: ['', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15)
        ]],
        email: ['', [
            Validators.required,
            // Validators.pattern("[^ @]*@[^ @]*")
            Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ]],
        pass: ['', [
            Validators.required,
            // Validators.minLength(3)
        ]],
        pass2: ['', [
            Validators.required,
            // Validators.minLength(3)
        ]],
    });
  }


  onSubmit() {
    if (this.signupForm.valid) {
      this.loginService
          .signup(this.signupForm.value)
          .subscribe(data => {
            this.router.navigate(['/signin']);
          });
    }
  }


  onKeydown(e, nextField) {
    if (e.keyCode === 13) { // press enter
      nextField.focus();
    }
  }
}
