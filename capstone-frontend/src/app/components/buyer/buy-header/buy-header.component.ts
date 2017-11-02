import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-buy-header',
  templateUrl: './buy-header.component.html',
  styleUrls: ['./buy-header.component.css']
})
export class BuyHeaderComponent implements OnInit {

  public user;
  public negoID = 1;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  gotoNegoDetail(status) {
    this.router.navigate(['/buyer/negotiation/' + status + this.negoID]);
  }

}
