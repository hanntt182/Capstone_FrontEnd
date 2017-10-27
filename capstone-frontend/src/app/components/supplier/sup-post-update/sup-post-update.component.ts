import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../../../services/post.service";
import {Constants} from './../../../constants';

@Component({
  selector: 'app-sup-post-update',
  templateUrl: './sup-post-update.component.html',
  styleUrls: ['./sup-post-update.component.css']
})
export class SupPostUpdateComponent implements OnInit {

  public postId;
  public post;
  public postTitle;
  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private constants: Constants) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.postId = params['postId'];
      let data = {
        'PostID': this.postId
      };
      this.postService.viewPostDetail(this.constants.VIEWPOSTDETAIL, data).subscribe((response: Response) => {
        this.post = response;
        console.log(this.post);
      });
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

}
