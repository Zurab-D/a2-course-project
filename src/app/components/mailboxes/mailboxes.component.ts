import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IMailbox } from '../../interfaces/mailbox';
import { MailboxesService } from '../../services/mailboxes.service';

@Component({
  selector: 'app-mailboxes',
  templateUrl: './mailboxes.component.html',
  styleUrls: ['./mailboxes.component.css']
})
export class MailboxesComponent implements OnInit {
  mailboxes: IMailbox[];

  constructor(private mailboxesService: MailboxesService,
              private router: Router) {
  }

  ngOnInit() {
    this.mailboxesService
      .getAll()
      .subscribe(mailboxes => {
        this.mailboxes = mailboxes.sort((a, b) => a.title > b.title ? 1 : -1);
      });
  }

  clickCompose() {
    this.router.navigate(['mail', 'new']);
  }
}
