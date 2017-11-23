import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Constants} from './../../../constants';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public user;
  public mainImage = '../../../../assets/img/image-default.jpg';
  public postId;
  public post;
  public descriptions;
  public extraImages;
  public postShips;
  public checkVote;
  public ratePost: number = 0;
  public rateProduct: number = 0;
  public rateProductofUser: number = 0;
  public rateTotal = 0;
  public star: number = 1;
  public reviews;
  public myReview;
  public starReviews = [];

  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private constants: Constants,
              private router: Router) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
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
        this.postShips = response.postShips;
        this.rateProduct = response.rate;
        this.rateTotal = response.star1 + response.star2 + response.star3 + response.star4 + response.star5;
      });
    });
    let data = {
      'UserID': this.user.userId,
      'PostID': this.postId
    };
    this.postService.checkVotePost(this.constants.CHECKVOTEPOST, data).subscribe((response: any) => {
      this.checkVote = response;
    }, error => {
      console.log(error);
    });

    this.getListReview();

  }

  getListReview() {
    let data1 = {
      'PostID': this.postId,
      'pageNumber': 1
    };
    this.postService.getListReview(this.constants.GETLISTREVIEW, data1).subscribe((response: any) => {
      this.reviews = response.content;
      for (let i = 0; i < this.reviews.length; i++) {
        this.starReviews.push(this.reviews[i].star);
        if (this.reviews[i].reviewID.user.userId == this.user.userId) {
          this.myReview = this.reviews[i];
          this.rateProductofUser = this.myReview.star;
        }
      }
    }, error => {
      console.log(error);
    });
  }

  reviewPost(reviewPostForm) {
    console.log(this.ratePost);
    console.log(reviewPostForm);
    let data = {
      'UserID': this.user.userId,
      'PostID': Number(this.postId),
      'Star': this.ratePost,
      'ReviewTitle': reviewPostForm.reviewTitle,
      'Review': reviewPostForm.review
    };
    this.postService.votePost(this.constants.VOTEPOST, data).subscribe((response: any) => {
      console.log(response);
      document.getElementById('reviewButton').click();
      this.checkVote = 'true';
      this.getListReview();
    });
  }

  setImage($event) {
    this.mainImage = $event.target.src;
  }

  createOrder(postId) {
    this.router.navigate(['/create-order/' + postId]);
  }

  createNego(postID) {
    this.router.navigate(['/negotiation/' + postID]);
  }
}
