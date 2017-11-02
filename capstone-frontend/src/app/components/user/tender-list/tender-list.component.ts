import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tender-list',
  templateUrl: './tender-list.component.html',
  styleUrls: ['./tender-list.component.css']
})
export class TenderListComponent implements OnInit {

  public countDownDate: number;
  public now: number;
  public distance: number;


  /*public x = setInterval(function () {
    this.countDownDate = new Date('Dec 1, 2017').getTime();
    this.now = new Date().getTime();
    this.distance = this.countDownDate - this.now;

    var days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

    // Output the result in an element with id='demo'
    document.getElementById('demo').innerHTML = days + 'd ' + hours + 'h '
      + minutes + 'm ' + seconds + 's ';

    if (this.distance < 0) {
      clearInterval(this.x);
      document.getElementById('demo').innerHTML = 'EXPIRED';
    }
  }, 1000);*/

  constructor() {
  }

  ngOnInit() {


  }

}
