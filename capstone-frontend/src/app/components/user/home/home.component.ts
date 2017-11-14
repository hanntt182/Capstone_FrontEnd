import { Component, OnInit } from '@angular/core';
import {Constants} from './../../../constants';
import {CatalogService} from "../../../services/catalog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public catalogs;

  constructor(private constants: Constants,
              private catalogService: CatalogService,
              private router: Router) { }

  ngOnInit() {
    this.catalogService.getCatalogs(this.constants.GETLISTCATALOG).subscribe((response: any) =>{
      this.catalogs = response;
    });
  }

  chooseCatalog(catalogId) {
    this.router.navigate(['/catalog/' + catalogId]);
  }

}
