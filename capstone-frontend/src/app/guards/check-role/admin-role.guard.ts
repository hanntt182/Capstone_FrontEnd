import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user.role != 'ADMIN') {
      alert('You must login with role ADMIN');
      this.router.navigate(['home']);
    }
    return true;
  }
}
