import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NegoService} from '../../../services/nego.service';
import {Constants} from './../../../constants';

@Component({
  selector: 'app-sup-header',
  templateUrl: './sup-header.component.html',
  styleUrls: ['./sup-header.component.css']
})
export class SupHeaderComponent implements OnInit {

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
      'SupplierID': this.user.userId,
      'Status': status
    };
    this.negoService.searchListNegotiationSupplier(this.constants.SEARCHLISTNEGOTIATIONSUPPLIER, data).subscribe((response: any) => {
      this.negoID = 1;
      this.router.navigate(['/supplier/negotiation/' + status + '/' + this.negoID]);
    }, error => {
      console.log(error);
      if (error._body == 'NEGOTIATION LIST NOT FOUND') {
        this.negoID = 0;
        this.router.navigate(['/supplier/negotiation/' + status + '/' + this.negoID]);
      }
    });
  }

}
