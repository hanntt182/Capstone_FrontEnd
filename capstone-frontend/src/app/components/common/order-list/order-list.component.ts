import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Constants} from './../../../constants';
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  public user;
  public orders;
  public totalPage;
  public orderStatus;
  public pages: any[] = [1];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private constants: Constants,
              private orderService: OrderService) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.activatedRoute.params.subscribe((params: Params) => {
      this.orderStatus = params['orderStatus'];
      this.changePage('', 1);
    });
  }

  changeStatus(status) {
    if (this.user.role == 'BUYER') {
      this.router.navigate(['/buyer/order-list/' + status]);
    } else if (this.user.role == 'SUPPLIER') {
      this.router.navigate(['/supplier/order-list/' + status]);
    }
  }

  changePage(searchValue, pageNumber) {
    for (let i = this.pages.length; i > 0; i--) {
      this.pages.pop();
    }
    if (this.user.role == 'BUYER') {
      let data = {
        'BuyerID': this.user.userId,
        'SearchValue': searchValue,
        'Status': this.orderStatus,
        'pageNumber': pageNumber
      };
      this.orderService.searchOrderBuyer(this.constants.SEARCHORDERBUYER, data).subscribe((response: any) => {
        this.orders = response.content;
        this.totalPage = response.totalPages;
        for (let i = 1; i <= this.totalPage; i++) {
          this.pages.push(i);
        }
      });
    } else if (this.user.role == 'SUPPLIER') {
      let data = {
        'SupplierID': this.user.userId,
        'SearchValue': searchValue,
        'Status': this.orderStatus,
        'pageNumber': pageNumber
      };
      this.orderService.searchOrderSupplier(this.constants.SEARCHORDERSUPPLIER, data).subscribe((response: any) => {
        this.orders = response.content;
        this.totalPage = response.totalPages;
        for (let i = 1; i <= this.totalPage; i++) {
          this.pages.push(i);
        }
      });
    }
  }

  viewOrderDetail(orderID) {
    if(this.user.role == 'BUYER'){
      this.router.navigate(['/buyer/order-detail/' + orderID]);
    } else if (this.user.role == 'SUPPLIER'){
      this.router.navigate(['/supplier/order-detail/' + orderID]);
    }
  }
}
