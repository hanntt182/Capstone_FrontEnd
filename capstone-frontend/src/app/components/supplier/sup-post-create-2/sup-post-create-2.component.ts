import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../services/common.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Constants} from './../../../constants';
import {PostService} from '../../../services/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sup-post-create-2',
  templateUrl: './sup-post-create-2.component.html',
  styleUrls: ['./sup-post-create-2.component.css']
})
export class SupPostCreate2Component implements OnInit {
  public user;
  public catalogID;
  public images = [];
  public links = [];
  public photoError: boolean = false;
  public formDescription: FormGroup;
  public descriptions;
  public units = ['piece(s)', 'box(s)', 'unit(s)', 'pair(s)'];
  public times = ['day(s)', 'week(s)', 'month(s)', 'year(s)', 'hour(s)'];
  public colors;
  public shipMethods;
  public minDay = [];
  public maxDay = [];
  public feeShip = [];

  constructor(private commonService: CommonService,
              private _fb: FormBuilder,
              private postService: PostService,
              private constants: Constants,
              private router: Router) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.catalogID = this.commonService.getCatalogID();

    this.formDescription = this._fb.group({
      descriptions: this._fb.array([
        this.innitDes(),
      ])
    });

    this.postService.getListDescription(this.constants.GETLISTDESCRIPTION).subscribe((response: any) => {
      this.descriptions = response;
    });

    this.postService.getListColor(this.constants.GETLISTCOLOR).subscribe((response: any) => {
      this.colors = response;
    });

    this.postService.getListShip(this.constants.GETLISTSHIP).subscribe((response: any) => {
      this.shipMethods = response;
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


  onChange($event) {
    if ((this.images.length + $event.srcElement.files.length) > 5) {
      this.photoError = true;
    } else {
      this.photoError = false;
      for (let i = 0; i < $event.srcElement.files.length; i++) {
        this.images.push($event.srcElement.files[i]);
        let f = $event.srcElement.files[i];
        if (!f.type.match('image.*')) {
          return;
        }
        let reader = new FileReader();
        reader.onload = (_event: any) => {
          this.links.push(_event.target.result);
        };
        reader.readAsDataURL(f);
      }
    }
  }

  remove(index) {
    this.images.splice(index, 1);
    this.links.splice(index, 1);
  }


  createPost(createPost2Form, formDescription) {
    let formData = new FormData();
    formData.append('SupplierID', this.user.userId);
    formData.append('PostTitle', createPost2Form.PostTitle);
    formData.append('ProductName', createPost2Form.ProductName);
    formData.append('BrandName', createPost2Form.BrandName);
    formData.append('CatalogID', this.catalogID);
    formData.append('PrimaryImage', this.images[0]);
    formData.append('MinOrderQuantity', createPost2Form.MinOrderQuantity);
    formData.append('MinPrice', createPost2Form.MinPrice);
    formData.append('MaxPrice', createPost2Form.MaxPrice);
    formData.append('Unit', createPost2Form.UnitOfPrice);
    formData.append('MaxNumberOrder', createPost2Form.MaxNumberOrder);
    formData.append('SupplierAbility', createPost2Form.SupplierAbility + ' ' + createPost2Form.UnitOfTime + '/' + createPost2Form.Time);
    formData.append('ColorID', createPost2Form.Color);
    formData.append('Warranty', createPost2Form.Warranty + ' ' + createPost2Form.TimeOfWaranty);
    for (let i = 1; i < this.images.length; i++) {
      formData.append('ExtraImage', this.images[i]);
    }
    for (let i = 0; i < this.shipMethods.length; i++) {
      formData.append('ShipFee', this.shipMethods[i].shipID + '-' + this.minDay[i] + '-' + this.maxDay[i] + '-' + this.feeShip[i]);
    }
    for (let i = 0; i < formDescription.value.descriptions.length; i++) {
      formData.append('Description', formDescription.value.descriptions[i].DescriptionID
        + '-' + formDescription.value.descriptions[i].DescriptionValue);
    }

    this.postService.createPost(this.constants.CREATEPOST, formData).subscribe((response: any) => {
      alert(response);
    }, error => {
      console.log(error);
    });
    this.router.navigate(['supplier/create-post3']);


  }
}
