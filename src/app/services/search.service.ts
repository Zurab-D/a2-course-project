import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ResponseService } from './response.service';

@Injectable()
export class SearchService {

  private subjectSearch: Subject<string> = new Subject<string>();
  private clearSearchInput: Subject<boolean> = new Subject<boolean>();
  private fillSearchInput: Subject<string> = new Subject<string>();

  public searchValue: string = '';


  constructor(private responseService: ResponseService) {
  }


  search(value): void {
    this.searchValue = value;
    this.subjectSearch.next(value);
  }


  subscribeToSearch(callback) {
    this.subjectSearch.subscribe(callback);
  }


  clear(flag = true) {
    this.clearSearchInput.next(flag);
  }


  subscribeToClear(callback) {
    this.clearSearchInput.subscribe(callback);
  }


  fillInput(value: string) {
    this.fillSearchInput.next(value);
  }


  subscribeToFillInput(callback) {
    this.fillSearchInput.subscribe(callback);
  }
}
