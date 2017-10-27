import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CatalogService} from "../../../services/catalog.service";
import {Constants} from './../../../constants';
import {PostService} from "../../../services/post.service";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnInit {
  public catalogId;
  public catalogs;
  public brands;
  public posts;
  public innitialPage = 1;
  public pages: any[] = [1];
  public totalPage: number;

  constructor(private activatedRoute: ActivatedRoute,
              private catalogService: CatalogService,
              private constants: Constants,
              private postService: PostService,
              private commonService: CommonService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.catalogId = params['catalogId'];
      this.catalogService.getCatalogs(this.constants.GETLISTCATALOG).subscribe((response: any) => {
        this.catalogs = response;
        for (let i = 0; i < this.catalogs.length; i++) {
          if (this.catalogs[i].catalogId == this.catalogId) {
            this.brands = this.catalogs[i].brands;
            this.showListPost(this.brands[0].brandId, this.innitialPage);
          }
        }
      }, error => {
        console.log(error);
      });
    });
  }

  createOrder(postID){
    this.router.navigate(['/create-order/' + postID]);
  }

  changePage(page) {
    this.showListPost(this.commonService.getBrandID(), page);
  }

  showListPost(brandID, pageNumber) {
    for (let i = this.pages.length; i > 0; i--) {
      this.pages.pop();
    }
    let data = {
      'BrandID': brandID,
      'CatalogID': this.catalogId,
      'pageNumber': pageNumber
    };
    this.postService.getListPost(this.constants.GETLISTPOST, data).subscribe((response: any) => {
      this.posts = response.content;
      this.totalPage = response.totalPages;
      for (let i = 1; i <= this.totalPage; i++) {
        this.pages.push(i);
      }
    }, error => {
      console.log(error);
    });
    this.commonService.setBrandID(brandID);
  }

}
