import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { CheckboxLetterService } from '../services/checkbox-letter.service';
import { DeleteAllButtonService } from '../services/delete-all-button.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  allChecked: boolean = false;
  currentRouteIsMail: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private checkboxLetterService: CheckboxLetterService,
              private deleteAllButtonService: DeleteAllButtonService) {
  }


  ngOnInit() {
    this.checkboxLetterService.examineAllChecked(flag => this.allChecked = flag);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRouteIsMail = this.router.url.split('/').filter(item => item).indexOf('mail') > -1;
      }
    });
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

}
