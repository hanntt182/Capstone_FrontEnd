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
      for (let i = 0; i < response.post.postShips.length; i++) {
        if (response.post.postShips[i].postShipID.ship.shipID == response.ship.shipID) {
          this.shippingMinTime = response.post.postShips[i].shippingMinTime;
          this.shippingMaxTime = response.post.postShips[i].shippingMaxTime;
        }
      }
    }, error => {
      console.log(error);
    });
  }

  confirmOrder(confirmOrderForm) {
    let data = {
      'OrderID': this.orderID,
      'ShippingTime': confirmOrderForm.shippingTime
    };
    this.orderService.confirmOrder(this.constants.CONFIRMORDER, data).subscribe((response: any) => {
      alert(response);
      this.router.navigate(['/supplier/order-list/paying']);
    }, error => {
      console.log(error);
    });
  }

  cancelOrder() {
    let data = {
      'UserID': this.user.userId,
      'OrderID': this.orderID
    };
    console.log(data);
    this.orderService.cancleOrder(this.constants.CANCELORDER, data).subscribe((response: any) => {
      alert(response);
      if (this.user.role == 'BUYER') {
        this.toastr.success(response, 'Success!', {showCloseButton: true});
        this.router.navigate(['/buyer/order-list/cancel']);
      } else if (this.user.role == 'SUPPLIER') {
        this.toastr.success(response, 'Success!', {showCloseButton: true});
        this.router.navigate(['/supplier/order-list/cancel']);
      }
    }, error => {
      console.log(error);
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
      this.router.navigate(['/supplier/order-list/success']);
    }, error => {
      console.log(error);
      alert(error._body);
    });
  }

}
