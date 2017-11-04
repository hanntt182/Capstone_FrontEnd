import {Component, OnInit} from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NegoService} from '../../../services/nego.service';
import {Constants} from './../../../constants';
import {OrderService} from '../../../services/order.service';
import * as $ from 'jquery';

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
  public address;

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
      this.countAmount(response.quantity, response.offerPrice, response.shipPrice);
    });
    setInterval(() => {
      this.getMessage(this.negoID);
    }, 500);

    this.searchNego('');


    this.orderService.getListCity(this.constants.GETLISTCITY).subscribe((response: any) => {
      this.cities = response.LtsItem;
    }, error => {
      console.log(error);
    });
  }

  getMessage(negoID) {
    let data = {
      'NegotiationID': negoID
    };
    this.negoService.getListMessage(this.constants.GETLISTMESSAGE, data).subscribe((response: any) => {
      this.messages = response;
    }, error => {
      console.log(error);
    });
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
      if (this.districts[i].ID == districtID) {
        this.district = this.districts[i].Title;
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
      if (this.wards[i].ID == wardID) {
        this.ward = this.wards[i].Title;
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

  countAmount(quantity, offerPrice, feeShip) {
    this.productAmount = quantity * offerPrice;
    this.totalAmount = Number(this.productAmount) + Number(feeShip);
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

  updateNego(createNegoOrder) {
    if (this.negotiation.address == null) {
      if (createNegoOrder.address == 'oldAddress') {
        this.address = createNegoOrder.oldAddressName;
      } else if (createNegoOrder.address == 'newAddress') {
        this.address = createNegoOrder.newAddressValue + ', ' + this.ward + ', ' + this.district + ', ' + this.city;
      } else {
        this.address = null;
      }
    } else if (this.negotiation.address != null) {
      this.address = document.getElementById('editAddress').innerText;
    }


    let data = {
      'NegotiationID': Number(this.negoID),
      'OfferPrice': Number(createNegoOrder.offerPrice),
      'Quantity': Number(createNegoOrder.quantity),
      'PostShipID': Number(createNegoOrder.postShip),
      'ShippingTime': Number(createNegoOrder.shippingTime),
      'ShipFee': Number(createNegoOrder.feeShip),
      'Remark': createNegoOrder.remark,
      'Address': this.address
    };
    console.log(data);
    this.negoService.updateNegotiationBuyer(this.constants.UPDATENEGOTIATIONBUYER, data).subscribe((response: any) => {
      this.negotiation = response;
      alert('Update success');
    });
  }


  saveAddress(editAddressForm) {
    console.log(editAddressForm);
    if (editAddressForm.editAddress == 'oldAddress') {
      let address = editAddressForm.oldAddressEdit;
      document.getElementById('editAddress').innerHTML = address;
    } else if (editAddressForm.editAddress == 'newAddress') {
      let address = editAddressForm.newAddressEdit + ', ' + this.ward + ', ' + this.district + ', ' + this.city;
      document.getElementById('editAddress').innerHTML = address;
    }

    $('#addressModel').hide();
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  changePostShip(editPostShipForm){
    console.log(editPostShipForm);
    document.getElementById('editShippingMethod').innerHTML = editPostShipForm.editPostShip;
    $('#editShipMethod').hide();
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

}
