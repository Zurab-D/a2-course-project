import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { CONFIG } from '../config';


declare var require: any;

@Injectable()
export class TypeaheadService {

  constructor(private http: Http) { }

  getDataFiltered(filterByText: string) {
    return this.http
      .get(CONFIG.urls.users)
      .map(resp => {
        return resp.json()
                   .map(obj => obj[CONFIG.userMailField])
                   .filter(item => item.indexOf(filterByText) >= 0);
      });
  }

}
