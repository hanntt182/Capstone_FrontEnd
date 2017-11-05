import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from "mydatepicker";

@Component({
  selector: 'app-buy-tender-create',
  templateUrl: './buy-tender-create.component.html',
  styleUrls: ['./buy-tender-create.component.css']
})
export class BuyTenderCreateComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };
  public model: any = {date: {year: 2018, month: 10, day: 9}};
  constructor() { }

  ngOnInit() {
  }

}
