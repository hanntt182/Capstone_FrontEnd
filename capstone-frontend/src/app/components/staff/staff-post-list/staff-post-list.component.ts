import { Component, OnInit } from '@angular/core';
import { Constants } from './../../../constants';
import {PostService} from '../../../services/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-staff-post-list',
  templateUrl: './staff-post-list.component.html',
  styleUrls: ['./staff-post-list.component.css']
})
export class StaffPostListComponent implements OnInit {

  public user;
  public posts;
  public innitialPage = 1;
  public pages: any[] = [1];
  public totalPage: number;

  constructor(private constants: Constants,
              private postService: PostService,
              private router: Router) { }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.changePage('WAITING', '', this.innitialPage);
  }

  changePage(status, searchValue, page) {
    for (let i = this.pages.length; i > 0; i--) {
      this.pages.pop();
    }
    let data = {
      'SearchValue': searchValue,
      'Status': status,
      'pageNumber': page
    };
    this.postService.searchPostStaff(this.constants.SEARCHPOSTSTAFF, data).subscribe((response: any) => {
      this.posts = response.content;
      this.totalPage = response.totalPages;
      for (let i = 1; i <= this.totalPage; i++) {
        this.pages.push(i);
      }
    }, error => {
      console.log(error);
    });
  }

  viewPostDetail(postId) {
    console.log(postId);
    this.router.navigate(['/staff/post-detail/' + postId]);
  }

}
