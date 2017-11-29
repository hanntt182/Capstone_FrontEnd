import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Constants} from './../../../constants';
import {TenderService} from '../../../services/tender.service';
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-tender-list-home',
  templateUrl: './tender-list-home.component.html',
  styleUrls: ['./tender-list-home.component.css']
})
export class TenderListHomeComponent implements OnInit, OnDestroy {

  public user;
  public tender;
  public tenders;
  public checkBid;
  public buyerRateStar;
  public star1 = 1;
  public star2 = 2;
  public star3 = 3;
  public star4 = 4;
  public star5 = 5;
  public total;
  public myTenderInfo;
  public fileType: boolean;
  public attachFile = null;


  constructor(private constants: Constants,
              private tenderService: TenderService,
              private router: Router,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.search('', 1);
  }

  ngOnDestroy() {
    this.attachFile = null;
  }

  importAttachFile(e) {
    this.fileType = true;
    if (e.target.files[0].type != 'application/pdf' &&
      e.target.files[0].type != 'application/msword' &&
      e.target.files[0].type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
      e.target.files[0].type != 'application/vnd.ms-excel' &&
      e.target.files[0].type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.fileType = false;
      return;
    } else {
      this.attachFile = e.target.files[0];
    }
  }


  search(searchValue, pageNumber) {
    let data = {
      'SearchValue': searchValue,
      'pageNumber': pageNumber
    };
    this.tenderService.searchTender(this.constants.SEARCHTENDER, data).subscribe((response: any) => {
      this.tenders = response.content;
    });
  }

  viewTenderDetail(tenderID) {
    if (this.user != null) {
      let data1 = {
        'SupplierID': this.user.userId,
        'TenderID': tenderID
      };
      this.tenderService.checkBid(this.constants.CHECKBID, data1).subscribe((response: any) => {
        this.checkBid = response;
        if (this.checkBid) {
          this.tenderService.viewTenderHistoryDetail(this.constants.VIEWTENDERHISTORYDETAIL, data1).subscribe((res: any) => {
            this.myTenderInfo = res;
            console.log(this.myTenderInfo);
          });
        }
      });
    }

    let data = {
      'TenderID': tenderID
    };
    this.tenderService.viewTenderDetail(this.constants.VIEWTENDERDETAIL, data).subscribe((response: any) => {
      this.tender = response;
      this.buyerRateStar = response.buyer.rate;
      this.total = response.buyer.star1 + response.buyer.star2 + response.buyer.star3 + response.buyer.star4 + response.buyer.star5;
      document.getElementById('tenderDetailButton').click();
    });
  }

  bidTender(tenderID, price, period) {
    let formData = new FormData();
    formData.append('TenderID', tenderID);
    formData.append('SupplierID', this.user.userId);
    formData.append('BidPrice', price);
    formData.append('SuppFile', this.attachFile);
    formData.append('WorkPeriod', period);
    this.tenderService.bidTender(this.constants.BIDTENDER, formData).subscribe((response: any) => {
      console.log(response);
      $('#tenderDetailModal').hide();
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      this.toastr.success(response, 'Success!', {showCloseButton: true});
      this.router.navigate(['/tender']);
    }, error => {
      console.log(error);
    });
  }

}
