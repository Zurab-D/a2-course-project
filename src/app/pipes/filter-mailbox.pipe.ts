import { Pipe, PipeTransform } from '@angular/core';

import { ILetter } from '../interfaces/letter';
import { MailboxesService } from '../services/mailboxes.service';


@Pipe({
  name: 'filterMailbox'
})
export class FilterMailboxPipe implements PipeTransform {

  constructor (private mailboxesService: MailboxesService) { }

  transform(letters: ILetter[], mailboxValue: string): any {
    const mailboxId: string = this.mailboxesService.getMailboxId(mailboxValue);

    if (letters && mailboxId) {
      return letters.filter((letter: ILetter) => letter.mailbox === mailboxId);
    }
  }

}
