import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import { Constants} from './../../../constants';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public mainImage = '../../../../assets/img/image-default.jpg';
  public postId;
  public post;
  public descriptions;
  public extraImages;
  public postZones;

  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private constants: Constants,
              private router: Router) {
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
        this.descriptions = response.postDescriptions;
        this.extraImages = response.postImages;
        this.postZones = response.postZones;
      });
    });
  }

  setImage($event) {
    this.mainImage = $event.target.src;
  }

  createOrder(postId) {
    this.router.navigate(['/create-order/' + postId]);
  }
}
