import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DealService} from "../../../services/deal.service";
import {Constants} from './../../../constants';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.css']
})
export class DealListComponent implements OnInit {

  public user;
  public deals;
  public dealStatus;
  public now;

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
    });
  }

  changeStatus(status) {
    if (this.user.role == 'BUYER') {
      this.router.navigate(['/buyer/deal-list/' + status]);
    } else if (this.user.role == 'SUPPLIER') {
      this.router.navigate(['/supplier/deal-list/' + status]);
    }
  }

  changePage(searchValue, pageNumber) {
    if (this.user.role == 'SUPPLIER') {
      let data = {
        'SupplierID': this.user.userId,
        'SearchValue': searchValue,
        'Status': this.dealStatus,
        'pageNumber': pageNumber
      };
      this.dealService.searchDealSupplier(this.constants.SEARCHDEALSUPPLIER, data).subscribe((response: any) => {
        this.deals = response.content;
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
      });
    }

  }

  viewDealDetail(dealID){

  }

}
