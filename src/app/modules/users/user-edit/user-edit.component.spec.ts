/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteStub} from '../../../../testing';
import { Router, RouterStub } from '../../../../testing';
import { HttpModule } from '@angular/http';

import { MyDatePickerModule } from 'mydatepicker';
import { IMyDateModel, IMyOptions } from 'mydatepicker';
import { UserEditComponent } from './user-edit.component';
import { UsersService } from '../../../services/users.service';
import { User, IUser } from '../../../interfaces/user';
import { ResponseService } from '../../../services/response.service';


let spy: jasmine.Spy;
let usersService: UsersService;
const mockUser: IUser = new User(null, 'Anna', 'anna@mail.com');


describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MyDatePickerModule, HttpModule ],
      declarations: [ UserEditComponent ],
      providers: [
        UsersService,
        ResponseService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;

    usersService = fixture.debugElement.injector.get(UsersService);
    spy = spyOn(usersService, 'getById').and.returnValue(Observable.of(mockUser));

    route = fixture.debugElement.injector.get(ActivatedRoute);
    route.testData = {};

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve data', () => {
    route.testData = {user: mockUser};
    component.ngOnInit();
    expect(component.user).toBe(mockUser);
  });

  it('should call UsersService', () => {
    // Здесь изображаем что была передана прямая ссылка с неким :id.
    // Данные должны подхватиться посредством getById()
    route.params = Observable.of({id: 123});
    component.ngOnInit();
    expect(spy.calls.first().returnValue.value).toBe(mockUser);
  });


  // Здесь бы еще проверить Submit() ... А КАК?

});
