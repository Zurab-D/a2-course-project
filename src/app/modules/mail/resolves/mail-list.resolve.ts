import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { LettersService } from '../../../services/letters.service';

@Injectable()
export class MailListResolve implements Resolve<any> {

  constructor(private lettersService: LettersService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.lettersService.getAll();
  }
}
