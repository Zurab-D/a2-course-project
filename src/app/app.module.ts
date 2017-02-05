import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MailComponent } from './components/mail/mail.component';
import { MailListComponent } from './components/mail-list/mail-list.component';
import { MailItemComponent } from './components/mail-item/mail-item.component';
import { MailEditComponent } from './components/mail-edit/mail-edit.component';
import { MailboxesComponent } from './components/mailboxes/mailboxes.component';

import { UsersListComponent } from './components/user-list/user-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { SearchComponent } from './components/header/search/search.component';
import { ProfileComponent } from './components/header/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';

import { ResponseService } from './services/response.service';
import { LettersService } from './services/letters.service';
import { MailboxesService } from './services/mailboxes.service';
import { UsersService } from './services/users.service';
import { SearchService } from './services/search.service';
import { CheckboxLetterService } from './services/checkbox-letter.service';
import { DeleteAllButtonService } from './services/delete-all-button.service';

import { FilterMailboxPipe } from './pipes/filter-mailbox.pipe';
import { FilterSearchPipe } from './pipes/filter-search.pipe';

import { Routes } from './app.routes';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { LetterResolve } from './resolves/letter.resolve';
import { UserResolve } from './resolves/user.resolve';


@NgModule({
  declarations: [
    AppComponent,
    MailListComponent,
    MailItemComponent,
    MailEditComponent,
    MailboxesComponent,
    FilterMailboxPipe,
    UsersListComponent,
    MailComponent,
    SettingsComponent,
    SearchComponent,
    ProfileComponent,
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    FilterSearchPipe,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(Routes, {useHash: true})
  ],
  providers: [
    LettersService, SearchService, MailboxesService, ResponseService, UsersService, CheckboxLetterService,
    DeleteAllButtonService, LetterResolve, UserResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
