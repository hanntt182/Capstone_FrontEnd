import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NegoService} from '../../../services/nego.service';
import {Constants} from './../../../constants';
import {OrderService} from '../../../services/order.service';
import {ToastsManager} from 'ng2-toastr';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';


@Component({
  selector: 'app-sup-nego-detail',
  templateUrl: './sup-nego-detail.component.html',
  styleUrls: ['./sup-nego-detail.component.css']
})
export class SupNegoDetailComponent implements OnInit, OnDestroy {

  public negoID;
  public negoStatus;
  public user;
  public negotiation;
  public negotiations;
  public messages;
  public productAmount;
  public totalAmount;
  public xInterval;

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
      let data = {
        'NegotiationID': this.negoID
      };
      this.negoService.viewNegotiationDetail(this.constants.VIEWNEGOTIATIONDETAIL, data).subscribe((response: any) => {
        this.negotiation = response;
        this.productAmount = response.quantity * response.offerPrice;
        this.totalAmount = this.productAmount + response.shipPrice;
      });
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
      console.log(this.stompClientNegoDetail);
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
            //this.messages.push(JSON.parse(message.body));
            //console.log(message.body);
          }
        }, {id: this.user.userId});
      });

    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.negoStatus = params['negoStatus'];
      this.searchNego('');
    });

  }

  ngOnDestroy() {
    /*clearInterval(this.xInterval);*/
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


  changeNego(negoID) {
    this.router.navigate(['/supplier/negotiation/' + this.negoStatus + '/' + negoID]);
  }

  clearSearch(searchValue) {
    if (searchValue == '') {
      this.searchNego('');
    }
  }


  searchNego(searchValue) {
    let data = {
      'SearchValue': searchValue,
      'SupplierID': this.user.userId,
      'Status': this.negoStatus
    };
    this.negoService.searchListNegotiationSupplier(this.constants.SEARCHLISTNEGOTIATIONSUPPLIER, data).subscribe((response: any) => {
      this.negotiations = response;
    }, error => {
      console.log(error);
    });
  }


  sendMessage(sendMessageForm) {
    let data = {
      NegotiationID: this.negoID,
      SenderID: String(this.user.userId),
      Message: sendMessageForm.message
    };
    this.stompClient.send('/app/send/message', {}, JSON.stringify(data));
  }

  confirmOrder() {
    let data = {
      'NegotiationID': this.negoID
    };
    this.negoService.confirmNegotiation(this.constants.CONFIRMNEGOTIATION, data).subscribe((response: any) => {
      this.toastr.success(response, 'Success!', {showCloseButton: true});
      setTimeout( () => {
        this.router.navigate(['/supplier/order-list/paying']);
      }, 1000);
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  }

  cancelOrder() {
    let data = {
      'UserID': this.user.userId,
      'NegotiationID': Number(this.negoID)
    };
    this.negoService.cancleNegotiation(this.constants.CANCELORDER, data).subscribe((response: any) => {
      this.toastr.success(response, 'Success!', {showCloseButton: true});
      //alert(response);
    }, error => {
      console.log(error);
    });
  }

}
