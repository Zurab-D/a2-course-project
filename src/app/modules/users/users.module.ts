import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';

import { UsersComponent } from './users.component';
import { UsersListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserResolve } from './user-edit/user.resolve';

import { AuthGuardService } from '../../services/auth-guard.service';


export const UserRoutes = [
  { path: '', component: UsersComponent,
    canLoad: [AuthGuardService],
    canActivate : [AuthGuardService],
    canActivateChild : [AuthGuardService],
      children: [
        { path: '', component: UsersListComponent },

        { path: 'new', component: UserEditComponent, },

        { path: ':id', component: UserEditComponent,
          resolve: { user: UserResolve }, },
      ]
  },
];

@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MyDatePickerModule
  ],
  providers: [ UserResolve ]
})
export class UsersModule { }
