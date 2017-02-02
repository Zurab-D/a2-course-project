import { Response } from '@angular/http';

export interface IResponse {
  extractData(res: Response): any;
  handleError(error: Response | any): any;
}
