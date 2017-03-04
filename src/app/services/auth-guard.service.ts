import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { LoginService } from './login.service';


@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

  private _initialUrl: string;


  constructor(private loginService: LoginService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.loginService
               .isAuthorised()
               .map(res => {
                  this.initialUrl = state.url;

                  if (res['authorised']) {
                    return true;
                  } else {
                    this.router.navigate(['/signin']);

                    return false;
                  };
                }).catch((err) => {
                  this.router.navigate(['/signin']);

                  return Observable.of(false);
                });
  }


  canLoad(route: Route): Observable<boolean> {
    return this.loginService
               .isAuthorised()
               .map(res => {
                  this.initialUrl = `/${route.path}`;

                  if (res['authorised']) {
                    return true;
                  } else {
                    this.router.navigate(['/signin']);

                    return false;
                  };
                }).catch((err) => {
                  this.router.navigate(['/signin']);

                  return Observable.of(false);
                });
  }


  set initialUrl(url: string) {
    this._initialUrl = url;
  }


  get initialUrl(): string {
    return this._initialUrl;
  }

}
