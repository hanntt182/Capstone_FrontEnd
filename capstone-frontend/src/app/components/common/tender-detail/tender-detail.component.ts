import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TenderService} from "../../../services/tender.service";
import {Constants} from './../../../constants';
import {now} from "moment";

@Component({
  selector: 'app-tender-detail',
  templateUrl: './tender-detail.component.html',
  styleUrls: ['./tender-detail.component.css']
})
export class TenderDetailComponent implements OnInit, OnDestroy {

  public tenderID;
  public tender;
  public starsCount: number = 3.456789;
  public now;
  public closedDay;
  public distance;
  public xInterval;
  public user;
  public buyerRateStar;
  public star1 = 1;
  public star2 = 2;
  public star3 = 3;
  public star4 = 4;
  public star5 = 5;
  public total;
  public rateBuyer;
  public tenderHistories;
  public winBidder;

  constructor(private activatedRoute: ActivatedRoute,
              private tenderService: TenderService,
              private constants: Constants,
              private router: Router) {

  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.activatedRoute.params.subscribe((params: Params) => {
      this.tenderID = params['tenderId'];
      let data = {
        'TenderID': this.tenderID
      };
      this.tenderService.viewTenderDetail(this.constants.VIEWTENDERDETAIL, data).subscribe((response: any) => {
        this.closedDay = response.closedDay;
        if (response.status.statusName == 'ACTIVE') {
          this.xInterval = setInterval(() => {
            this.now = Date.now();
            this.distance = Date.parse(this.closedDay) - this.now;

            let days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

            // Output the result in an element with id='demo'
            if (document.getElementById('countdown') != null) {
              document.getElementById('countdown').innerHTML = days + 'd ' + hours + 'h '
                + minutes + 'm ' + seconds + 's ';
            }
            if (document.getElementById('countdownSup') != null) {
              document.getElementById('countdownSup').innerHTML = days + 'd ' + hours + 'h '
                + minutes + 'm ' + seconds + 's ';
            }
            if (this.distance < 0) {
              clearInterval(this.xInterval);
              document.getElementById('countdown').innerHTML = 'FINISHED';
            }
          }, 1000);
        }
        if (response.status.statusName != 'ACTIVE') {
          clearInterval(this.xInterval);
        }
        this.tender = response;
        this.starsCount = response.buyer.rate;
        this.buyerRateStar = response.buyer.rate;
        this.total = response.buyer.star1 + response.buyer.star2 + response.buyer.star3 + response.buyer.star4 + response.buyer.star5;
      }, error => {
        console.log(error);
      });
      this.tenderService.getListSupplierJoinTender(this.constants.GETLISTSUPPLIERJOINTENDER, data).subscribe((response: any) => {
        this.tenderHistories = response;
        for (let i = 0; i < this.tenderHistories.length; i++) {
          if (this.tenderHistories[i].tenderHistoryID.supplier.userId == this.user.userId) {
            this.rateBuyer = this.tenderHistories[i].star;
          }
        }
      }, error => {
        console.log(error);
      });
    });
  }

  star(e) {
    let data = {
      'TenderID': this.tenderID,
      'SupplierID': this.user.userId,
      'Star': e.target.title
    };
    this.tenderService.rateBuyerTender(this.constants.RATEBUYERTENDER, data).subscribe((response: any) => {
      alert(response);
    }, error => {
      console.log(error);
    });
  }

  cancleTender(cancelForm) {
    let data = {
      'TenderID': this.tenderID,
      'Reason': cancelForm.reason
    };
    console.log(data);
    this.tenderService.cancleTender(this.constants.CANCLETENDER, data).subscribe((response: any) => {
      alert(response);
    }, error => {
      console.log(error);
    });
    if (this.user.role == 'BUYER') {
      this.router.navigate(['/buyer/tender-list/cancel']);
    } else if (this.user.role == 'SUPPLIER') {
      this.router.navigate(['/supplier/tender-list/cancel']);
    }

  }

  showChooseBidder(supplierID) {
    this.winBidder = supplierID;
    document.getElementById('openChooseBidderModel').click();
  }

  chooseBidder(chooseBidderForm) {
    let data = {
      'TenderID': this.tenderID,
      'SupplierID': this.winBidder,
      'Reason': chooseBidderForm.reasonChoose
    };
    this.tenderService.chooseBidder(this.constants.CHOOSEBIDDER, data).subscribe((response: any) => {
      this.tender = response.tenderHistoryID.tender;
      $('#chooseBidderModal').hide();
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy() {
    clearInterval(this.xInterval);
  }

}
