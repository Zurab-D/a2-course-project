import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { MailComponent } from './mail.component';
import { MailListComponent } from './mail-list/mail-list.component';
import { MailItemComponent } from './mail-item/mail-item.component';
import { MailEditComponent } from './mail-edit/mail-edit.component';
import { MailboxesComponent } from './mailboxes/mailboxes.component';

import { FilterMailboxPipe } from './pipes/filter-mailbox.pipe';
import { FilterSearchPipe } from './pipes/filter-search.pipe';

import { LetterResolve } from './resolves/letter.resolve';
import { MailListResolve } from './resolves/mail-list.resolve';

import { MailboxesResolve } from './resolves/mailboxes.resolve';

import { TypedirectiveDirective } from './mail-edit/typedirective.directive';

import { AuthGuardService } from '../../services/auth-guard.service';
import { MailSearchComponent } from './mail-search/mail-search.component';


export const MailRoutes = [
  { path: '', component: MailComponent,
    canActivate : [AuthGuardService],
    resolve: { mailboxes: MailboxesResolve, mailList: MailListResolve },
      children: [
        { path: 'new', component: MailEditComponent },

        { path: 'search/:value', component: MailSearchComponent
        },

        { path: ':mailbox', component: MailListComponent,
          resolve: { mailList: MailListResolve },
        },

        { path: ':mailbox/:id', component: MailEditComponent,
          resolve: { letter: LetterResolve },
        },
      ]
  },
];

@NgModule({
  declarations: [
    MailComponent,
    MailListComponent,
    MailItemComponent,
    MailEditComponent,
    MailboxesComponent,
    FilterMailboxPipe,
    FilterSearchPipe,
    TypedirectiveDirective,
    MailSearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [ MailboxesResolve, MailListResolve, LetterResolve ]
})
export class MailModule { }
