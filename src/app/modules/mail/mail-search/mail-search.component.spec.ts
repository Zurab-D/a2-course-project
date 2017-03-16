import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSearchComponent } from './mail-search.component';

describe('MailSearchComponent', () => {
  let component: MailSearchComponent;
  let fixture: ComponentFixture<MailSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailSearchComponent ]
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
