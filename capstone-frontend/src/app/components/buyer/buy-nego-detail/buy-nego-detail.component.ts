import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NegoService} from '../../../services/nego.service';
import {Constants} from './../../../constants';
import {OrderService} from '../../../services/order.service';
import * as $ from 'jquery';
import {CommonService} from '../../../services/common.service';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-buy-nego-detail',
  templateUrl: './buy-nego-detail.component.html',
  styleUrls: ['./buy-nego-detail.component.css']
})
export class BuyNegoDetailComponent implements OnInit, OnDestroy {


  public negoID;
  public negoStatus;
  public negotiation;
  public negotiations;
  public user;
  public messages;
  public productAmount;
  public totalAmount;
  public addresses;
  public cities;
  public districts;
  public wards;
  public city;
  public district;
  public ward;
  public address;
  public shipID;
  public setDisabledNew = false;
  public setDisabledOld = false;

  //Socket for Message
  //private serverUrl = 'http://localhost:8080/SWP49X/socket';
  private stompClient = null;

  //Socket for Nego Detail
  //private serverNegoDetailUrl = 'http://localhost:8080/SWP49X/negotiation';
  private stompClientNegoDetail = null;

  constructor(private activatedRoute: ActivatedRoute,
              private negoService: NegoService,
              private constants: Constants,
              private orderService: OrderService,
              private router: Router,
              private commonService: CommonService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }


  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.activatedRoute.params.subscribe((params: Params) => {
      this.negoID = params['negoId'];
      this.negoStatus = params['negoStatus'];
      this.searchNego('');
      this.viewNegoDetail(this.negoID);
      this.getMessage(this.negoID);

      //Socket for Message
      if (this.stompClient != null) {
        if (this.stompClient.ws.url == this.constants.SOCKETMESSAGE) {
          this.stompClient.disconnect();
        }
      }

      let ws = new SockJS(this.constants.SOCKETMESSAGE);
      this.stompClient = Stomp.over(ws);
      this.stompClient.connect({}, () => {
        this.stompClient.subscribe('/chat/' + this.negoID, (message) => {
          if (message.body) {
            this.messages.push(JSON.parse(message.body));
            console.log(message.body);
          }
        }, {id: this.user.userId});
      });


      //Socket for Nego Detail
      if (this.stompClientNegoDetail != null) {
        if (this.stompClientNegoDetail.ws.url == this.constants.SOCKETNEGO) {
          this.stompClientNegoDetail.disconnect();
        }
      }

      let wsNego = new SockJS(this.constants.SOCKETNEGO);
      this.stompClientNegoDetail = Stomp.over(wsNego);
      this.stompClientNegoDetail.connect({}, () => {
        this.stompClientNegoDetail.subscribe('/negotiation/' + this.negoID, (negotiation) => {
          if (negotiation.body) {
            this.negotiation = JSON.parse(negotiation.body);
            this.countAmount(this.negotiation.quantity, this.negotiation.offerPrice, this.negotiation.shipPrice);
            //this.messages.push(JSON.parse(message.body));
            //console.log(message.body);
          }
        }, {id: this.user.userId});
      });
    });

    this.addresses = this.user.address;

    this.commonService.getListCity(this.constants.GETLISTCITY).subscribe((response: any) => {
      this.cities = response.LtsItem;
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy() {
  }

  viewNegoDetail(negoID) {
    let data = {
      'NegotiationID': negoID
    };
    this.negoService.viewNegotiationDetail(this.constants.VIEWNEGOTIATIONDETAIL, data).subscribe((response: any) => {
      this.negotiation = response;
      this.countAmount(response.quantity, response.offerPrice, response.shipPrice);
    });
  }

  checkAddress(e, createOrderForm) {
    if (e.target.value == 'newAddress') {
      this.setDisabledOld = true;
      this.setDisabledNew = false;
      createOrderForm.controls['oldAddressName'].setValue('');
    } else if (e.target.value == 'oldAddress') {
      this.setDisabledOld = false;
      this.setDisabledNew = true;
      createOrderForm.controls['newAddressCity'].setValue('');
      createOrderForm.controls['newAddressDistrict'].setValue('');
      createOrderForm.controls['newAddressWard'].setValue('');
      createOrderForm.controls['newAddressValue'].setValue('');
    }
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
  }

  clearSearch(searchValue) {
    if (searchValue == '') {
      this.searchNego('');
    }
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
      NegotiationID: this.negoID,
      SenderID: String(this.user.userId),
      Message: sendMessageForm.message
    };
    this.stompClient.send('/app/send/message', {}, JSON.stringify(data));
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

    if (this.negotiation.ship == null) {
      this.shipID = createNegoOrder.postShip;
    } else if (this.negotiation.ship != null) {
      for (let i = 0; i < this.negotiation.post.postShips.length; i++) {
        if (this.negotiation.post.postShips[i].postShipID.ship.shipName == document.getElementById('editShippingMethod').innerText) {
          this.shipID = this.negotiation.post.postShips[i].postShipID.ship.shipID;
        }
      }
    }

    let data = {
      'NegotiationID': Number(this.negoID),
      'OfferPrice': Number(createNegoOrder.offerPrice),
      'Quantity': Number(createNegoOrder.quantity),
      'ShipID': this.shipID,
      'ShippingTime': Number(createNegoOrder.shippingTime),
      'ShipFee': Number(createNegoOrder.feeShip),
      'Remark': createNegoOrder.remark,
      'Address': this.address
    };
    this.negoService.updateNegotiationBuyer(this.constants.UPDATENEGOTIATIONBUYER, data).subscribe((response: any) => {
      console.log(response);
      this.toastr.success('Update successfully!', 'Success!', {showCloseButton: true});
    }, error => {
      this.toastr.error('This Negotiation has been confirmed. You can not update', 'Fail!', {showCloseButton: true});
      this.router.navigate(['/buyer/negotiation/finished/' + this.negoID]);
      this.viewNegoDetail(this.negoID);
      console.log(error);
    });
  }


  saveAddress(editAddressForm) {
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

  changePostShip(editPostShipForm) {
    document.getElementById('editShippingMethod').innerHTML = editPostShipForm.editPostShip;
    $('#editShipMethod').hide();
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  // payNegoOrder() {
  //   this.router.navigate(['/buyer/payment-nego/' + this.negoID]);
  // }


  cancelOrder() {
    let data = {
      'UserID': this.user.userId,
      'NegotiationID': this.negoID
    };
    this.negoService.cancleNegotiation(this.constants.CANCELORDER, data).subscribe((response: any) => {
      alert(response);
    }, error => {
      console.log(error);
    });
  }

}
