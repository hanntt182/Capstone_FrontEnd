import {Component, OnInit} from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {ActivatedRoute, Params} from "@angular/router";
import {NegoService} from "../../../services/nego.service";
import {Constants} from './../../../constants';

@Component({
  selector: 'app-buy-nego-detail',
  templateUrl: './buy-nego-detail.component.html',
  styleUrls: ['./buy-nego-detail.component.css']
})
export class BuyNegoDetailComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };
  public model: any = {date: {year: 2018, month: 10, day: 9}};
  public negoID;
  public negotiation;

  constructor(private activatedRoute: ActivatedRoute,
              private negoService: NegoService,
              private constants: Constants) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.negoID = params['negoId'];
    });
    let data = {
      'NegotiationID': this.negoID
    };
    this.negoService.viewNegotiationDetail(this.constants.VIEWNEGOTIATIONDETAIL, data).subscribe((response: any) => {
      this.negotiation = response;
    });
  }


  sendMessage(sendMessageForm) {

  }

}
