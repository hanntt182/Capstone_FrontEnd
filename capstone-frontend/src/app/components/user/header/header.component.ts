import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Constants} from './../../../constants';
import {LoginService} from '../../../services/login.service';
import {Router} from '@angular/router';
import {CatalogService} from '../../../services/catalog.service';
import {ToastsManager} from "ng2-toastr";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user;
  public catalogs;
  public posts;
  public brandId;
  public notifications = [];
  public count = 0;

  //private serverNotiUrl = 'http://localhost:8080/SWP49X/notify';
  private stompClientNoti = null;

  constructor(private constants: Constants,
              private loginService: LoginService,
              private catalogService: CatalogService,
              private notificationService: NotificationService,
              private router: Router,
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
    this.catalogService.getCatalogs(this.constants.GETLISTCATALOG).subscribe((response: any) => {
      this.catalogs = response;
    });
    console.log(this.notifications);
  }

  connectSocket(userID) {
    this.getCountAndListNotification(userID);
    if (this.stompClientNoti != null) {
      if (this.stompClientNoti.ws.url == this.constants.SOCKETNOTIFY) {
        this.stompClientNoti.disconnect();
      }
    }
    let ws = new SockJS(this.constants.SOCKETNOTIFY);
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
    }, error => {
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

  login(loginValue) {
    let data = {
      'Email': loginValue.email,
      'Password': loginValue.password
    };
    this.loginService.login(this.constants.LOGIN, data).subscribe((response: any) => {
      if (response) {
        this.loginService.setLogin(true);
        this.loginService.setUser(response);
        this.user = this.loginService.getUser();
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        document.getElementById('openModalButton').click();
        this.connectSocket(this.user.userId);
        this.toastr.success('Login successfully!', 'Success!', {showCloseButton: true});
      }
    }, error => {
      this.toastr.error(error._body, 'Please try again!', {showCloseButton: true});
    });
  }

  logout() {
    this.user = null;
    this.loginService.setLogin(false);
    localStorage.removeItem('currentUser');
    if (this.stompClientNoti != null) {
      if (this.stompClientNoti.ws.url == this.constants.SOCKETNOTIFY) {
        this.stompClientNoti.disconnect();
      }
    }
    this.toastr.success('Logged out!!!', 'Success!', {showCloseButton: true});
  }

  chooseCatalog(catalogId) {
    /*this.catalogService.getCatalogs(this.constants.GETLISTCATALOG).subscribe((response: any) => {
      this.catalogs = response;
      for (let i = 0; i < this.catalogs.length; i++) {
        if (this.catalogs[i].catalogId == catalogId) {
          this.brandId = this.catalogs[i].brands[0].brandId;
          console.log(this.brandId);
          this.router.navigate(['/product/' + catalogId + '/' + this.brandId]);
        }
      }
    }, error => {
      console.log(error);
    });*/

    let data = {
      'CatalogID': catalogId
    };
    this.catalogService.getListBrandByCatalog(this.constants.GETLISTBRANDBYCATALOG, data).subscribe((response: any) => {
      this.brandId = response[0].brandId;
      this.router.navigate(['/product/' + catalogId + '/' + this.brandId]);
    }, error => {
      console.log(error);
    });

  }

  search(searchForm) {
    this.router.navigate(['/search/' + searchForm.search]);
  }
}
