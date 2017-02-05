import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ResponseService } from './response.service';
import { MailboxesService } from '../services/mailboxes.service';
import { ILetter } from '../interfaces/letter';
import { IMailbox } from '../interfaces/mailbox';
import { CONFIG } from '../config';
import { lettersData } from '../data/letters.data';

@Injectable()
export class LettersService {

  currentLetter: ILetter;


  constructor(private http: Http,
              private responseService: ResponseService,
              private mailboxesService: MailboxesService) {
  }


  getAll(): Observable<ILetter[]> {
    return this.http
      .get(CONFIG.urls.letters)
      .map(this.responseService.extractData)
      .catch(this.responseService.handleError)
    ;
  }


  getById(id: string): Observable<ILetter> {
    return this.http
      .get(`${CONFIG.urls.letters}/${id}`)
      .map(this.responseService.extractData)
      .catch(this.responseService.handleError)
    ;
  }


  getFiltered(): Observable<ILetter[]> {
    return this.http
      .get(CONFIG.urls.letters)
      .map(this.responseService.extractData)
      .catch(this.responseService.handleError)
    ;
  }


  deleteLettersBunch(): Observable<any> {
    return this.http
      .delete(CONFIG.urls.letters)
      .map(x => x)
      .catch(this.responseService.handleError);
  }


  private prepareLetters4Mailbox(letters: Array<ILetter>, mailbox: IMailbox): void {
    for (let i = 0; i < lettersData.length; i++) {
      if (lettersData[i].mailbox.toLowerCase() === mailbox.title.toLowerCase()) {
        const letter: ILetter = {
          _id: undefined,
          mailbox: lettersData[i].mailbox,
          subject: lettersData[i].subject,
          to: lettersData[i].to,
          body: lettersData[i].body,
          _checked: undefined
        };
        letter.mailbox = mailbox._id; //'587c82e49de15a250410f253';
        letters.push(letter);
      }
    }
  }


  createLettersBunch() {
    const letters: Array<ILetter> = [];

    this.mailboxesService.getAll().subscribe((mailboxes: IMailbox[]) => {
      for (let i = 0; i < mailboxes.length; i++) {
        this.prepareLetters4Mailbox(letters, mailboxes[i]);
      }

      const data = { letters: letters };
      this.http.post(CONFIG.urls.root, data )
               .map(this.responseService.extractData)
               .catch(this.responseService.handleError)
               .subscribe(null, null, () => window.alert('Letters generated succesfully'))
      ;
    });
  }


  delete(arr: ILetter[], callback) {
    arr.forEach(letter => {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers });

      const url = `${CONFIG.urls.letters}/${letter._id}`;
      return this.http.delete(url, options)
                      .map(this.responseService.extractData)
                      .catch(err => {
                        console.log('LettersService :: delete - 1');
                        const zzz = this.responseService.handleError(err);
                        console.log('LettersService :: delete - 2');
                        return zzz;
                      })
                      .subscribe(callback(letter))
      ;
    });
  }


  setCurrentLetter(letter: ILetter) {
    this.currentLetter = letter;
  }


  getCurrentLetter(): ILetter {
    return this.currentLetter;
  }


  saveLetter(letter: ILetter) {
    const letters: Array<ILetter> = [];

    letter.mailbox = this.mailboxesService.getMailboxId('sent');
    letters.push(letter);

    const data = { letters: letters };

    return this.http
               .post(CONFIG.urls.root, data)
               .map(this.responseService.extractData)
               .catch(this.responseService.handleError)
    ;
  }

}
