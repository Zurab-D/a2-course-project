import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CheckboxLetterService } from '../services/checkbox-letter.service';
import { DeleteAllButtonService } from '../services/delete-all-button.service';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  allChecked: boolean = false;


  constructor(private router: Router,
              private checkboxLetterService: CheckboxLetterService,
              private deleteAllButtonService: DeleteAllButtonService,
              private loginService: LoginService) {
  }


  ngOnInit() {
    this.checkboxLetterService.examineAllChecked(flag => this.allChecked = flag);
  }


  deleteCheckedMail() {
    if (window.confirm('Are you sure?')) {
      this.deleteAllButtonService.click();
    }
  }


  checkAll(evt) {
    this.checkboxLetterService.click(evt.target.checked);
    this.allChecked = evt.target.checked;
  }


  clickLogout() {
    this.loginService.logout();
  }

}
