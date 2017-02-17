import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';

import { ResponseService } from './response.service';
import { MailboxesService } from '../services/mailboxes.service';
import { UsersService } from '../services/users.service';
import { ILetter } from '../interfaces/letter';
import { IMailbox } from '../interfaces/mailbox';
import { CONFIG } from '../config';
import { lettersData } from '../data/letters.data';


@Injectable()
export class LettersService {

  currentLetter: ILetter;

  private _flagRefresh: boolean = false;


  constructor(private http: Http,
              private responseService: ResponseService,
              private mailboxesService: MailboxesService,
              private usersService: UsersService) {
  }


  getAll(): Observable<ILetter[]> {
    return this.http
      .get(CONFIG.urls.letters)
      .map(this.responseService.extractData)
      .first()
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
        letter.mailbox = mailbox._id;
        letters.push(letter);
      }
    }
  }


  createLettersBunch() {
    const letters: Array<ILetter> = [];

    this.mailboxesService
        .getAll()
        .flatMap(mailboxes => Observable.of((function(self) {
            for (let i = 0; i < mailboxes.length; i++) {
              self.prepareLetters4Mailbox(letters, mailboxes[i]);
            }
            const data = { letters: letters };
            return data;
        })(this)))
        .flatMap(data => this.http.post(CONFIG.urls.root, data)
            .map(this.responseService.extractData)
            .catch(this.responseService.handleError)
        )
        .subscribe(null, null, () => window.alert('Letters generated succesfully'));
  }

  delete(arr: ILetter[], callback) {
    arr.forEach(letter => {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers });

      const url = `${CONFIG.urls.letters}/${letter._id}`;
      return this.http.delete(url, options)
                      .map(this.responseService.extractData)
                      .catch(err => this.responseService.handleError(err))
                      .subscribe(callback(letter));
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

    const res: Observable<ILetter> = this.http
               .post(CONFIG.urls.root, data)
               .map(this.responseService.extractData)
               .catch(this.responseService.handleError);

    this.usersService.saveEmailIfNotExists(letter.to);

    return res;
  }


  set flagRefresh(flag) {
    this._flagRefresh = flag;
  }


  get flagRefresh(): boolean {
    const flag: boolean = this._flagRefresh;
    this._flagRefresh = false;
    return flag;
  }

}
