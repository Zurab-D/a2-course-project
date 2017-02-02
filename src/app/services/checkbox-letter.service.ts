import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CheckboxLetterService {

  checkAllLetters$: Subject<boolean> = new Subject<boolean>();
  allLettersChecked$: Subject<boolean> = new Subject<boolean>();

  click(flag: boolean) {
    this.checkAllLetters$.next(flag);
  }

  subscribe(callback) {
    this.checkAllLetters$.subscribe(callback);
  }


  informAllChecked(flag: boolean) {
    this.allLettersChecked$.next(flag);
  }

  examineAllChecked(callback) {
    this.allLettersChecked$.subscribe(callback);
  }
}
