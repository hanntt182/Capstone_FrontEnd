import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {NegoService} from "../../../services/nego.service";
import {Constants} from './../../../constants';
import {LoginService} from "../../../services/login.service";
import {ToastsManager} from "ng2-toastr";
import {NotificationService} from "../../../services/notification.service";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Component({
  selector: 'app-buy-header',
  templateUrl: './buy-header.component.html',
  styleUrls: ['./buy-header.component.css']
})
export class BuyHeaderComponent implements OnInit {

  public user;
  public negoID;
  public count;
  public notifications = [];
  private serverNotiUrl = 'http://localhost:8080/SWP49X/notify';
  private stompClientNoti = null;

  constructor(private router: Router,
              private negoService: NegoService,
              private constants: Constants,
              private loginService: LoginService,
              private notificationService: NotificationService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
    if (this.user != null) {
      this.connectSocket(this.user.userId);
    }
  }

  connectSocket(userID) {
    this.getCountAndListNotification(userID);
    if (this.stompClientNoti != null) {
      if (this.stompClientNoti.ws.url == this.serverNotiUrl) {
        this.stompClientNoti.disconnect();
      }
    }
    let ws = new SockJS(this.serverNotiUrl);
    this.stompClientNoti = Stomp.over(ws);
    this.stompClientNoti.connect({}, () => {
      this.stompClientNoti.subscribe('/notify/' + userID, (notify) => {
        if (notify.body) {
          this.notifications.push(JSON.parse(notify.body));
          this.count += 1;
        }
      }, {id: userID});
    });
  }

  getCountAndListNotification(userID) {
    let data = {
      'UserID': userID
    };
    this.notificationService.getListNotification(this.constants.GETLISTNOTIFICATION, data).subscribe((response: any) => {
      this.notifications = response;
    });
    this.notificationService.countNotification(this.constants.COUNTNOTIFICATION, data).subscribe((response: any) => {
      this.count = response;
    });
  }

  seenNotification(notiID) {
    let data = {
      'NotificationID': notiID
    };
    this.notificationService.updateNotification(this.constants.UPDATENOTIFICATION, data).subscribe((response: any) => {
      console.log(response);
      this.getCountAndListNotification(this.user.userId);
    });
  }

  gotoNoti(type, status, typeID) {
    if (type == 'ORDER') {
      this.router.navigate(['/' + this.user.role.toLowerCase() + '/order-list/' + status.toLowerCase()]);
    } else if (type == 'TENDER') {
      this.router.navigate(['/' + this.user.role.toLowerCase() + '/tender-list/' + status.toLowerCase()]);
    } else if (type == 'DEAL') {
      this.router.navigate(['/' + this.user.role.toLowerCase() + '/deal-list/' + status.toLowerCase()]);
    } else if (type == 'NEGOTIATION') {
      this.router.navigate(['/' + this.user.role.toLowerCase() + '/negotiation/' + status.toLowerCase() + '/' + typeID]);
    } else if (type == 'POST') {
      this.router.navigate(['/' + this.user.role.toLowerCase() + '/post-list/' + status.toLowerCase()]);
    }

  }

  resetCount() {
    let data = {
      'UserID': this.user.userId
    };
    this.notificationService.resetCount(this.constants.RESETCOUNT, data).subscribe((response: any) => {
      console.log(response);
      this.getCountAndListNotification(this.user.userId);
    }, error => {
      console.log(error);
    });
  }

  logout() {
    this.user = null;
    this.loginService.setLogin(false);
    localStorage.removeItem('currentUser');
    if (this.stompClientNoti != null) {
      if (this.stompClientNoti.ws.url == this.serverNotiUrl) {
        this.stompClientNoti.disconnect();
      }
    }
    this.toastr.success('Logged out!!!', 'Success!', {showCloseButton: true});
    setTimeout( () => {
      this.router.navigate(['/home']);
    }, 1000);
  }

  gotoNegoDetail(status) {
    let data = {
      'SearchValue': '',
      'BuyerID': this.user.userId,
      'Status': status
    };
    this.negoService.searchListNegotiationBuyer(this.constants.SEARCHLISTNEGOTIATIONBUYER, data).subscribe((response: any) => {
      this.negoID = response[0].negotiationID;
      this.router.navigate(['/buyer/negotiation/' + status + '/' + this.negoID]);
    }, error => {
      console.log(error);
      if (error._body == 'NEGOTIATION LIST NOT FOUND') {
        this.negoID = 0;
        this.router.navigate(['/buyer/negotiation/' + status + '/' + this.negoID]);
      }
    });
  }

}
