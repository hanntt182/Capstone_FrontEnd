import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class SupRoleGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user.role != 'SUPPLIER') {
      alert('You must login with role SUPPLIER');
      this.router.navigate(['home']);
    }
    return true;
  }
}
