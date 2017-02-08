import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
    // return this.checkLogin(state.url);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.loginService.isAuthorised) {
        return true;
    }

    // check if user can redirect to this url
    // this.loginService.redirectUrl = url;

    this.router.navigate(['/login']);

    return false;
  }

}
