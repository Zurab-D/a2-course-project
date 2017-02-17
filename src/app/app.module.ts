import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ResponseService } from './services/response.service';
import { LettersService } from './services/letters.service';
import { MailboxesService } from './services/mailboxes.service';
import { UsersService } from './services/users.service';
import { SearchService } from './services/search.service';
import { CheckboxLetterService } from './services/checkbox-letter.service';
import { DeleteAllButtonService } from './services/delete-all-button.service';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginService } from './services/login.service';

import { TypeaheadService } from './services/typeahead.service';

import { MainComponent } from './components/main.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';

// import { MainModule } from './modules/main/main.module';
import { UsersModule } from './modules/users/users.module';
import { MailModule } from './modules/mail/mail.module';
import { HeaderModule } from './modules/header/header.module';

import { Routes } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SettingsComponent,
  ],
  imports: [
    // MainModule,
    MailModule,
    UsersModule,
    HeaderModule,

    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(Routes, {useHash: true})
  ],
  providers: [
    LettersService, SearchService, ResponseService, UsersService, CheckboxLetterService,
    DeleteAllButtonService, MailboxesService, TypeaheadService, LoginService, AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
