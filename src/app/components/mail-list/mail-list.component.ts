import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '../../services/search.service';
import { LettersService } from '../../services/letters.service';
import { ILetter } from '../../interfaces/letter';
import { CheckboxLetterService } from '../../services/checkbox-letter.service';
import { DeleteAllButtonService } from '../../services/delete-all-button.service';

import { MailboxesService } from '../../services/mailboxes.service';

import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent implements OnInit {
  private letters: ILetter[] = [];
  mailboxValue = '';
  searchValue = '';

  constructor(private lettersService: LettersService,
              private route: ActivatedRoute,
              private searchService: SearchService,
              private checkboxLetterService: CheckboxLetterService,
              private deleteAllButtonService: DeleteAllButtonService,
              private mailboxesService: MailboxesService) {
  }

  ngOnInit() {

    this.lettersService
        .getAll()
        .subscribe(data => {
          this.letters = data;
          this.letters.forEach(letter => letter._checked = false);
        });

    // get mailbox name from the router params
    this.route
        .params
        .subscribe(params => {
          this.mailboxValue = params['mailbox'];
          this.searchValue = '';
          this.uncheckAll();
          this.mailItemClicked();
        });

    // ------------------------------------------------------------
    this.searchService.subscribe(value => {
      this.searchValue = value;
      this.mailboxValue = '';
    });

    // ------------------------------------------------------------
    this.deleteAllButtonService.subscribe(() => {
      const deleting: ILetter[] = this.letters.filter(letter => letter._checked);

      this.lettersService
        .delete(deleting, letterDeleted => {
          const idx: number = this.letters.indexOf(letterDeleted);

          if (idx > -1) {
            this.letters.splice(idx, 1);
            const tmp = this.letters;
            this.letters = [];
            tmp.forEach(item => this.letters.push(item));
          };
        });
    });

    // ------------------------------------------------------------
    this.checkboxLetterService
        .subscribe(flag => {
          const mailbox = this.mailboxId;

          this.letters.forEach(letter => {
            if (letter.mailbox === mailbox) {
              letter._checked = flag;
            }
          });
        });

  }

  get mailboxId(): string {
    return this.mailboxesService.getMailboxId(this.mailboxValue);
  }


  uncheckAll() {
    this.letters.forEach(letter => letter._checked = false);
  }


  mailItemClicked() {
    this.checkboxLetterService
        .informAllChecked((() => {
          const filtered = this.letters.filter(letter => letter.mailbox === this.mailboxId);
          return filtered.length > 0 && filtered.every(letter => letter._checked);
        })()
        );
  }
}
