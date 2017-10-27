import { Component, OnInit } from '@angular/core';
import {CatalogService} from "../../../services/catalog.service";
import {Constants} from './../../../constants';
import {Router} from "@angular/router";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-sup-post-create-1',
  templateUrl: './sup-post-create-1.component.html',
  styleUrls: ['./sup-post-create-1.component.css']
})
export class SupPostCreate1Component implements OnInit {
public catalogs;
  constructor(private catalogService: CatalogService,
              private constants: Constants,
              private router: Router,
              private commonService: CommonService) { }

  ngOnInit() {
    this.catalogService.getCatalogs(this.constants.GETLISTCATALOG).subscribe((response: any) => {
      this.catalogs = response;
    });
  }

  changeToCreate2(createPost1Form) {
    let data = createPost1Form.catalog;
    this.commonService.setCatalogID(data);
    this.router.navigate(['supplier/create-post2']);
  }

}
