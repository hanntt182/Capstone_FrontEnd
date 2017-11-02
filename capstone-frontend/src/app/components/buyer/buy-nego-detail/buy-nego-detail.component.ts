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
  public model1 = Date.now();
  public negoID;
  public negotiation;
  public user;
  public messages;

  constructor(private activatedRoute: ActivatedRoute,
              private negoService: NegoService,
              private constants: Constants) {
  }

  ngOnInit() {

    console.log(this.model);
    console.log(this.model1);

    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

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
    let data = {
      'NegotiationID': this.negoID,
      'SenderID': this.user.userId,
      'Message': sendMessageForm.message
    };
    this.negoService.sendMessage(this.constants.SENDMESSAGE, data).subscribe((response: any) => {
      this.messages = response;
    }, error => {
      console.log(error);
    });
  }

}
