import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-buy-tender-list',
  templateUrl: './buy-tender-list.component.html',
  styleUrls: ['./buy-tender-list.component.css']
})
export class BuyTenderListComponent implements OnInit {

  public user;
  public tenderStatus;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.activatedRoute.params.subscribe((params: Params) => {
      this.tenderStatus = params['tenderStatus'];
    });

  }

}
