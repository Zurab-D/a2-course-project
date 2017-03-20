import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MailSearchComponent } from './mail-search.component';
import { MailListComponent } from '../mail-list/mail-list.component';

import { SearchService } from '../../../services/search.service';
import { LettersService } from '../../../services/letters.service';
import { ResponseService } from '../../../services/response.service';
import { MailboxesService } from '../../../services/mailboxes.service';
import { UsersService } from '../../../services/users.service';
import { CheckboxLetterService } from '../../../services/checkbox-letter.service';
import { DeleteAllButtonService } from '../../../services/delete-all-button.service';

import { FilterSearchPipe } from '../pipes/filter-search.pipe';
import { FilterMailboxPipe } from '../pipes/filter-mailbox.pipe';


import { ActivatedRoute, ActivatedRouteStub } from '../../../../testing';

describe('MailSearchComponent', () => {
  let component: MailSearchComponent;
  let fixture: ComponentFixture<MailSearchComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParams = { value: '/' };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [
        MailSearchComponent,
        MailListComponent,
        FilterSearchPipe,
        FilterMailboxPipe,
      ],
      providers: [
        SearchService, LettersService, ResponseService, MailboxesService, UsersService, CheckboxLetterService, DeleteAllButtonService,
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
