import {Component, OnInit} from '@angular/core';
import {Constants} from './../../../constants';
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-sup-post-list',
  templateUrl: './sup-post-list.component.html',
  styleUrls: ['./sup-post-list.component.css']
})
export class SupPostListComponent implements OnInit {

  public user;
  public posts;
  public innitialPage = 1;
  public pages: any[] = [1];
  public totalPage: number;

  constructor(private constants: Constants,
              private postService: PostService) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.changePage('APPROVED', '', this.innitialPage);
  }

  changePage(status, searchValue, page) {
    for (let i = this.pages.length; i > 0; i--) {
      this.pages.pop();
    }
    let data = {
      'SupplierID': this.user.userId,
      'SearchValue': searchValue,
      'Status': status,
      'pageNumber': page
    };
    console.log(data);
    this.postService.searchPostSupplier(this.constants.SEARCHPOSTSUPPLIER, data).subscribe((response: any) => {
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
