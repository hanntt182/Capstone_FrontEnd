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

  constructor(private constants: Constants,
              private postService: PostService) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
    let data = {
      'SupplierID' : this.user.userId,
      'Status' : 'PENDIND',
      'pageNumber' : this.innitialPage
    };
    this.postService.getListPostSupplier(this.constants.GETLISTPOSTSUPPLIER, data).subscribe();
  }

}
