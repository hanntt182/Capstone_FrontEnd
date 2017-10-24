import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy-header',
  templateUrl: './buy-header.component.html',
  styleUrls: ['./buy-header.component.css']
})
export class BuyHeaderComponent implements OnInit {

  public user;
  constructor() { }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

}
