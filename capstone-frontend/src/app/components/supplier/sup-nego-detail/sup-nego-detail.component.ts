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

  private serverUrl = 'http://localhost:8080/SWP49X/socket';
  private title = 'WebSockets chat';
  private stompClient;

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

      let ws = new SockJS(this.serverUrl);
      this.stompClient = Stomp.over(ws);
      let that = this;
      this.stompClient.connect({}, () => {
        that.stompClient.subscribe('/chat/' + this.negoID, (message) => {
          if (message.body) {
            this.messages.push(JSON.parse(message.body));
          }
        });
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
    this.ngOnInit();
  }


  searchNego(searchValue) {
    let data = {
      'SearchValue': searchValue,
      'SupplierID': this.user.userId,
      'Status': this.negoStatus
    };
    this.negoService.searchListNegotiationSupplier(this.constants.SEARCHLISTNEGOTIATIONSUPPLIER, data).subscribe((response: any) => {
      this.negotiations = response;
    });
  }


  sendMessage(sendMessageForm) {
    let data = {
      NegotiationID: this.negoID,
      SenderID: String(this.user.userId),
      Message: sendMessageForm.message
    };
    this.stompClient.send('/app/send/message', {}, JSON.stringify(data));
    document.getElementById('listMessage').scrollTop;
  }

  confirmOrder() {
    let data = {
      'NegotiationID': this.negoID
    };
    this.negoService.confirmNegotiation(this.constants.CONFIRMNEGOTIATION, data).subscribe((response: any) => {
      this.toastr.success(response, 'Success!', {showCloseButton: true});
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  }

  cancelOrder() {
    let data = {
      'NegotiationID': this.negoID
    };
    this.negoService.cancleNegotiation(this.constants.CANCELORDER, data).subscribe((response: any) => {
      alert(response);
    }, error => {
      console.log(error);
    });
  }

}
