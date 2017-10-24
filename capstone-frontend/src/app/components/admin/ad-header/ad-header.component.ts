import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-header',
  templateUrl: './ad-header.component.html',
  styleUrls: ['./ad-header.component.css']
})
export class AdHeaderComponent implements OnInit {

  public user;
  constructor() { }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

}
