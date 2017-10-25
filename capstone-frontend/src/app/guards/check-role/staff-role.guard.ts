import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class StaffRoleGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user.role != 'STAFF') {
      alert('You must login with role STAFF');
      this.router.navigate(['home']);
    }
    return true;
  }
}
