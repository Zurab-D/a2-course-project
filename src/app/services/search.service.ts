import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ResponseService } from './response.service';

@Injectable()
export class SearchService {
  subjectSearch: Subject<string> = new Subject<string>();

  public searchValue: string = '';

  constructor(private responseService: ResponseService) {
  }

  search(value): void {
    this.searchValue = value;
    this.subjectSearch.next(value);
  }

  subscribe(callback) {
    this.subjectSearch.subscribe(callback);
  }

}
