import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {TenderService} from "../../../services/tender.service";
import {Constants} from './../../../constants';
import * as $ from 'jquery';
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-buy-tender-create',
  templateUrl: './buy-tender-create.component.html',
  styleUrls: ['./buy-tender-create.component.css'],
})
export class BuyTenderCreateComponent implements OnInit, OnDestroy {


  public user;
  public products;
  public myError;
  public contractFiles = [];
  public closeDay = null;
  public remainNum = 5000;
  public minDateValue: Date;
  public maxDateValue: Date;
  public minClosingDay = (new Date().getTime()) + 1 * 24 * 60 * 60 * 1000;
  public maxClosingDay = (new Date().getTime()) + 30 * 24 * 60 * 60 * 1000;
  public units = ['piece(s)', 'box(s)', 'unit(s)', 'pair(s)'];
  public paymentModes;
  public paymentTypes;
  public paymentTypeValue = [];
  public fileType: boolean;

  constructor(private tenderService: TenderService,
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
    this.minDateValue = new Date(this.minClosingDay);
    this.minDateValue.setHours(0);
    this.minDateValue.setMinutes(0);
    this.minDateValue.setSeconds(0);

    this.maxDateValue = new Date(this.maxClosingDay);
    this.maxDateValue.setHours(23);
    this.maxDateValue.setMinutes(59);
    this.maxDateValue.setSeconds(59);


    this.tenderService.getListPaymentMode(this.constants.GETLISTPAYMENTMODE).subscribe((response: any) => {
      this.paymentModes = response;
    });

  }

  ngOnDestroy() {
    this.contractFiles = [];
    this.closeDay = null;
  }


  countRemain(e) {
    this.remainNum = 5000 - e.target.textLength;
  }

  searchProduct(searchValue) {
    let data = {
      'SearchValue': searchValue
    };
    this.tenderService.searchProduct(this.constants.SEARCHPRODUCT, data).subscribe((response: any) => {
      this.products = response;
      $('#collapseExample').show();
    }, error => {
      this.myError = error._body;
    });

  }

  changeInput(e) {
    $('#collapseExample').hide();
    this.myError = '';
  }

  chooseProduct(productName, createTenderForm) {
    createTenderForm.controls['ProductName'].setValue(productName);
    $('#collapseExample').hide();
  }

  formatDateTime(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' '
      + date.getHours() + ':' + date.getMinutes() + ':00';
  }

  importContractFile(e) {
    this.fileType = true;
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].type != 'application/pdf' &&
        e.target.files[i].type != 'application/msword' &&
        e.target.files[i].type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
        e.target.files[i].type != 'application/vnd.ms-excel' &&
        e.target.files[i].type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.fileType = false;
        return;
      }
      this.contractFiles.push(e.target.files[i]);
    }
  }

  removeContract(index) {
    this.contractFiles.splice(index, 1);
  }

  chosePaymentType(e) {
    if (e.target.checked == true) {
      this.paymentTypeValue.push(Number(e.target.value));
    } else if (e.target.checked == false) {
      for (let i = 0; i < this.paymentTypeValue.length; i++) {
        if (this.paymentTypeValue[i] == Number(e.target.value)) {
          this.paymentTypeValue.splice(i, 1);
        }
      }
    }
  }

  changePaymentMode() {
    this.paymentTypeValue = [];
    let f = document.forms[0];
    for (let i = 0; i < f.elements.length; i++) {
      if (f[i].type == 'checkbox') {
        f[i].checked = false;
      }
    }
  }

  createTender(createTenderForm) {
    console.log(createTenderForm);
    console.log(this.contractFiles);
    console.log(this.closeDay);
    console.log(this.paymentTypeValue);
    let formData = new FormData();
    formData.append('BuyerID', this.user.userId);
    formData.append('ProductName', createTenderForm.ProductName);
    formData.append('PaymentModeID', createTenderForm.PaymentMode);
    for (let i = 0; i < this.paymentTypeValue.length; i++) {
      formData.append('PaymentTypeID', this.paymentTypeValue[i]);
    }
    for (let i = 0; i < this.contractFiles.length; i++) {
      formData.append('CoverFile', this.contractFiles[i]);
    }
    if (createTenderForm.EMDFee == 'Yes') {
      formData.append('EmdFee', '0');
    } else if (createTenderForm.EMDFee == 'No') {
      formData.append('EmdFee', createTenderForm.Fee);
    }
    formData.append('TenderTitle', createTenderForm.TenderTitle);
    formData.append('WorkDescription', createTenderForm.WorkDescription);
    formData.append('TenderValue', createTenderForm.TenderValue);
    formData.append('PeriodTime', createTenderForm.Period);
    formData.append('CloseDay', this.formatDateTime(this.closeDay));
    this.tenderService.createTender(this.constants.CREATETENDER, formData).subscribe((res) => {

      this.toastr.success(res, 'Success!', {showCloseButton: true});
      setTimeout(() => {
        this.router.navigate(['buyer/tender-list/' + 'active']);
      }, 1000);

    }, error => {
      console.log(error);
    });

  }


}
