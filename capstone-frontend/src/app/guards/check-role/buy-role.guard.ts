import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class BuyRoleGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user.role != 'BUYER') {
      alert('You must login with role BUYER');
      this.router.navigate(['home']);
    }
    return true;
  }
}
