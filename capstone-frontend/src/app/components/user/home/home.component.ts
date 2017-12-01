import {Component, OnInit} from '@angular/core';
import {Constants} from './../../../constants';
import {CatalogService} from "../../../services/catalog.service";
import {Router} from "@angular/router";
import {TenderService} from "../../../services/tender.service";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public catalogs;
  public brandId;
  public tenders;
  public user;
  public checkBid;
  public myTenderInfo;
  public tender;
  public buyerRateStar;
  public total;
  public recommendPost1s = [];
  public recommendPost2s = [];
  public recommendPost3s = [];
  public starReview1s = [];
  public starReview2s = [];
  public starReview3s = [];

  constructor(private constants: Constants,
              private catalogService: CatalogService,
              private router: Router,
              private tenderService: TenderService,
              private postService: PostService) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    // Get Recommend Post List By Algorithm
    if (this.user == null) {
      this.postService.getTop15PostByRateDesc(this.constants.GETTOP15POSTBYRATEDESC).subscribe((response: any) => {
        for (let i = 0; i < 5; i++) {
          this.recommendPost1s.push(response[i]);
          this.starReview1s.push(response[i].rate);
        }
        for (let i = 5; i < 10; i++) {
          this.recommendPost2s.push(response[i]);
          this.starReview2s.push(response[i].rate);
        }
        for (let i = 10; i < 15; i++) {
          this.recommendPost3s.push(response[i]);
          this.starReview3s.push(response[i].rate);
        }
      }, error => {
        console.log(error);
      });
    } else if (this.user != null) {
      let data = {
        'UserID': this.user.userId
      };
      this.postService.getRecommendedListPostByUser(this.constants.GETRECOMMENDEDLISTPOSTBYUSER, data).subscribe((response: any) => {
        // for (let i = 0; i < 3; i++) {
        //   this.recommendPost1s.pop();
        //   this.recommendPost2s.pop();
        //   this.recommendPost3s.pop();
        // }
        for (let i = 0; i < 5; i++) {
          this.recommendPost1s.push(response[i]);
          this.starReview1s.push(response[i].rate);
        }
        for (let i = 5; i < 10; i++) {
          this.recommendPost2s.push(response[i]);
          this.starReview2s.push(response[i].rate);
        }
        for (let i = 10; i < 15; i++) {
          this.recommendPost3s.push(response[i]);
          this.starReview3s.push(response[i].rate);
        }
      }, error => {
        console.log(error);
      });
    }

    this.catalogService.getCatalogs(this.constants.GETLISTCATALOG).subscribe((response: any) => {
      this.catalogs = response;
    }, error => {
      console.log(error);
    });
    this.tenderService.get5NewTender(this.constants.GET5NEWTENDER).subscribe((response: any) => {
      this.tenders = response;
    }, error => {
      console.log(error);
    });
  }

  viewRecommendPostDetail(recommendPostID) {
    this.router.navigate(['/product-detail/' + recommendPostID]);
    window.scrollTo(0, 0);
  }

  chooseCatalog(catalogId) {
    let data = {
      'CatalogID': catalogId
    };
    this.catalogService.getListBrandByCatalog(this.constants.GETLISTBRANDBYCATALOG, data).subscribe((response: any) => {
      this.brandId = response[0].brandId;
      this.router.navigate(['/product/' + catalogId + '/' + this.brandId]);
    }, error => {
      console.log(error);
    });
    this.router.navigate(['/catalog/' + catalogId]);
    window.scrollTo(0, 0);
  }

  viewTenderDetail(tenderID) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.checkBid = null;
    console.log(this.user);
    if (this.user != null) {
      let data1 = {
        'SupplierID': this.user.userId,
        'TenderID': tenderID
      };
      this.tenderService.checkBid(this.constants.CHECKBID, data1).subscribe((response: any) => {
        this.checkBid = response;
        if (this.checkBid) {
          this.tenderService.viewTenderHistoryDetail(this.constants.VIEWTENDERHISTORYDETAIL, data1).subscribe((res: any) => {
            this.myTenderInfo = res;
          });
        }
      });
    }

    let data = {
      'TenderID': tenderID
    };
    this.tenderService.viewTenderDetail(this.constants.VIEWTENDERDETAIL, data).subscribe((response: any) => {
      this.tender = response;
      this.buyerRateStar = response.buyer.rate;
      this.total = response.buyer.star1 + response.buyer.star2 + response.buyer.star3 + response.buyer.star4 + response.buyer.star5;
      document.getElementById('tenderDetailButton').click();
    });
  }

  formatTenderFile(fileName) {
    let fileArray = [];
    if (fileName != null) {
      fileArray = fileName.split('-');
    }
    let newName = '';
    if (fileArray.length == 3) {
      newName += fileArray[2];
    } else if (fileArray.length > 3) {
      for (let i = 2; i < fileArray.length; i++) {
        newName += fileArray[i];
      }
    }
    return newName;
  }


}
