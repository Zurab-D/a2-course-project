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
    this.loginService.logout().subscribe(this.router.navigate(['/']));
  }

  ngOnInit() {
    this.receivedUserObj = this.loginService.user;
  }

}
