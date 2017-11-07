import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {TenderService} from "../../../services/tender.service";
import {Constants} from './../../../constants';
import {now} from "moment";

@Component({
  selector: 'app-tender-detail',
  templateUrl: './tender-detail.component.html',
  styleUrls: ['./tender-detail.component.css']
})
export class TenderDetailComponent implements OnInit, OnDestroy {

  public tenderID;
  public tender;
  public starsCount: number = 3.456789;
  public now;
  public closedDay;
  public distance;
  public xInterval;
  public user;

  constructor(private activatedRoute: ActivatedRoute,
              private tenderService: TenderService,
              private constants: Constants) {

  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.activatedRoute.params.subscribe((params: Params) => {
      this.tenderID = params['tenderId'];
      let data = {
        'TenderID': this.tenderID
      };
      this.tenderService.viewTenderDetail(this.constants.VIEWTENDERDETAIL, data).subscribe((response: any) => {
        this.tender = response;
        this.starsCount = response.buyer.rate;
        this.closedDay = response.closedDay;
        if (response.status.statusName == 'ACTIVE') {
          this.xInterval = setInterval(() => {
            this.now = Date.now();
            this.distance = Date.parse(this.closedDay) - this.now;

            let days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

            // Output the result in an element with id='demo'
            document.getElementById('countdown').innerHTML = days + 'd ' + hours + 'h '
              + minutes + 'm ' + seconds + 's ';
            if (this.distance < 0) {
              clearInterval(this.xInterval);
              document.getElementById('countdown').innerHTML = 'FINISHED';
            }
          }, 1000);
        }
        if (response.status.statusName != 'ACTIVE') {
          clearInterval(this.xInterval);
        }
      });
    });
  }

  cancleTender(cancelForm) {
    let data = {
      'TenderID': this.tenderID,
      'Reason': cancelForm.reason
    };
    console.log(data);
    this.tenderService.cancleTender(this.constants.CANCLETENDER, data).subscribe((response: any) => {
      alert(response);
    }, error => {
      console.log(error);
    });

  }

  ngOnDestroy() {
    clearInterval(this.xInterval);
  }

}
