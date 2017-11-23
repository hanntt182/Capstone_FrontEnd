import {Component, OnInit} from '@angular/core';
import {Constants} from './../../../constants';
import {CatalogService} from "../../../services/catalog.service";
import {PostService} from "../../../services/post.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {DealService} from "../../../services/deal.service";

@Component({
  selector: 'app-sup-deal-create',
  templateUrl: './sup-deal-create.component.html',
  styleUrls: ['./sup-deal-create.component.css']
})
export class SupDealCreateComponent implements OnInit {

  public user;
  public catagories;
  public imageData;
  public imageLink;
  public imageType;
  public colors;
  public times = ['day(s)', 'week(s)', 'month(s)', 'year(s)', 'hour(s)'];
  public units = ['piece(s)', 'box(s)', 'unit(s)', 'pair(s)'];
  public closeDay = null;
  public minDateValue: Date;
  public tomorrow = (new Date().getDate()) + 1;
  public shipMethods;
  public minDay = [];
  public maxDay = [];
  public feeShip = [];
  public formDescription: FormGroup;
  public descriptions;
  public discountPrice;

  constructor(private constants: Constants,
              private _fb: FormBuilder,
              private catalogService: CatalogService,
              private postService: PostService,
              private dealService: DealService) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.minDateValue = new Date();
    this.minDateValue.setDate(this.tomorrow);
    this.minDateValue.setHours(0);
    this.minDateValue.setMinutes(0);
    this.minDateValue.setSeconds(0);

    this.formDescription = this._fb.group({
      descriptions: this._fb.array([
        this.innitDes(),
      ])
    });

    this.postService.getListDescription(this.constants.GETLISTDESCRIPTION).subscribe((response: any) => {
      this.descriptions = response;
    }, error => {
      console.log(error);
    });

    this.catalogService.getCatalogs(this.constants.GETLISTCATALOG).subscribe((response: any) => {
      this.catagories = response;
    }, error => {
      console.log(error);
    });

    this.postService.getListColor(this.constants.GETLISTCOLOR).subscribe((response: any) => {
      this.colors = response;
    }, error => {
      console.log(error);
    });

    this.postService.getListShip(this.constants.GETLISTSHIP).subscribe((response: any) => {
      this.shipMethods = response;
    }, error => {
      console.log(error);
    });
  }

  innitDes() {
    // initialize our descriptions
    return this._fb.group({
      DescriptionID: [''],
      DescriptionValue: ['']
    });
  }

  addDescription() {
    // add description to the list
    const control = <FormArray>this.formDescription.controls['descriptions'];
    control.push(this.innitDes());
  }


  removeDescription(i: number) {
    // remove description from the list
    const control = <FormArray>this.formDescription.controls['descriptions'];
    control.removeAt(i);
  }

  formatDateTime(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' '
      + date.getHours() + ':' + date.getMinutes() + ':00';
  }

  onChangeImage(e) {
    this.imageType = true;
    if (e.target.files[0].type != 'image/jpeg' &&
      e.target.files[0].type != 'image/png') {
      this.imageType = false;
      return;
    } else {
      this.imageData = e.target.files[0];
      let reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imageLink = _event.target.result;
      };
      reader.readAsDataURL(this.imageData);
    }
    console.log(e);
  }

  countDiscountPrice(createDealForm) {
    if (createDealForm.Price != '' && createDealForm.Price != 'e' && createDealForm.Discount != '' && createDealForm.Discount != 'e') {
      this.discountPrice = createDealForm.Price - (createDealForm.Price * createDealForm.Discount) / 100;
    }
    document.getElementById('discountPrice').innerHTML = (this.discountPrice + ' VND');
  }

  createDeal(createDealForm, formDescription) {

    let formData = new FormData();
    formData.append('SupplierID', this.user.userId);
    formData.append('DealTitle', createDealForm.DealTitle);
    formData.append('ProductName', createDealForm.ProductName);
    formData.append('DealImage', this.imageData);
    formData.append('CatalogID', createDealForm.Category);
    formData.append('BrandName', createDealForm.BrandName);
    formData.append('ColorID', createDealForm.Color);
    formData.append('Warranty', createDealForm.Warranty + ' ' + createDealForm.TimeOfWaranty);
    formData.append('FirstPrice', createDealForm.Price);
    formData.append('Discount', createDealForm.Discount);
    formData.append('DiscountPrice', this.discountPrice);
    formData.append('MinParticipant', createDealForm.minRequiPar);
    formData.append('MaxOrderQuantity', createDealForm.maxOrderQuan);
    formData.append('CloseDay', this.formatDateTime(this.closeDay));
    for (let i = 0; i < this.shipMethods.length; i++) {
      formData.append('ShipFee', this.shipMethods[i].shipID + '-' + this.minDay[i] + '-' + this.maxDay[i] + '-' + this.feeShip[i]);
    }
    for (let i = 0; i < formDescription.descriptions.length; i++) {
      formData.append('Description', formDescription.descriptions[i].DescriptionID
        + '-' + formDescription.descriptions[i].DescriptionValue);
    }
    formData.append('Unit', createDealForm.unit);
    this.dealService.createDeal(this.constants.CREATEDEAL, formData).subscribe((response: any) => {
      alert(response);
    }, error => {
      console.log(error);
    });
  }

}
