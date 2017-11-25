import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Constants} from './../../../constants';
import {CommonService} from "../../../services/common.service";

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
  public checkVote = 'false';
  public ratePost: number = 0;
  public rateProduct: number = 0;
  public rateProductofUser: number = 0;
  public rateTotal = 0;
  public star: number = 1;
  public reviews;
  public myReview;
  public starReviews = [];
  public recommendPost1s = [];
  public recommendPost2s = [];
  //public recommendPost3s = [];
  public starReview1s = [];
  public starReview2s = [];

  //public starReview3s = [];

  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private constants: Constants,
              private router: Router,
              private commonService: CommonService) {
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
      this.postService.getRecommendedListPostByPost(this.constants.GETRECOMMENDEDLISTPOSTBYPOST, data).subscribe((response: any) => {
        console.log(response);
        console.log(response[0]);
        for (let i = 0; i < 5; i++) {
          this.recommendPost1s.pop();
          this.recommendPost2s.pop();
          // this.recommendPost3s.pop();
        }
        for (let i = 0; i < 5; i++) {
          this.recommendPost1s.push(response[i]);
          this.starReview1s.push(response[i].rate);
        }
        for (let i = 5; i < 10; i++) {
          this.recommendPost2s.push(response[i]);
          this.starReview2s.push(response[i].rate);
        }
        // for (let i = 10; i < 15; i++) {
        //   this.recommendPost3s.push(response[i]);
        //   this.starReview3s.push(response[i].rate);
        // }
        console.log(this.recommendPost1s);
      }, error => {
        console.log(error);
      });
    });
    if (this.user) {
      let data = {
        'UserID': this.user.userId,
        'PostID': this.postId
      };
      this.postService.checkVotePost(this.constants.CHECKVOTEPOST, data).subscribe((response: any) => {
        this.checkVote = response;
      }, error => {
        console.log(error);
      });
    }

    this.getListReview();

  }

  viewRecommendPostDetail(recommendPostID) {
    this.router.navigate(['/product-detail/' + recommendPostID]);
    window.scrollTo(0, 0);
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
        if (this.user) {
          if (this.reviews[i].reviewID.user.userId == this.user.userId) {
            this.myReview = this.reviews[i];
            this.rateProductofUser = this.myReview.star;
          }
        }
      }
    }, error => {
      console.log(error);
    });
  }

  reviewPost(reviewPostForm) {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
    if (!this.user) {
      document.getElementById('checkRoleReviewButton').click();
    } else if (this.user.role != 'BUYER') {
      document.getElementById('checkRoleReviewButton').click();
    } else {
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
  }

  callLoginModal() {
    $('#checkRoleReviewModal').hide();
    $('.modal-backdrop').remove();
    this.commonService.showLoginForm();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
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
