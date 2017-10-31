import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class CreateOrderGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if ((!user) || (user.role != 'BUYER')) {
      alert('Only user with role BUYER can create order');
      this.router.navigate(['/']);
    }
    return true;
  }
}
