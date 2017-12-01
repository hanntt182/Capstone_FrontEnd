import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TenderService} from "../../../services/tender.service";
import {Constants} from './../../../constants';
import {now} from "moment";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-tender-detail',
  templateUrl: './tender-detail.component.html',
  styleUrls: ['./tender-detail.component.css']
})
export class TenderDetailComponent implements OnInit, OnDestroy {

  public tenderID;
  public tender;
  public starsCount: number = 3.456789;
  public user;
  public buyerRateStar;
  public winnerRateStar;
  public star1 = 1;
  public star2 = 2;
  public star3 = 3;
  public star4 = 4;
  public star5 = 5;
  public total;
  public winnerTotal;
  public rateBuyer;
  public rateWinner;
  public tenderHistories;
  public winBidder;


  constructor(private activatedRoute: ActivatedRoute,
              private tenderService: TenderService,
              private constants: Constants,
              private router: Router,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
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
        this.tender = response;
        this.starsCount = response.buyer.rate;
        this.buyerRateStar = response.buyer.rate;
        if (this.tender.winner != null) {
          this.winnerRateStar = response.winner.rate;
          this.winnerTotal = response.winner.star1 + response.winner.star2 + response.winner.star3 + response.winner.star4
            + response.winner.star5;
        }
        this.rateWinner = response.star;
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
        if (error.status == 404) {
          this.tenderHistories = null;
        }
      });
    });
  }

  backToPrevious() {
    history.back();
  }


  star(e) {
    if (this.user.role == 'SUPPLIER') {
      let data = {
        'TenderID': this.tenderID,
        'SupplierID': this.user.userId,
        'Star': e.target.title
      };
      this.tenderService.rateBuyerTender(this.constants.RATEBUYERTENDER, data).subscribe((response: any) => {
        this.toastr.success(response, 'Success!', {showCloseButton: true});
        this.ngOnInit();
      }, error => {
        this.toastr.error(error._body, 'Error!', {showCloseButton: true});
        console.log(error);
      });
    } else if (this.user.role == 'BUYER') {
      let data = {
        'TenderID': this.tenderID,
        'Star': e.target.title
      };
      this.tenderService.rateSupplierTender(this.constants.RATESUPPLIERTENDER, data).subscribe((response: any) => {
        this.toastr.success(response, 'Success!', {showCloseButton: true});
        this.ngOnInit();
      }, error => {
        this.toastr.error(error._body, 'Error!', {showCloseButton: true});
        console.log(error);
      });
    }

  }

  viewCompanyInformation(userID){

    document.getElementById('openCompanyInformationModal').click();
  }

  openCancelTender(tenderID) {
    this.tenderID = tenderID;
    document.getElementById('opencancelTenderModal').click();
  }

  cancelTender(cancelForm) {
    let data = {
      'TenderID': this.tenderID,
      'Reason': cancelForm.reason
    };
    this.tenderService.cancleTender(this.constants.CANCLETENDER, data).subscribe((response: any) => {
      this.toastr.success(response, 'Success!', {showCloseButton: true});
      setTimeout(() => {
        document.getElementById('opencancelTenderModal').click();
        this.router.navigate(['/buyer/tender-list/cancel']);
      }, 1000);
    }, error => {
      console.log(error);
    });

  }

  withdrawTender(tenderID) {
    let data = {
      'TenderID': tenderID,
      'SupplierID': this.user.userId
    };
    this.tenderService.withdrawTender(this.constants.WITHDRAWTENDER, data).subscribe((response: any) => {
      this.toastr.success(response, 'Success!', {showCloseButton: true});
      setTimeout(() => {
        this.router.navigate(['/supplier/tender-list/active']);
      }, 1000);
    }, error => {
      this.toastr.error(error._body, 'Error!', {showCloseButton: true});
    });
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
      this.tender = response;
      $('#chooseBidderModal').hide();
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      this.toastr.success('Choose winner successfully!', 'Success!', {showCloseButton: true});
    }, error => {
      console.log(error);
      this.toastr.error(error._body, 'Error!', {showCloseButton: true});
    });
  }

  ngOnDestroy() {
  }

}
