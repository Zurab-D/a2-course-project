import { MailComponent } from './components/mail/mail.component';
import { MailListComponent } from './components/mail-list/mail-list.component';
import { MailReadComponent } from './components/mail-read/mail-read.component';
import { UsersComponent } from './components/users/users.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LetterResolve } from './resolves/letter.resolve';


export const Routes = [
  { path: '',
    // redirectTo: 'mail/Inbox', pathMatch: 'full',
    redirectTo: 'mail', pathMatch: 'full',
  },

  { path: 'mail',
    redirectTo: 'mail/Inbox', pathMatch: 'full',
  },

  { path: 'mail',
    component: MailComponent,
      children: [
        {path: '', component: MailListComponent
        },

        {path: 'new', component: MailReadComponent
        },

        {path: ':mailbox', component: MailListComponent
        },

        {
          path: ':mailbox/:id', component: MailReadComponent,
          resolve: { letter: LetterResolve }
        },

      ]

  },

  { path: 'users',
    component: UsersComponent },

  { path: 'settings',
    component: SettingsComponent },

];
