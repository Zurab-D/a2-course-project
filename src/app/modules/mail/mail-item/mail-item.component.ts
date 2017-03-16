import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ILetter } from '../../../interfaces/letter';
import { LettersService } from '../../../services/letters.service';
import { MailboxesService } from '../../../services/mailboxes.service';
import { CheckboxLetterService } from '../../../services/checkbox-letter.service';

@Component({
  selector: 'app-mail-item',
  templateUrl: './mail-item.component.html',
  styleUrls: ['./mail-item.component.css']
})
export class MailItemComponent {
  @Input() letter: ILetter;
  @Output() clicked: EventEmitter<any> = new EventEmitter();


  constructor(private lettersService: LettersService,
              private mailboxesService: MailboxesService,
              private checkboxLetterService: CheckboxLetterService) {
  }


  cbClick(letter: ILetter) {
    letter._checked = !letter._checked;
    this.clicked.emit();
  }


  letterClick() {
    this.lettersService.setCurrentLetter(this.letter);
    this.checkboxLetterService.click(false);
    this.checkboxLetterService.informAllChecked(false);
  }


  get letterLink(): string {
    const mailbox = this.mailboxesService.getMailboxTitle(this.letter.mailbox);
    return `/mail/${mailbox}/${this.letter._id}`;
  }
}
