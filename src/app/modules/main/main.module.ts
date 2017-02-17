import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// import { HeaderComponent } from '../header/header.component';
import { HeaderModule } from '../header/header.module';

import { MainComponent } from './main.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';

import { AuthGuardService } from '../../services/auth-guard.service';

export const MainRoutes = [

  { path: '', component: MainComponent,
    canLoad: [AuthGuardService],
    canActivate : [AuthGuardService],
    canActivateChild : [AuthGuardService],
    children: [
      { path: 'login', component: LoginComponent },

      { path: 'settings', component: SettingsComponent, },
    ]
  },
];


@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MainComponent,
    LoginComponent,
    SettingsComponent
  ]
})
export class MainModule { }
