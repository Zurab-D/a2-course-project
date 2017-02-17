import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IMailbox } from '../../../interfaces/mailbox';

@Component({
  selector: 'app-mailboxes',
  templateUrl: './mailboxes.component.html',
  styleUrls: ['./mailboxes.component.css']
})
export class MailboxesComponent implements OnInit {
  mailboxes: IMailbox[];

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.mailboxes = this.route.snapshot.data['mailboxes']
                                        .sort((a, b) => a.title > b.title ? 1 : -1);
  }

  clickCompose() {
    this.router.navigate(['mail', 'new']);
  }
}
