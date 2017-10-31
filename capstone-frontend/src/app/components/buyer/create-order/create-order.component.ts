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
  public address;
  public cityID;
  public zoneID;
  public postZones;

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

    this.orderService.getListCity(this.constants.GETLISTCITY).subscribe((response: any) => {
      this.cities = response;
    });


    this.addresses = this.user.address;

    this.activatedRoute.params.subscribe((params: Params) => {
      this.postID = params['postID'];
    });

    let data = {
      'PostID': this.postID
    };
    this.postService.viewPostDetail(this.constants.VIEWPOSTDETAIL, data).subscribe((response: any) => {
      this.post = response;
      this.postZones = response.postZones;
    }, error => {
      console.log(error);
    });
  }


  countAmount(createOrderForm) {
    this.productAmount = (createOrderForm.quantity) * (createOrderForm.offerPrice);
  }

  countShippingFee(createOrderForm) {
    if (createOrderForm.address == 'oldAddress') {
      for (let i = 0; i < this.addresses.length; i++) {
        if (this.addresses[i].addressID == createOrderForm.oldAddressId) {
          this.address = this.addresses[i].address;
          this.cityID = this.addresses[i].city.cityID;
          this.zoneID = this.addresses[i].city.zone.zoneID;
          for (let j = 0; j < this.postZones.length; j++) {
            if (this.postZones[j].postZoneID.zone.zoneID == this.zoneID) {
              this.shippingFee = this.postZones[j].zonePrice;
            }
          }
        }
      }
    }
    else if (createOrderForm.address == 'newAddress') {
      for (let i = 0; i < this.cities.length; i++) {
        if (this.cities[i].cityID == createOrderForm.newAddressCity) {
          this.zoneID = this.cities[i].zone.zoneID;
          for (let j = 0; j < this.postZones.length; j++) {
            if (this.postZones[j].postZoneID.zone.zoneID == this.zoneID) {
              this.shippingFee = this.postZones[j].zonePrice;
            }
          }
        }
      }
    }
  }

  createOrder(createOrderForm) {
    let data = {
      'BuyerID': this.user.userId,
      'PostID': Number(this.postID),
      'Quantity': createOrderForm.quantity,
      'OfferPrice': createOrderForm.offerPrice,
      'Remark': createOrderForm.remark,
      'Address': this.address,
      'CityID': this.cityID,
      'ShipPrice': this.shippingFee
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