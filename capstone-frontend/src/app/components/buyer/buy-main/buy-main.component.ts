import {Component, OnInit} from '@angular/core';
import {Constants} from './../../../constants';
import {CommonService} from "../../../services/common.service";
import {CatalogService} from "../../../services/catalog.service";

@Component({
  selector: 'app-buy-main',
  templateUrl: './buy-main.component.html',
  styleUrls: ['./buy-main.component.css']
})
export class BuyMainComponent implements OnInit {

  public user;
  public categories;

  // Pie Chart for Status
  data: any;
  public colorOfPie = ['#FF6384', '#36A2EB', '#FFCE56', '#0bcc81', '#ff9933', '#cc33ff', '#6600ff',
    '#cccc00', '#ff3300', '#92B558', '#672E3B', '#005960', '#9C9A40', '#95DEE3', '#EDCDC2'];;
  public statusOfPie = ['Waiting', 'Paying', 'Shipping', 'Success', 'Cancelled'];
  public labelOfPie = [];
  public dataOfPie = [];
  public backgroundColorPie = [];
  public hoverBackgroundColorPie = [];

  // Pie Chart for Brand
  data1: any;
  public colorOfPie1 = ['#FF6384', '#36A2EB', '#FFCE56', '#0bcc81', '#ff9933', '#cc33ff',
    '#6600ff', '#cccc00', '#ff3300', '#92B558', '#672E3B', '#005960', '#9C9A40', '#95DEE3', '#EDCDC2'];;
  public labelOfPie1 = [];
  public dataOfPie1 = [];
  public backgroundColorPie1 = [];
  public hoverBackgroundColorPie1 = [];


  allOrder;
  allOrderSuccess;


  constructor(private constants: Constants,
              private commonService: CommonService,
              private catalogService: CatalogService) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.catalogService.getCatalogs(this.constants.GETLISTCATALOG).subscribe((response: any) => {
      this.categories = response;

      this.getDataByCatalog(this.categories[0].catalogId);
    });

    let data = {
      'BuyerID': this.user.userId
    };
    this.commonService.statisticOrderBuyerWithStatus(this.constants.STATISTICORDERBUYERWITHSTATUS, data).subscribe((response: any) => {
      this.allOrder = response[0].ALL_ORDER;
      this.allOrderSuccess = response[0].ALL_ORDER_SUCCESS;

      // Chart Pie for Status
      for (let i = 0; i < this.labelOfPie.length; i++) {
        this.labelOfPie.pop();
        this.dataOfPie.pop();
        this.backgroundColorPie.pop();
        this.hoverBackgroundColorPie.pop();
      }
      for (let i = 0; i < response[1].PIE_CHART_STATUS.length - 1; i++) {
        this.labelOfPie.push(this.statusOfPie[i]);
        this.dataOfPie.push(response[1].PIE_CHART_STATUS[i + 1].number_order);
        this.backgroundColorPie.push(this.colorOfPie[i]);
      }
      this.data = {
        labels: this.labelOfPie,
        datasets: [
          {
            data: this.dataOfPie,
            backgroundColor: this.backgroundColorPie,
            hoverBackgroundColor: this.backgroundColorPie
          }]
      };

    });


  }

  getDataByCatalog(catalogID) {
    this.labelOfPie1 = [];
    this.dataOfPie1 = [];
    this.hoverBackgroundColorPie1 = [];
    let data1 = {
      'BuyerID': this.user.userId,
      'CatalogID': catalogID
    };
    this.commonService.statisticOrderBuyerWithBrand(this.constants.STATISTICORDERBUYERWITHBRAND, data1).subscribe((response: any) => {
      // Chart Pie for Status
      for (let i = 0; i < response.PIE_CHART_BRAND.length; i++) {
        this.labelOfPie1.push(response.PIE_CHART_BRAND[i].orderName);
        this.dataOfPie1.push(response.PIE_CHART_BRAND[i].number_order);
        this.hoverBackgroundColorPie1.push(this.colorOfPie1[i]);
        console.log(this.colorOfPie1[i]);
      }
      console.log(this.colorOfPie1);
      this.data1 = {
        labels: this.labelOfPie1,
        datasets: [
          {
            data: this.dataOfPie1,
            backgroundColor: this.hoverBackgroundColorPie1,
            hoverBackgroundColor: this.hoverBackgroundColorPie1
          }]
      };
    });
  }

}
