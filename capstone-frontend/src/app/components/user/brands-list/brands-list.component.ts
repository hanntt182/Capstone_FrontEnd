import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {CatalogService} from "../../../services/catalog.service";
import {Constants} from './../../../constants';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnInit {
  public catalogId;
  public catalogs;
  public brands;
  constructor(private activatedRoute: ActivatedRoute,
              private catalogService: CatalogService,
              private constants: Constants) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.catalogId = params['catalogId'];
      console.log(this.catalogId);
      this.catalogService.getCatalogs(this.constants.GETLISTCATALOG).subscribe((response: any) => {
        this.catalogs = response;
        for (let i = 0; i < this.catalogs.length; i++) {
          if (this.catalogs[i].catalogId == this.catalogId) {
            this.brands = this.catalogs[i].brands;
          }
        }
      }, error => {
        console.log(error);
      });
    });
  }

}
