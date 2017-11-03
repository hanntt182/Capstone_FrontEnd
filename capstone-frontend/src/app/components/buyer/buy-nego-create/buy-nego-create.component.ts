import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NegoService} from "../../../services/nego.service";
import {Constants} from './../../../constants';
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-buy-nego-create',
  templateUrl: './buy-nego-create.component.html',
  styleUrls: ['./buy-nego-create.component.css']
})
export class BuyNegoCreateComponent implements OnInit {

  public user;
  public postID;
  public post;
  public negoID;
  public remainNum = 5000;

  constructor(private activatedRoute: ActivatedRoute,
              private negoService: NegoService,
              private constants: Constants,
              private router: Router,
              private postService: PostService) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.activatedRoute.params.subscribe((params: Params) => {
      this.postID = params['postID'];
    });
    let data = {
      'PostID': this.postID
    };
    this.postService.viewPostDetail(this.constants.VIEWPOSTDETAIL, data).subscribe((response: any) => {
      this.post = response;
    }, error => {
      console.log(error);
    });
  }

  createNego(createNegoForm) {
    let data = {
      'BuyerID': this.user.userId,
      'PostID': this.postID,
      'Message': createNegoForm.message,
      'Quantity': createNegoForm.quantity
    };
    this.negoService.createNegotiation(this.constants.CREATENEGOTIATION, data).subscribe((response: any) => {
      this.negoID = response;
      this.router.navigate(['/buyer/negotiation/' + 'negotiating/' + this.negoID]);
    });
  }

  countRemain(e) {
    this.remainNum = 5000 - e.target.textLength;
  }

}
