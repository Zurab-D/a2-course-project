
import { AuthGuardService } from './services/auth-guard.service';


import { MainRoutes } from './modules/main/main.module';
import { MailRoutes } from './modules/mail/mail.module';
import { UserRoutes } from './modules/users/users.module';


export const Routes = [
  /*{ path: 'login', component: LoginComponent },

  { path: '', component: MainComponent,
    canLoad: [AuthGuardService],
    canActivate : [AuthGuardService],
    canActivateChild : [AuthGuardService],
    children: [
      { path: 'mail', children: [ ...MailRoutes ] },

      { path: 'users', children: [ ...UserRoutes ] },

      { path: 'settings', component: SettingsComponent, },
    ]
  },*/

  { path: '', children: [ ...MainRoutes ] },

  { path: 'mail', children: [ ...MailRoutes ] },

  { path: 'users', children: [ ...UserRoutes ] },

];
