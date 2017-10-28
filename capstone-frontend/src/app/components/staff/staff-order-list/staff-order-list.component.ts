import {Component, OnInit} from '@angular/core';
import {Constants} from './../../../constants';
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-staff-order-list',
  templateUrl: './staff-order-list.component.html',
  styleUrls: ['./staff-order-list.component.css']
})
export class StaffOrderListComponent implements OnInit {

  public user;
  public orders;
  public innitialPage = 1;
  public pages: any[] = [1];
  public totalPage: number;

  constructor(private constants: Constants,
              private orderService: OrderService) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.changePage('SUCCESS', '', this.innitialPage);
  }

  changePage(status, searchValue, page) {
    for (let i = this.pages.length; i > 0; i--) {
      this.pages.pop();
    }
    let data = {
      'SearchValue': searchValue,
      'Status': status,
      'pageNumber': page
    };
    this.orderService.searchOrder(this.constants.SEARCHORDER, data).subscribe((response: any) => {
      this.orders = response.content;
      this.totalPage = response.totalPages;
      for (let i = 1; i <= this.totalPage; i++) {
        this.pages.push(i);
      }
    });
  }

}
