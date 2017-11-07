import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class CreateTenderGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user.checked == false) {
      alert('Please update Company Profile!');
      this.router.navigate(['/buyer/update-info']);
    }
    return true;
  }
}
