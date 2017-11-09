import {Component, OnInit} from '@angular/core';
import {TenderService} from "../../../services/tender.service";
import {Constants} from './../../../constants';
import * as $ from 'jquery';
import {Router} from "@angular/router";

@Component({
  selector: 'app-buy-tender-create',
  templateUrl: './buy-tender-create.component.html',
  styleUrls: ['./buy-tender-create.component.css'],
})
export class BuyTenderCreateComponent implements OnInit {


  public user;
  public products;
  public myError;
  public contractFile;
  public closeDay;
  public remainNum = 5000;
  public minDateValue: Date;
  public tomorrow = (new Date().getDate()) + 1;
  public units = ['piece(s)', 'box(s)', 'unit(s)', 'pair(s)'];

  constructor(private tenderService: TenderService,
              private constants: Constants,
              private router: Router) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.minDateValue = new Date();
    this.minDateValue.setDate(this.tomorrow);
    this.minDateValue.setHours(0);
    this.minDateValue.setMinutes(0);
    this.minDateValue.setSeconds(0);
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
    this.contractFile = e.target.files[0];
  }

  createTender(createTenderForm) {
    let formData = new FormData();
    formData.append('BuyerID', this.user.userId);
    formData.append('ProductName', createTenderForm.ProductName);
    formData.append('TenderTitle', createTenderForm.TenderTitle);
    formData.append('TenderContent', createTenderForm.TenderContent);
    formData.append('UnitPrice', createTenderForm.UnitPrice);
    formData.append('ContractFile', this.contractFile);
    formData.append('PeriodTime', createTenderForm.PeriodTime);
    formData.append('CloseDay', this.formatDateTime(this.closeDay));
    formData.append('Unit', createTenderForm.Unit);
    formData.append('Quantity', createTenderForm.Quantity);
    this.tenderService.createTender(this.constants.CREATETENDER, formData).subscribe((res) => {
      alert(res);
      this.router.navigate(['buyer/tender-list/' + 'active']);
    }, error => {
      console.log(error);
    });

  }


}
