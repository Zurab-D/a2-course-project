import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DeleteAllButtonService {

  btnDeleteAll$: Subject<boolean> = new Subject<boolean>();

  click() {
    this.btnDeleteAll$.next();
  }

  subscribe(callback) {
    return this.btnDeleteAll$.subscribe(callback);
  }

  unsubscribe() {
    this.btnDeleteAll$.unsubscribe();
  }

}
