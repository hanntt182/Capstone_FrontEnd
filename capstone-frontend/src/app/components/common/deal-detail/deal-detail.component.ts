import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Constants} from './../../../constants';
import {DealService} from "../../../services/deal.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.css']
})
export class DealDetailComponent implements OnInit, OnDestroy {

  public user;
  public dealID;
  public deal;
  public checkDeal;
  public xInterval;
  public now;
  public distance;
  public closedDay;

  constructor(private activatedRoute: ActivatedRoute,
              private constants: Constants,
              private dealService: DealService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.activatedRoute.params.subscribe((params: Params) => {
      this.dealID = Number(params['dealId']);
      let data = {
        'DealID': Number(this.dealID)
      };
      this.dealService.viewDealDetail(this.constants.VIEWDEALDETAIL, data).subscribe((response: any) => {
        this.deal = response;
        this.closedDay = this.deal.closedDay;
        if (this.deal.status.statusName == 'ONGOING') {
          this.xInterval = setInterval(() => {
            this.now = Date.now();
            this.distance = Date.parse(this.closedDay) - this.now;

            let days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

            document.getElementById('discountTime').innerHTML = days + 'd ' + hours + 'h '
              + minutes + 'm ' + seconds + 's ';

            if (this.distance < 0) {
              clearInterval(this.xInterval);
              document.getElementById('discountTime').innerHTML = 'EXPRIED';
            }
          }, 1000);
        }
        if (this.deal.status.statusName != 'ONGOING') {
          clearInterval(this.xInterval);
        }
      });
    });
    if (this.user) {
      let data = {
        'BuyerID': this.user.userId,
        'DealID': this.dealID
      };
      this.dealService.checkDeal(this.constants.CHECKDEAL, data).subscribe((response: any) => {
        this.checkDeal = response;
      });
    }
  }

  ngOnDestroy() {
    clearInterval(this.xInterval);
  }

  joinDeal() {
    let data = {
      'DealID': this.dealID,
      'BuyerID': this.user.userId
    };
    this.dealService.joinDeal(this.constants.JOINDEAL, data).subscribe((response: any) => {
      this.toastr.success(response, 'Success!', {showCloseButton: true});
      this.checkDeal = true;
    }, error => {
      this.toastr.error(error._body, 'Error!', {showCloseButton: true});
      console.log(error);
    });

  }

}
