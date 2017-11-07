import {Component, OnInit} from '@angular/core';
import {Constants} from './../../../constants';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TenderService} from '../../../services/tender.service';

@Component({
  selector: 'app-tender-list',
  templateUrl: './tender-list.component.html',
  styleUrls: ['./tender-list.component.css']
})
export class TenderListComponent implements OnInit {

  public user;
  public tenderStatus;
  public tenders;
  public tenderID;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private tenderService: TenderService,
              private constants: Constants) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.activatedRoute.params.subscribe((params: Params) => {
      this.tenderStatus = params['tenderStatus'];
      this.changePage('', 1);
    });
  }

  changeStatus(status) {
    if (this.user.role == 'BUYER') {
      this.router.navigate(['/buyer/tender-list/' + status]);
    } else if (this.user.role == 'SUPPLIER') {
      this.router.navigate(['/supplier/tender-list/' + status]);
    }
  }

  changePage(searchValue, pageNumber) {
    let data = {
      'BuyerID': this.user.userId,
      'SearchValue': searchValue,
      'Status': this.tenderStatus,
      'pageNumber': pageNumber
    };
    this.tenderService.searchTenderBuyer(this.constants.SEARCHTENDERBUYER, data).subscribe((response: any) => {
      this.tenders = response.content;
    });
  }

  viewTenderDetail(tenderID) {
    if (this.user.role == 'BUYER') {
      this.router.navigate(['/buyer/tender-detail/' + tenderID]);
    } else if (this.user.role == 'SUPPLIER') {
      this.router.navigate(['/supplier/tender-detail/' + tenderID]);
    }
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
    console.log(data);
    this.tenderService.cancleTender(this.constants.CANCLETENDER, data).subscribe((response: any) => {
      alert(response);
    }, error => {
      console.log(error);
    });

  }

}
