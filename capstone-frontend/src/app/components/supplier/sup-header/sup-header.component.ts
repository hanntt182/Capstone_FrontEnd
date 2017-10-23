import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sup-header',
  templateUrl: './sup-header.component.html',
  styleUrls: ['./sup-header.component.css']
})
export class SupHeaderComponent implements OnInit {

  public user;

  constructor() {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

}
