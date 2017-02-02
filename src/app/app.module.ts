import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MailComponent } from './components/mail/mail.component';
import { MailListComponent } from './components/mail-list/mail-list.component';
import { MailItemComponent } from './components/mail-item/mail-item.component';
import { MailReadComponent } from './components/mail-read/mail-read.component';
import { MailboxesComponent } from './components/mailboxes/mailboxes.component';

import { UsersComponent } from './components/users/users.component';
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

import { LetterResolve } from './resolves/letter.resolve';
import { Routes } from './app.routes';

// import { SearchResolve } from './routes/search.resolve';

@NgModule({
  declarations: [
    AppComponent,
    MailListComponent,
    MailItemComponent,
    MailReadComponent,
    MailboxesComponent,
    FilterMailboxPipe,
    UsersComponent,
    MailComponent,
    SettingsComponent,
    SearchComponent,
    ProfileComponent,
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    FilterSearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes, {useHash: true})
  ],
  providers: [
    LettersService, SearchService, MailboxesService, ResponseService, UsersService, CheckboxLetterService,
    DeleteAllButtonService, LetterResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
