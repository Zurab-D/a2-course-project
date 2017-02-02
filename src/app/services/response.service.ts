import { Injectable } from '@angular/core';
import { IResponse } from '../interfaces/response';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResponseService implements IResponse {

  constructor() { }

  public extractData(res: Response): any {
    if (res !== undefined && typeof res.json !== undefined && res.json() !== undefined) {
      return res.json();
    }
    return res.toString();
  }

  public handleError (error: Response | any): any {
    let result: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      result = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      result = error.message ? error.message : error.toString();
    }
    if (Observable.throw) {
      return Observable.throw(result);
    }
  }
}
