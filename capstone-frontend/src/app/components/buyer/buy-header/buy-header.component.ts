import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NegoService} from "../../../services/nego.service";
import {Constants} from './../../../constants';

@Component({
  selector: 'app-buy-header',
  templateUrl: './buy-header.component.html',
  styleUrls: ['./buy-header.component.css']
})
export class BuyHeaderComponent implements OnInit {

  public user;
  public negoID;

  constructor(private router: Router,
              private negoService: NegoService,
              private constants: Constants) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }


  }

  gotoNegoDetail(status) {
    let data = {
      'SearchValue': '',
      'BuyerID': this.user.userId,
      'Status': status
    };
    this.negoService.searchListNegotiationBuyer(this.constants.SEARCHLISTNEGOTIATIONBUYER, data).subscribe((response: any) => {
      this.negoID = response[0].negotiationID;
      this.router.navigate(['/buyer/negotiation/' + status + '/' + this.negoID]);
    }, error => {
      console.log(error);
      if (error._body == 'NEGOTIATION LIST NOT FOUND') {
        this.negoID = 0;
        this.router.navigate(['/buyer/negotiation/' + status + '/' + this.negoID]);
      }
    });
  }

}
