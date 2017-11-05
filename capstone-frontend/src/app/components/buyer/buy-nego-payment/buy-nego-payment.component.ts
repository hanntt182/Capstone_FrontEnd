import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {NegoService} from "../../../services/nego.service";
import {Constants} from './../../../constants';

@Component({
  selector: 'app-buy-nego-payment',
  templateUrl: './buy-nego-payment.component.html',
  styleUrls: ['./buy-nego-payment.component.css']
})
export class BuyNegoPaymentComponent implements OnInit {

  public banks = ['Orient Commercial Joint Stock Bank',
    'Asia Commercial Bank',
    'Tien Phong Commercial Joint Stock Bank',
    'Hanoi Building Joint-stock Commercial Bank',
    'Maritime Commercial Joint Stock Bank',
    'Sai Gon Thuong Tin Commercial Joint-stock Bank',
    'Eastern Asia Commercial Joint Stock Bank',
    'Viet nam Export – Import Commercial Joint Stock Bank',
    'Nam A Commercial Joint Stock Bank',
    'Saigon bank for Industry & Trade',
    'Vietnam Prosperity commercial joint-stock bank',
    'Viet Nam Technological and Commercial Joint Stock Bank',
    'Military Commercial Joint Stock Bank',
    'Bac A Commercial Joint Stock Bank',
    'Vietnam International Commercial Joint Stock Bank',
    'Southeast Asia Commercial Joint Stock Bank',
    'Housing development Commercial Joint Stock Bank',
    'Southern Commercial Joint Stock Bank',
    'Viet Capital Commercial Joint Stock Bank',
    'Sai Gon Joint Stock Commercial Bank',
    'Viet A Commercial Joint Stock Bank',
    'Saigon-Hanoi Commercial Joint Stock Bank',
    'Global Petro Commercial Joint Stock Bank',
    'An Binh Commercial Joint Stock Bank',
    'Nam Viet Commercial Joint Stock Bank',
    'Kien Long Commercial Joint Stock Bank',
    'Mekong Commercial Bank',
    'Viet Nam thuong Tin Commercial Joint Stock Bank',
    'OCEAN Commercial Joint Stock Bank',
    'Petrolimex Group Commercial Joint Stock Bank',
    'Western Rural Commercial Joint Stock Bank',
    'Great Trust Joint Stock Commercial Bank',
    'Great Asia Commercial Joint Stock Bank',
    'LienViet Post Commercial Joint Stock Bank',
    'Mekong Development Joint Stock Commercial Bank',
    'Bao Viet Joint Stock Commercial Bank',
    'Western Bank (Phuong Tay Bank)',
    'Viet Nam Public Bank (PVcomBank)',
    'Tien Phong Joint Stock Commercial Bank (Tp Bank)',
    'VPBank'
  ];
  public months = ['January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November'
  ];
  public years = ['1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017'];
  public negoID;
  public orderID;
  public negotiation;
  public user;
  public key = '';

  constructor(private activatedRoute: ActivatedRoute,
              private negoService: NegoService,
              private constants: Constants) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.negoID = params['negoId'];
    });

    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    let data = {
      'NegotiationID': this.negoID
    };
    this.negoService.viewNegotiationDetail(this.constants.VIEWNEGOTIATIONDETAIL, data).subscribe((response: any) => {
      this.negotiation = response;
    });
  }

  paymentAction() {
    let data = {
      'NegotiationID': this.negoID
    };
    this.negoService.paymentForNegotiation(this.constants.PAYMENTFORNEGOTIATION, data).subscribe((response: any) => {
      this.key = response.ReceiptCode;
      this.orderID = response.OrderID;
    });
    document.getElementById('openKeyModalButton').click();
  }

}
