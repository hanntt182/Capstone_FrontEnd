import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Constants} from './../../../constants';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TenderService} from '../../../services/tender.service';
import {ToastsManager} from "ng2-toastr";

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
  public tenderStatusTabs = ['active', 'closed', 'finished', 'cancelled'];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private tenderService: TenderService,
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
    if (this.user.role == 'SUPPLIER') {
      let data = {
        'SupplierID': this.user.userId,
        'SearchValue': searchValue,
        'Status': this.tenderStatus,
        'pageNumber': pageNumber
      };
      this.tenderService.searchTenderSupplier(this.constants.SEARCHTENDERSUPPLIER, data).subscribe((response: any) => {
        this.tenders = response.content;
      });
    } else if (this.user.role == 'BUYER') {
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
    this.tenderService.cancleTender(this.constants.CANCLETENDER, data).subscribe((response: any) => {
      this.toastr.success(response, 'Success!', {showCloseButton: true});
      document.getElementById('opencancelTenderModal').click();
      this.router.navigate(['/buyer/tender-list/cancelled']);
    }, error => {
      console.log(error);
    });

  }

}
