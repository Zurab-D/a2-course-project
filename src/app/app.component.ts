import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CheckboxLetterService } from './services/checkbox-letter.service';
import { DeleteAllButtonService } from './services/delete-all-button.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  allChecked: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private checkboxLetterService: CheckboxLetterService,
              private deleteAllButtonService: DeleteAllButtonService) {
  }

  ngOnInit() {
    this.checkboxLetterService.examineAllChecked(flag => this.allChecked = !!flag);
  }

  deleteCheckedMail() {
    if (window.confirm('Are you sure?')) {
      this.deleteAllButtonService.click();
    }
  }

  isAllChecked() {
    return this.allChecked;
  }

  checkAll(evt) {
    this.checkboxLetterService.click(evt.target.checked);
  }

}
