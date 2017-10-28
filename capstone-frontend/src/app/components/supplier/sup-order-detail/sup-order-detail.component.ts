import {Component, OnInit} from '@angular/core';
import {Constants} from './../../../constants';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OrderService} from '../../../services/order.service';
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-sup-order-detail',
  templateUrl: './sup-order-detail.component.html',
  styleUrls: ['./sup-order-detail.component.css']
})
export class SupOrderDetailComponent implements OnInit {

  public orderID;
  public order;
  public user;

  constructor(private constants: Constants,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private router: Router,
              private commonService: CommonService) {
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
      this.order = JSON.parse(response);
    });
  }

  confirmOrder(confirmOrderForm) {
    let data = {
      'OrderID': this.orderID,
      'ShippingTime': confirmOrderForm.shippingTime
    };
    this.orderService.confirmOrder(this.constants.CONFIRMORDER, data).subscribe((response: any) => {
      alert(response);
      this.router.navigate(['/supplier/order-list']);
    });
  }

  cancelOrder() {
    let data = {
      'UserID': this.user.userId,
      'OrderID': this.orderID
    };
    console.log(data);
    /*this.orderService.cancleOrder(this.constants.CANCELORDER, data).subscribe((response: any) => {
      alert(response);
      this.router.navigate(['/supplier/order-list']);
    }, error => {
      console.log(error);
    });*/
  }

}
