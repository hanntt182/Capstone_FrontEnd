import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {CommonService} from '../../../services/common.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Constants} from '../../../constants';
import {OrderService} from '../../../services/order.service';
import {ToastsManager} from "ng2-toastr";

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
  public setDisabledNew = false;
  public setDisabledOld = false;

  constructor(private commonService: CommonService,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private constants: Constants,
              private orderService: OrderService,
              private router: Router,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.getListAddress(this.user.userId);

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

  getListAddress(userID) {
    let data = {
      'UserID': userID
    };
    this.orderService.getListAddress(this.constants.GETLISTADDRESS, data).subscribe((response: any) => {
      this.addresses = response;
    }, error => {
      console.log(error);
    });
  }


  backToPrevious() {
    history.back();
  }

  checkAddress(e, createOrderForm) {
    if (e.target.value == 'newAddress') {
      this.setDisabledOld = true;
      this.setDisabledNew = false;
      createOrderForm.controls['oldAddressName'].setValue('');
    } else if (e.target.value == 'oldAddress') {
      this.setDisabledOld = false;
      this.setDisabledNew = true;
      createOrderForm.controls['newAddressCity'].setValue('');
      createOrderForm.controls['newAddressDistrict'].setValue('');
      createOrderForm.controls['newAddressWard'].setValue('');
      createOrderForm.controls['newAddressValue'].setValue('');
    }
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
    this.commonService.getListDistrict(this.constants.GETLISTDISTRICT, data).subscribe((response: any) => {
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
    this.commonService.getListWard(this.constants.GETLISTWARD, data).subscribe((response: any) => {
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


  countAmount(createOrderForm) {
    this.productAmount = (createOrderForm.quantity) * (createOrderForm.offerPrice);
  }

  countShippingFee(createOrderForm) {
    console.log(createOrderForm.shipMethod);
    for (let i = 0; i < this.postShips.length; i++) {
      if (this.postShips[i].postShipID.ship.shipID == createOrderForm.shipMethod) {
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
      'ShipID': createOrderForm.shipMethod,
      'ShipFee': this.shippingFee
    };
    console.log(data);
    this.orderService.createOrder(this.constants.CREATEORDER, data).subscribe((response: any) => {
      if (response == 'CREATE SUCCESSFULLY') {
        alert(response);
        this.toastr.success('Create order successfully. Please wait for approve...', 'Success!', {showCloseButton: true});
        this.router.navigate(['/buyer/order-list/waiting']);
      }
    }, error => {
      console.log(error);
    });
  }

}
