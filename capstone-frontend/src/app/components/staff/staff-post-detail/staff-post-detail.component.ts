import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Constants} from './../../../constants';

@Component({
  selector: 'app-staff-post-detail',
  templateUrl: './staff-post-detail.component.html',
  styleUrls: ['./staff-post-detail.component.css']
})
export class StaffPostDetailComponent implements OnInit {

  public mainImage = '../../../../assets/img/image-default.jpg';
  public postId;
  public post;
  public descriptions;
  public extraImages;
  public postTitle;
  public productName;
  public brandName;
  public catalogName;
  public minPrice;
  public maxPrice;
  public unit;
  public minOrderQuantity;
  public supplierAbility;
  public username;
  public colorName;
  public warranty;
  public companyLogo;
  public companyName;
  public companyAddress;
  public companyPhone;
  public companyWebsite;
  public establishedYear;
  public companyEmail;
  public companyFax;

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
        this.postTitle = response.postTitle;
        this.productName = response.product.productName;
        this.brandName = response.brand.brandName;
        this.catalogName = response.catalog.catalogName;
        this.minPrice = response.minPrice;
        this.maxPrice = response.maxPrice;
        this.unit = response.unit;
        this.minOrderQuantity = response.minOrderQuantity;
        this.supplierAbility = response.supplierAbility;
        this.username = response.supplier.username;
        this.colorName = response.color.colorName;
        this.warranty = response.warranty;
        this.companyLogo = response.supplier.companyLogo;
        this.companyName = response.supplier.companyName;
        this.companyAddress = response.supplier.companyAddress;
        this.companyPhone = response.supplier.companyPhone;
        this.companyWebsite = response.supplier.companyWebsite;
        this.establishedYear = response.supplier.establishedYear;
        this.companyEmail = response.supplier.companyEmail;
        this.companyFax = response.supplier.companyFax;
        console.log(this.post);
      });
    });
  }

  setImage($event) {
    this.mainImage = $event.target.src;
  }

  reviewPost(reviewForm) {
    let data = {
      'PostID': this.postId,
      'Review': reviewForm.review
    };
    this.postService.reviewPost(this.constants.REVIEWPOST, data).subscribe((response: any) => {
      alert(response);
      this.router.navigate(['/staff/post-list']);
    });
  }

  approvePost() {
    let data = {
      'PostID': this.postId
    };
    this.postService.approvePost(this.constants.APPROVEPOST, data).subscribe((response: any) => {
      alert(response);
      this.router.navigate(['/staff/post-list']);
    });
  }

}
