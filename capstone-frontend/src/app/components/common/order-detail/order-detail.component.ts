import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Constants} from './../../../constants';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {OrderService} from "../../../services/order.service";
import {CommonService} from "../../../services/common.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  public orderID;
  public order;
  public user;
  public shippingMinTime;
  public shippingMaxTime;

  constructor(private constants: Constants,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private router: Router,
              private commonService: CommonService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.orderID = params['orderId'];
    });

    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    let data = {
      'OrderID': this.orderID
    };
    this.orderService.viewOrderDetail(this.constants.VIEWORDERDETAIL, data).subscribe((response: any) => {
      this.order = response;
      if (this.order.post != null) {
        for (let i = 0; i < response.post.postShips.length; i++) {
          if (response.post.postShips[i].postShipID.ship.shipID == response.ship.shipID) {
            this.shippingMinTime = response.post.postShips[i].shippingMinTime;
            this.shippingMaxTime = response.post.postShips[i].shippingMaxTime;
          }
        }
      } else if (this.order.deal != null) {
        for (let i = 0; i < response.deal.dealShips.length; i++) {
          if (response.deal.dealShips[i].dealShipID.ship.shipID == response.ship.shipID) {
            this.shippingMinTime = response.deal.dealShips[i].shippingMinTime;
            this.shippingMaxTime = response.deal.dealShips[i].shippingMaxTime;
          }
        }
      }

    }, error => {
      console.log(error);
    });
  }

  confirmOrder() {
    let data = {
      'OrderID': this.orderID
    };
    this.orderService.confirmOrder(this.constants.CONFIRMORDER, data).subscribe((response: any) => {
      this.toastr.success(response, 'Success!', {showCloseButton: true});
      setTimeout(() => {
        this.router.navigate(['/supplier/order-list/paying']);
      }, 1000);
    }, error => {
      console.log(error);
    });
  }

  cancelOrder() {
    let data = {
      'UserID': this.user.userId,
      'OrderID': this.orderID
    };
    this.orderService.cancelOrder(this.constants.CANCELORDER, data).subscribe((response: any) => {
      if (this.user.role == 'BUYER') {
        this.toastr.success(response, 'Success!', {showCloseButton: true});
        setTimeout(() => {
          this.router.navigate(['/buyer/order-list/cancelled']);
        }, 1000);
      } else if (this.user.role == 'SUPPLIER') {
        this.toastr.success(response, 'Success!', {showCloseButton: true});
        setTimeout(() => {
          this.router.navigate(['/supplier/order-list/cancelled']);
        }, 1000);
      }
    }, error => {
      console.log(error);
      this.toastr.error(error._body, 'Fail!', {showCloseButton: true});
    });
  }

  paymentOrder() {
    this.router.navigate(['buyer/payment/' + this.orderID]);
  }


  confirmShipping(confirmShippingForm) {
    let data = {
      'OrderID': this.orderID,
      'ReceiptCode': confirmShippingForm.receiptCode
    };
    this.orderService.confirmShipping(this.constants.CONFIRMSHIPPING, data).subscribe((response: any) => {
      this.toastr.success(response, 'Success!', {showCloseButton: true});
      setTimeout(() => {
        this.router.navigate(['/supplier/order-list/success']);
      }, 1000);
    }, error => {
      console.log(error);
      this.toastr.error(error._body, 'Fail!', {showCloseButton: true});
    });
  }

}
