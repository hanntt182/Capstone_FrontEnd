import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostService} from '../../../services/post.service';
import { Constants} from './../../../constants'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public mainImage = '';
  public postId;
  public post;

  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private constants: Constants) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.postId = params['postId'];
      let data = {
        'PostID': this.postId
      };
      this.postService.viewPostDetail(this.constants.VIEWPOSTDETAIL, data).subscribe((response: any) => {
        this.post = response;
        this.mainImage = this.post.primaryImage;
        console.log(this.post);
      });
    });
  }

  setImage($event) {
    this.mainImage = $event.target.src;
  }
}
