import {Component, OnDestroy, OnInit} from '@angular/core';
import {Constants} from './../../../constants';
import {DealService} from '../../../services/deal.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-deal-list-home',
  templateUrl: './deal-list-home.component.html',
  styleUrls: ['./deal-list-home.component.css']
})
export class DealListHomeComponent implements OnInit, OnDestroy {

  public deals;
  public xInterval;
  public now;
  public closedDay = [];
  public distance = [];
  public days = [];
  public hours = [];
  public minutes = [];
  public seconds = [];

  constructor(private constants: Constants,
              private dealService: DealService,
              private router: Router) {
  }

  ngOnInit() {
    let data = {
      'SearchValue': '',
      'pageNumber': 1
    };
    this.dealService.searchDeal(this.constants.SEARCHDEAL, data).subscribe((response: any) => {

      this.deals = response.content;

      for (let i = 0; i < this.deals.length; i++) {
        this.closedDay.push(this.deals[i].closedDay);
      }

      this.xInterval = setInterval(() => {
        for (let i = 0; i < this.deals.length; i++) {
          this.distance.pop();
          this.days.pop();
          this.hours.pop();
          this.minutes.pop();
          this.seconds.pop();
        }
        this.now = Date.now();
        for (let i = 0; i < this.deals.length; i++) {
          this.distance.push(Date.parse(this.closedDay[i]) - this.now);
          this.days.push(Math.floor(this.distance[i] / (1000 * 60 * 60 * 24)));
          this.hours.push(Math.floor((this.distance[i] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
          this.minutes.push(Math.floor((this.distance[i] % (1000 * 60 * 60)) / (1000 * 60)));
          this.seconds.push(Math.floor((this.distance[i] % (1000 * 60)) / 1000));
          document.getElementById([i].toString()).innerHTML = this.days[i] + 'd ' + this.hours[i] + 'h '
            + this.minutes[i] + 'm ' + this.seconds[i] + 's ';
        }
      }, 1000);
    }, error => {
      console.log(error);
    });
  }

  viewDealDetail(dealID) {
    this.router.navigate(['/groupbuying-detail/' + dealID]);
  }

  ngOnDestroy() {
    clearInterval(this.xInterval);
  }

}
