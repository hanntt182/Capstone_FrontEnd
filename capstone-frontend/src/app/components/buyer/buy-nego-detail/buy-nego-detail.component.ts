import {Component, OnInit} from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NegoService} from "../../../services/nego.service";
import {Constants} from './../../../constants';
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-buy-nego-detail',
  templateUrl: './buy-nego-detail.component.html',
  styleUrls: ['./buy-nego-detail.component.css']
})
export class BuyNegoDetailComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };
  public model: any = {date: {year: 2018, month: 10, day: 9}};
  public negoID;
  public negoStatus;
  public negotiation;
  public negotiations;
  public user;
  public messages;
  public productAmount;
  public totalAmount;
  public cities;
  public districts;
  public wards;
  public city;
  public district;
  public ward;

  constructor(private activatedRoute: ActivatedRoute,
              private negoService: NegoService,
              private constants: Constants,
              private orderService: OrderService,
              private router: Router) {
  }

  ngOnInit() {


    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.activatedRoute.params.subscribe((params: Params) => {
      this.negoID = params['negoId'];
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.negoStatus = params['negoStatus'];
    });


    let data = {
      'NegotiationID': this.negoID
    };
    this.negoService.viewNegotiationDetail(this.constants.VIEWNEGOTIATIONDETAIL, data).subscribe((response: any) => {
      this.negotiation = response;
    });
    this.negoService.getListMessage(this.constants.GETLISTMESSAGE, data).subscribe((response: any) => {
      this.messages = response;
    }, error => {
      console.log(error);
    });

    this.searchNego('');


    this.orderService.getListCity(this.constants.GETLISTCITY).subscribe((response: any) => {
      this.cities = response.LtsItem;
    }, error => {
      console.log(error);
    });


  }


  chooseCity(cityID) {
    let data = {
      'CityID': cityID
    };
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].cityID == cityID) {
        this.city = this.cities[i].cityName;
      }
    }
    this.orderService.getListDistrict(this.constants.GETLISTDISTRICT, data).subscribe((response: any) => {
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
      if (this.districts[i].districtID == districtID) {
        this.district = this.districts[i].districtName;
      }
    }
    this.orderService.getListWard(this.constants.GETLISTWARD, data).subscribe((response: any) => {
      this.wards = response;
    }, error => {
      console.log(error);
    });
  }

  chooseWard(wardID) {
    for (let i = 0; i < this.wards.length; i++) {
      if (this.wards[i].wardID == wardID) {
        this.ward = this.wards[i].wardName;
      }
    }
  }

  changeNego(negoID) {
    this.router.navigate(['/buyer/negotiation/' + this.negoStatus + '/' + negoID]);
    this.ngOnInit();
  }

  searchNego(searchValue) {
    let data = {
      'SearchValue': searchValue,
      'BuyerID': this.user.userId,
      'Status': this.negoStatus
    };
    this.negoService.searchListNegotiationBuyer(this.constants.SEARCHLISTNEGOTIATIONBUYER, data).subscribe((response: any) => {
      this.negotiations = response;
    });
  }

  countAmount(createNegoOrder) {
    this.productAmount = createNegoOrder.quantity * createNegoOrder.offerPrice;
    this.totalAmount = Number(this.productAmount) + Number(createNegoOrder.feeShip);
  }

  sendMessage(sendMessageForm) {
    let data = {
      'NegotiationID': this.negoID,
      'SenderID': this.user.userId,
      'Message': sendMessageForm.message
    };
    this.negoService.sendMessage(this.constants.SENDMESSAGE, data).subscribe((response: any) => {
      this.messages = response;
    }, error => {
      console.log(error);
    });
  }

}
