import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Constants} from './../../../constants';
import {CommonService} from "../../../services/common.service";
import {ActivatedRoute, Params} from "@angular/router";
import {DealService} from "../../../services/deal.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-buy-deal-order',
  templateUrl: './buy-deal-order.component.html',
  styleUrls: ['./buy-deal-order.component.css']
})
export class BuyDealOrderComponent implements OnInit {

  public user;
  public addresses;
  public cities;
  public districts;
  public wards;
  public city;
  public district;
  public ward;
  public dealID;
  public deal;
  public productAmount = 0;
  public shippingFee = 0;
  public setDisabledNew = false;
  public setDisabledOld = false;
  public address;
  public orderID;
  public key;
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

  constructor(private constants: Constants,
              private commonService: CommonService,
              private activatedRoute: ActivatedRoute,
              private dealService: DealService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.addresses = this.user.address;

    this.commonService.getListCity(this.constants.GETLISTCITY).subscribe((response: any) => {
      this.cities = response.LtsItem;
    }, error => {
      console.log(error);
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.dealID = Number(params['dealId']);
      let data = {
        'DealID': this.dealID
      };
      this.dealService.viewDealDetail(this.constants.VIEWDEALDETAIL, data).subscribe((response: any) => {
        this.deal = response;
      }, error => {
        console.log(error);
      });
    });
  }

  backToPrevious() {
    history.back();
  }

  checkAddress(e, createDealOrderForm) {
    console.log(e.target.value);
    if (e.target.value == 'newAddress') {
      this.setDisabledOld = true;
      this.setDisabledNew = false;
      createDealOrderForm.controls['oldAddressName'].setValue('');
    } else if (e.target.value == 'oldAddress') {
      this.setDisabledOld = false;
      this.setDisabledNew = true;
      createDealOrderForm.controls['newAddressCity'].setValue('');
      createDealOrderForm.controls['newAddressDistrict'].setValue('');
      createDealOrderForm.controls['newAddressWard'].setValue('');
      createDealOrderForm.controls['newAddressValue'].setValue('');
    }
  }

  chooseCity(cityID) {
    let data = {
      'CityID': cityID
    };
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].ID == cityID) {
        this.city = this.cities[i].Title;
      }
    }
    this.commonService.getListDistrict(this.constants.GETLISTDISTRICT, data).subscribe((response: any) => {
      this.districts = response;
    }, error => {
      console.log(error);
    });
  }

  chooseDistrict(districtID) {
    let data = {
      'DistrictID': districtID
    };
    for (let i = 0; i < this.districts.length; i++) {
      if (this.districts[i].ID == districtID) {
        this.district = this.districts[i].Title;
      }
    }
    this.commonService.getListWard(this.constants.GETLISTWARD, data).subscribe((response: any) => {
      this.wards = response;
    }, error => {
      console.log(error);
    });
  }

  chooseWard(wardID) {
    for (let i = 0; i < this.wards.length; i++) {
      if (this.wards[i].ID == wardID) {
        this.ward = this.wards[i].Title;
      }
    }
  }

  countAmount(createDealOrderForm) {
    this.productAmount = (createDealOrderForm.quantity) * (this.deal.discountPrice);
  }

  countShippingFee(createDealOrderForm) {
    console.log(createDealOrderForm.shipMethod);
    for (let i = 0; i < this.deal.dealShips.length; i++) {
      if (this.deal.dealShips[i].dealShipID.ship.shipID == createDealOrderForm.shipMethod) {
        this.shippingFee = this.deal.dealShips[i].shippingFee;
      }
    }
  }

  createDealOrder(createDealOrderForm){
    if(createDealOrderForm.address == 'oldAddress'){
      this.address = createDealOrderForm.oldAddressName;
    } else if (createDealOrderForm.address == 'newAddress'){
      this.address = createDealOrderForm.newAddressValue + ', ' + this.ward
        + ', ' + this.district + ', ' + this.city;
    }
    let data = {
      'DealID': this.dealID,
      'BuyerID': this.user.userId,
      'Address': this.address,
      'Quantity': createDealOrderForm.quantity,
      'ShipID': createDealOrderForm.shipMethod,
      'ShipFee': this.shippingFee,
      'Remark': createDealOrderForm.remark
    };
    this.dealService.payDeal(this.constants.PAYDEAL, data).subscribe((response: any) => {
      this.orderID = response.OrderID;
      this.key = response.ReceiptCode;
      document.getElementById('openReceiptKeyModalButton').click();
    }, error => {
      this.toastr.error(error._body, 'Error!', {showCloseButton: true});
      console.log(error);
    });
  }

}
