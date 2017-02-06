import { MailComponent } from './components/mail/mail.component';
import { MailListComponent } from './components/mail-list/mail-list.component';
import { MailEditComponent } from './components/mail-edit/mail-edit.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersListComponent } from './components/user-list/user-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LetterResolve } from './resolves/letter.resolve';
import { UserResolve } from './resolves/user.resolve';


export const Routes = [
  { path: '',
    // redirectTo: 'mail/Inbox', pathMatch: 'full',
    redirectTo: 'mail', pathMatch: 'full',
  },

  { path: 'mail',
    redirectTo: 'mail/Inbox', pathMatch: 'full',
  },

  { path: 'mail', component: MailComponent,
      children: [
        { path: '', component: MailListComponent },

        { path: 'new', component: MailEditComponent },

        { path: ':mailbox', component: MailListComponent },

        { path: ':mailbox/:id', component: MailEditComponent,
          resolve: { letter: LetterResolve }
        },

      ]
  },

  { path: 'users', component: UsersListComponent },

  { path: 'users/new', component: UserEditComponent },

  { path: 'users/:id', component: UserEditComponent,
    resolve: { user: UserResolve }
  },

  { path: 'settings', component: SettingsComponent },

];
