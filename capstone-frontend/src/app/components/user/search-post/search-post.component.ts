import {Component, OnInit} from '@angular/core';
import {PostService} from '../../../services/post.service';
import {Constants} from './../../../constants';
import {CommonService} from '../../../services/common.service';
import {ActivatedRoute, Params} from "@angular/router";
import {post} from "selenium-webdriver/http";

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.css']
})
export class SearchPostComponent implements OnInit {

  public posts;
  public innitialPage = 1;
  public pages: any[] = [1];
  public totalPage: number;
  public searchValue;

  constructor(private postService: PostService,
              private constants: Constants,
              private commonService: CommonService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.searchValue = params['searchValue'];
      this.changePage(this.innitialPage);
    });
    this.searchValue = this.commonService.getSearchValue();
  }

  changePage(page) {
    for (let i = this.pages.length; i > 0; i--) {
      this.pages.pop();
    }
    let data = {
      'SearchValue': this.searchValue,
      'pageNumber': page
    };
    this.postService.searchPost(this.constants.SEARCHPOST, data).subscribe((response: any) => {
      this.posts = response.content;
      console.log(this.posts);
      this.totalPage = response.totalPages;
      for (let i = 1; i <= this.totalPage; i++) {
        this.pages.push(i);
      }
    }, error => {
      console.log(error);
    });
  }

}
