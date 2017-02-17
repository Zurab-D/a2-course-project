import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MailboxesService } from '../../../services/mailboxes.service';

@Injectable()
export class MailboxesResolve implements Resolve<any> {

  constructor(private mailboxesService: MailboxesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.mailboxesService.getAll();
  }
}
