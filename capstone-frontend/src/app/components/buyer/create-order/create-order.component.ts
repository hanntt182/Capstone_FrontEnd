import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../services/common.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Constants} from '../../../constants';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  public user;
  public postID;
  public post;
  public addresses;
  public productAmount = 0;
  public shippingFee = 0;
  public cities;
  public districts;
  public wards;
  public city;
  public district;
  public ward;
  public address;
  public postShips;

  constructor(private commonService: CommonService,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private constants: Constants,
              private orderService: OrderService,
              private router: Router) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.addresses = this.user.address;

    this.commonService.getListCity(this.constants.GETLISTCITY).subscribe((response: any) => {
      this.cities = response.LtsItem;
    }, error => {
      console.log(error);
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.postID = params['postID'];
    });

    let data = {
      'PostID': this.postID
    };
    this.postService.viewPostDetail(this.constants.VIEWPOSTDETAIL, data).subscribe((response: any) => {
      this.post = response;
      this.postShips = response.postShips;
    }, error => {
      console.log(error);
    });
  }

  chooseCity(cityID) {
    let data = {
      'CityID': cityID
    };
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].ID == cityID) {
        this.city = this.cities[i].Title;
      }
    }
    this.orderService.getListDistrict(this.constants.GETLISTDISTRICT, data).subscribe((response: any) => {
      this.districts = response;
    }, error => {
      console.log(error);
    });
  }


  chooseDistrict(districtID) {
    let data = {
      'DistrictID': districtID
    };
    for (let i = 0; i < this.districts.length; i++) {
      if (this.districts[i].ID == districtID) {
        this.district = this.districts[i].Title;
      }
    }
    this.orderService.getListWard(this.constants.GETLISTWARD, data).subscribe((response: any) => {
      this.wards = response;
    }, error => {
      console.log(error);
    });
  }

  chooseWard(wardID) {
    for (let i = 0; i < this.wards.length; i++) {
      if (this.wards[i].ID == wardID) {
        this.ward = this.wards[i].Title;
      }
    }
  }


  formatMoney(e) {
  }


  countAmount(createOrderForm) {
    this.productAmount = (createOrderForm.quantity) * (createOrderForm.offerPrice);
  }

  countShippingFee(createOrderForm) {
    console.log(createOrderForm.shipMethod);
    for (let i = 0; i < this.postShips.length; i++) {
      if (this.postShips[i].postShipID == createOrderForm.shipMethod) {
        this.shippingFee = this.postShips[i].shippingFee;
      }
    }
  }

  createOrder(createOrderForm) {

    /*get Address*/
    if (createOrderForm.address == 'oldAddress') {
      this.address = createOrderForm.oldAddressName;
    } else if (createOrderForm.address == 'newAddress') {
      this.address = createOrderForm.newAddressValue + ', ' + this.ward
        + ', ' + this.district + ', ' + this.city;
    }

    let data = {
      'BuyerID': this.user.userId,
      'PostID': Number(this.postID),
      'Quantity': createOrderForm.quantity,
      'OfferPrice': createOrderForm.offerPrice,
      'Remark': createOrderForm.remark,
      'Address': this.address,
      'PostShipID': createOrderForm.shipMethod
    };
    console.log(data);
    this.orderService.createOrder(this.constants.CREATEORDER, data).subscribe((response: any) => {
      if (response == 'CREATE SUCCESSFULLY') {
        alert('Create order successfully. Please wait for approve...');
        this.router.navigate(['/buyer/order-list']);
      }
    }, error => {
      console.log(error);
    });
  }

}
