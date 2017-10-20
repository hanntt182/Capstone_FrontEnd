import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {CommonService} from '../services/common.service';

@Injectable()
export class CheckLoginGuard implements CanActivate {
  constructor(private loginService: LoginService,
              private commonService: CommonService,
              private router: Router) {
  }

  canActivate() {
    const status = this.loginService.checkLogged();
    if (!status) {
      this.commonService.showLoginForm();
      this.router.navigate(['home']);
    }
    return status;
  }
}
