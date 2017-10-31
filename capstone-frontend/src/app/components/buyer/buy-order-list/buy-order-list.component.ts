import { Component, OnInit } from '@angular/core';
import {Constants} from './../../../constants';
import {OrderService} from '../../../services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-buy-order-list',
  templateUrl: './buy-order-list.component.html',
  styleUrls: ['./buy-order-list.component.css']
})
export class BuyOrderListComponent implements OnInit {

  public user;
  public orders;
  public innitialPage = 1;
  public pages: any[] = [1];
  public totalPage: number;

  constructor(private constants: Constants,
              private orderService: OrderService,
              private router: Router) { }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.changePage('WAITING', '', this.innitialPage);
  }

  changePage(status, searchValue, page) {
    for (let i = this.pages.length; i > 0; i--) {
      this.pages.pop();
    }
    let data = {
      'BuyerID': this.user.userId,
      'SearchValue': searchValue,
      'Status': status,
      'pageNumber': page
    };
    this.orderService.searchOrderBuyer(this.constants.SEARCHORDERBUYER, data).subscribe((response: any) => {
      this.orders = response.content;
      this.totalPage = response.totalPages;
      for (let i = 1; i <= this.totalPage; i++) {
        this.pages.push(i);
      }
    });
  }

  viewOrderDetail(orderID) {
    this.router.navigate(['/buyer/order-detail/' + orderID]);
  }

}
