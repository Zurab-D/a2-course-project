import { Component, OnInit } from '@angular/core';

import { LettersService } from '../../../services/letters.service';
import { MailboxesService } from '../../../services/mailboxes.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private lettersService: LettersService,
              private mailboxesService: MailboxesService,
              private usersService: UsersService) {
  }


  ngOnInit() {
  }


  genLetters() {
    this.lettersService.createLettersBunch();
  }


  delAllLetters() {
    if (window.confirm('Delete all letters?')) {
      this.lettersService
        .deleteLettersBunch()
        .subscribe(
          null,
          (e) => { window.alert('Error on letters deleting: ' + e.toString()); },
          () => { window.alert('Letters deleted succesfully'); }
        );
    }
  }


  genMailboxes() {
    this.mailboxesService.createMailboxesBunch().subscribe(
      null,
      null,
      () => { window.alert('Mailboxes created succesfully'); }
    );
  }
  delAllMailboxes() {
    if (window.confirm('Delete all mailboxes?')) {
      this.mailboxesService
        .deleteAllMailboxes()
        .subscribe(
          null,
          (e) => { window.alert('Error on mailboxes deleting: ' + e.toString()); },
          () => { window.alert('Mailboxes deleted succesfully'); }
        );
    }
  }


  genUsers() {
    this.usersService.createUsersBunch().subscribe(
      null,
      null,
      () => { window.alert('Users created succesfully'); }
    );
  }
  delAllUsers() {
    if (window.confirm('Delete all users?')) {
      this.usersService
        .deleteAllUsers()
        .subscribe(
          null,
          (e) => { window.alert('Error on users deleting: ' + e.toString()); },
          () => { window.alert('Users deleted succesfully'); }
        );
    }
  }

}
