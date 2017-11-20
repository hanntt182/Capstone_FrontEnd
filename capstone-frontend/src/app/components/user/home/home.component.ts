import {Component, OnInit} from '@angular/core';
import {Constants} from './../../../constants';
import {CatalogService} from "../../../services/catalog.service";
import {Router} from "@angular/router";
import {TenderService} from "../../../services/tender.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public catalogs;
  public tenders;
  public user;
  public checkBid;
  public myTenderInfo;
  public tender;
  public buyerRateStar;
  public total;

  constructor(private constants: Constants,
              private catalogService: CatalogService,
              private router: Router,
              private tenderService: TenderService) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.catalogService.getCatalogs(this.constants.GETLISTCATALOG).subscribe((response: any) => {
      this.catalogs = response;
    }, error => {
      console.log(error);
    });
    this.tenderService.get5NewTender(this.constants.GET5NEWTENDER).subscribe((response: any) => {
      this.tenders = response;
    }, error => {
      console.log(error);
    });
  }

  chooseCatalog(catalogId) {
    this.router.navigate(['/catalog/' + catalogId]);
  }


}
