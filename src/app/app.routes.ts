import { MainComponent } from './components/main.component';
import { LoginComponent } from './components/login/login.component';

import { MailComponent } from './components/mail/mail.component';
import { MailListComponent } from './components/mail/mail-list/mail-list.component';
import { MailEditComponent } from './components/mail/mail-edit/mail-edit.component';

import { UsersComponent } from     './components/users/users.component';
import { UsersListComponent } from './components/users/user-list/user-list.component';
import { UserEditComponent } from  './components/users/user-edit/user-edit.component';

import { SettingsComponent } from './components/settings/settings.component';
import { LetterResolve } from './resolves/letter.resolve';
import { UserResolve } from './resolves/user.resolve';

import { AuthGuardService } from './services/auth-guard.service';


export const Routes = [
  /*{ path: '',
    // redirectTo: 'mail/Inbox', pathMatch: 'full',
    redirectTo: 'mail', pathMatch: 'full',
    // redirectTo: 'login', pathMatch: 'full'
  },*/

  { path: 'login', component: LoginComponent },

  { path: '', component: MainComponent,
    canLoad: [AuthGuardService],
    canActivate : [AuthGuardService],
    canActivateChild : [AuthGuardService],
    children: [
      { path: 'mail', component: MailComponent,
          children: [
            { path: 'new', component: MailEditComponent },

            { path: ':mailbox', component: MailListComponent },

            { path: ':mailbox/:id', component: MailEditComponent,
              resolve: { letter: LetterResolve }
            },
          ]
      },

      { path: 'users', component: UsersComponent,
          children: [
            { path: '', component: UsersListComponent },

            { path: 'new', component: UserEditComponent, },

            { path: ':id', component: UserEditComponent,
              resolve: { user: UserResolve }, },
          ]
      },

      { path: 'settings', component: SettingsComponent, },
    ]
  },
];
