import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {Constants} from './../../../constants';
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-sup-main',
  templateUrl: './sup-main.component.html',
  styleUrls: ['./sup-main.component.css']
})
export class SupMainComponent implements OnInit {

  public user;
  // Bar Chart
  public labelOfBar = [];
  public dataOfBar = [];
  data1: any;


  // Pie Chart
  data: any;
  public colorOfPie = ['#FF6384', '#36A2EB', '#FFCE56', '#0bcc81',
    '#ff9933', '#cc33ff', '#6600ff', '#cccc00', '#ff3300', '#92B558', '#672E3B', '#005960', '#9C9A40', '#95DEE3', '#EDCDC2'];
  public labelOfPie = [];
  public dataOfPie = [];
  public backgroundColorPie = [];
  public hoverBackgroundColorPie = [];

  public dataOrder = [];
  public dataRevenue = [];


  constructor(private commonService: CommonService,
              private constants: Constants,
              private decimalPipe: DecimalPipe) {


  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }


    let data = {
      'SupplierID': this.user.userId
    };
    this.commonService.statisticSupplier(this.constants.STATISTICSUPPLIER, data).subscribe((response: any) => {

      // Chart Bar
      for (let i = 0; i < this.labelOfBar.length; i++) {
        this.labelOfBar.pop();
        this.dataOfBar.pop();
      }
      if (response[3].CHART_BAR.length > 0) {
        for (let i = 0; i < response[3].CHART_BAR.length; i++) {
          this.labelOfBar.push(response[3].CHART_BAR[i].month_name);
          this.dataOfBar.push(response[3].CHART_BAR[i].revenue);
        }
        this.data1 = {
          labels: this.labelOfBar,
          datasets: [
            {
              label: 'Revenue',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: this.dataOfBar
            }
          ]
        };
      }

      // Chart Pie
      for (let i = 0; i < this.labelOfPie.length; i++) {
        this.labelOfPie.pop();
        this.dataOfPie.pop();
        this.backgroundColorPie.pop();
        this.hoverBackgroundColorPie.pop();
      }
      if (response[2].ORDER_SUCESS_BRAND.length > 0) {
        for (let i = 0; i < response[2].ORDER_SUCESS_BRAND.length; i++) {
          this.labelOfPie.push(response[2].ORDER_SUCESS_BRAND[i].brand_name);
          this.dataOfPie.push(response[2].ORDER_SUCESS_BRAND[i].number_order);
          this.backgroundColorPie.push(this.colorOfPie[i]);
          this.hoverBackgroundColorPie.push(this.colorOfPie[i]);
        }
        this.data = {
          labels: this.labelOfPie,
          datasets: [
            {
              data: this.dataOfPie,
              backgroundColor: this.backgroundColorPie,
              hoverBackgroundColor: this.hoverBackgroundColorPie
            }]
        };
      }

      this.dataOrder = response[0].NUMBER_ORDER;
      this.dataRevenue = response[1].REVENUE;

    });
  }

}
