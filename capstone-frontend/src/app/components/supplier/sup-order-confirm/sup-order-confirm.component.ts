import {Component, OnInit} from '@angular/core';
import {Constants} from './../../../constants';
import {OrderService} from "../../../services/order.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-sup-order-confirm',
  templateUrl: './sup-order-confirm.component.html',
  styleUrls: ['./sup-order-confirm.component.css']
})
export class SupOrderConfirmComponent implements OnInit {

  public orderID;

  constructor(private constants: Constants,
              private orderService: OrderService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.orderID = params['orderId'];
    });
  }

  confirmOrder(confirmOrderForm) {
    let data = {
      'OrderID': this.orderID,
      'ShippingTime': confirmOrderForm.ShippingTime
    };
    this.orderService.confirmOrder(this.constants.CONFIRMORDER, data).subscribe((response: any) => {
      alert(response);
      this.router.navigate(['/supplier/order-list']);
    });
  }

}
