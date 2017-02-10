import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ResponseService } from './response.service';
import { IMailbox } from '../interfaces/mailbox';
import { CONFIG } from '../config';
import { mailboxesData } from '../data/mailboxes.data';

@Injectable()
export class MailboxesService {
  mailboxes: IMailbox[] = [];

  constructor(private http: Http, private responseService: ResponseService) {
  }


  getAll(par?): Observable<IMailbox[]> {
    return this.http
      .get(CONFIG.urls.mailboxes)
      .map(data => {
        this.mailboxes = this.responseService.extractData(data);
        return this.mailboxes;
      })
      .catch(this.responseService.handleError)
    ;
  }


  getMailboxId(mailbox) {
    if (mailbox) {
      mailbox = mailbox.toLowerCase();
      for (let i = 0; i < this.mailboxes.length; i++) {
        if (this.mailboxes[i].title.toLowerCase() === mailbox) {
          return this.mailboxes[i]._id;
        }
      }
    }
    return undefined;
  }


  createMailboxesBunch() {
    const mailboxes: Array<IMailbox> = [];

    for (let j = 0; j < mailboxesData.length; j++) {
      const mailbox: IMailbox = {
        _id: undefined,
        title: mailboxesData[j].title
      };
      mailboxes.push(mailbox);
    }

    const data = { mailboxes: mailboxes };

    return this.http
      .post(CONFIG.urls.root, data )
      .map(this.responseService.extractData)
      .catch(this.responseService.handleError)
    ;
  }


  deleteAllMailboxes() {
    return this.http
        .delete(CONFIG.urls.mailboxes)
        .map(x => x)
        .catch(this.responseService.handleError);
  }

}
