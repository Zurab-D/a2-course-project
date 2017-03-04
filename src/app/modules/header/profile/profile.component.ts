import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  receivedUserObj = {};

  constructor(private loginService: LoginService, private router: Router) { }

  clickLogout() {
    this.loginService.logout();
    this.router.navigate(['/signin']);
  }

  ngOnInit() {
    this.receivedUserObj = this.loginService.user;
    // console.log(this.receivedUserObj);
    // console.log(`this.receivedUserObj.displayName = "${this.receivedUserObj.displayName}"`);
  }

}
