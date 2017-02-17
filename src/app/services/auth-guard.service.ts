import { Injectable } from '@angular/core';
import { CanActivate, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  private _initialUrl: string;

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    this.initialUrl = url;

    if (this.loginService.isAuthorised) {
        return true;
    }

    this.router.navigate(['/login']);

    return false;
  }

  set initialUrl(url: string) {
    this._initialUrl = url;
  }

  get initialUrl(): string {
    return this._initialUrl;
  }

}
