import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-staff-header',
  templateUrl: './staff-header.component.html',
  styleUrls: ['./staff-header.component.css']
})
export class StaffHeaderComponent implements OnInit {

  public user;

  constructor() {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

}
