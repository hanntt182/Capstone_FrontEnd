import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DealService} from "../../../services/deal.service";
import {Constants} from './../../../constants';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.css']
})
export class DealListComponent implements OnInit, OnDestroy {

  public user;
  public deals;
  public dealStatus;
  public now;
  public xInterval;
  public finishedDate = [];
  public lates = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private dealService: DealService,
              private constants: Constants) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.activatedRoute.params.subscribe((params: Params) => {
      this.dealStatus = params['dealStatus'];
      this.changePage('', 1);
      if (this.dealStatus == 'success' && this.user.role == 'BUYER') {
        this.xInterval = setInterval(() => {
          for (let i = 0; i < this.deals.length; i++) {
            this.lates.pop();
          }
          this.now = Date.now();
          for (let i = 0; i < this.deals.length; i++) {
            if (Date.parse(this.deals[i].dealHistoryID.deal.finishedDay) - this.now <= 0) {
              this.lates.push(true);
            } else if (Date.parse(this.deals[i].dealHistoryID.deal.finishedDay) - this.now > 0) {
              this.lates.push(false);
            }
          }
        }, 1000);
      }
    });


  }

  ngOnDestroy() {
    clearInterval(this.xInterval);
  }

  changeStatus(status) {
    if (this.user.role == 'BUYER') {
      this.router.navigate(['/buyer/deal-list/' + status]);
    } else if (this.user.role == 'SUPPLIER') {
      this.router.navigate(['/supplier/deal-list/' + status]);
    }
  }

  changePage(searchValue, pageNumber) {
    /*for (let i = 0; i < this.deals.length; i++) {
      this.finishedDate.pop();
    }*/
    if (this.user.role == 'SUPPLIER') {
      let data = {
        'SupplierID': this.user.userId,
        'SearchValue': searchValue,
        'Status': this.dealStatus,
        'pageNumber': pageNumber
      };
      this.dealService.searchDealSupplier(this.constants.SEARCHDEALSUPPLIER, data).subscribe((response: any) => {
        this.deals = response.content;
        for (let i = 0; i < this.deals.length; i++) {
          this.finishedDate.push(this.deals[i].finishedDay);
        }
        console.log(this.deals);
      }, error => {
        console.log(error);
      });
    } else if (this.user.role == 'BUYER') {
      let data = {
        'BuyerID': this.user.userId,
        'SearchValue': searchValue,
        'Status': this.dealStatus,
        'pageNumber': pageNumber
      };
      this.dealService.searchDealBuyer(this.constants.SEARCHDEALBUYER, data).subscribe((response: any) => {
        this.deals = response.content;
        for (let i = 0; i < this.deals.length; i++) {
          this.finishedDate.push(this.deals[i].dealHistoryID.deal.finishedDay);
        }
      });
    }

  }

  orderDeal(dealID) {
    this.router.navigate(['buyer/deal-order/' + dealID]);
  }

  viewDealDetail(dealID) {

  }

}
