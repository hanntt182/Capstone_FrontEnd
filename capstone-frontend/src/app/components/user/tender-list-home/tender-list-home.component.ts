import {Component, OnDestroy, OnInit} from '@angular/core';
import {Constants} from './../../../constants';
import {TenderService} from '../../../services/tender.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tender-list-home',
  templateUrl: './tender-list-home.component.html',
  styleUrls: ['./tender-list-home.component.css']
})
export class TenderListHomeComponent implements OnInit, OnDestroy {

  public user;
  public tender;
  public tenders;
  public checkBid = null;
  public now;
  public closedDay;
  public distance;
  public xInterval;
  public starsCount;
  public buyerRateStar;
  public star1 = 1;
  public star2 = 2;
  public star3 = 3;
  public star4 = 4;
  public star5 = 5;
  public total;
  public myTenderInfo;


  constructor(private constants: Constants,
              private tenderService: TenderService,
              private router: Router) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.search('', 1);
  }

  ngOnDestroy() {
    clearInterval(this.xInterval);
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
      });
      this.tenderService.viewTenderHistoryDetail(this.constants.VIEWTENDERHISTORYDETAIL, data1).subscribe((response: any) => {
        this.myTenderInfo = response;
      });
    }

    let data = {
      'TenderID': tenderID
    };
    this.tenderService.viewTenderDetail(this.constants.VIEWTENDERDETAIL, data).subscribe((response: any) => {
      this.closedDay = response.closedDay;
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
        if (this.distance < 0) {
          clearInterval(this.xInterval);
          document.getElementById('countdown').innerHTML = 'FINISHED';
        }
      }, 1000);

      this.tender = response;
      this.starsCount = response.buyer.rate;
      this.buyerRateStar = response.buyer.rate;
      this.total = response.buyer.star1 + response.buyer.star2 + response.buyer.star3 + response.buyer.star4 + response.buyer.star5;
      document.getElementById('tenderDetailButton').click();
    });
  }

  bidTender(tenderID, unitPrice) {
    let data = {
      'TenderID': tenderID,
      'SupplierID': this.user.userId,
      'UnitPrice': unitPrice
    };
    this.tenderService.bidTender(this.constants.BIDTENDER, data).subscribe((response: any) => {
      alert(response);
      this.router.navigate(['/tender']);
    }, error => {
      console.log(error);
    });
  }

}
