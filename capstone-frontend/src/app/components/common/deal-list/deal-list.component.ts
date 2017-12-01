import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DealService} from "../../../services/deal.service";
import {Constants} from './../../../constants';
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.css']
})
export class DealListComponent implements OnInit, OnDestroy {

  public user;
  public deals;
  public dealStatus;
  public lates = [];
  public late;
  public buyDealStatusTabs = ['ongoing', 'expried', 'success'];
  public supDealStatusTabs = ['ongoing', 'expried', 'success', 'finished'];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private dealService: DealService,
              private constants: Constants,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
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

  ngOnDestroy() {
    //clearInterval(this.xInterval);
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

  orderDeal(dealID) {
    let data = {
      'UserID': this.user.userId,
      'DealID': dealID
    };
    this.dealService.checkDealLate(this.constants.CHECKDEALLATE, data).subscribe((response: any) => {
      this.router.navigate(['buyer/deal-order/' + dealID]);
    }, error => {
      console.log(error);
      this.toastr.error(error._body, 'Fail!', {showCloseButton: true});
    });

  }

  viewDealDetail(dealID) {
    if (this.user.role == 'BUYER') {
      this.router.navigate(['buyer/groupbuying-detail/' + dealID]);
    } else if (this.user.role == 'SUPPLIER') {
      this.router.navigate(['supplier/groupbuying-detail/' + dealID]);
    }

  }

}
