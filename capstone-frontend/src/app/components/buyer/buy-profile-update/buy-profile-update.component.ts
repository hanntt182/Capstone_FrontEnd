import {Component, OnInit} from '@angular/core';
import {Constants} from './../../../constants';
import {CommonService} from "../../../services/common.service";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-buy-profile-update',
  templateUrl: './buy-profile-update.component.html',
  styleUrls: ['./buy-profile-update.component.css']
})
export class BuyProfileUpdateComponent implements OnInit {

  public user;
  public cities;
  public districts;
  public wards;
  public city;
  public district;
  public ward;
  public linkLogo;
  public imageLogo;

  constructor(private constants: Constants,
              private commonService: CommonService,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.commonService.getListCity(this.constants.GETLISTCITY).subscribe((response: any) => {
      this.cities = response.LtsItem;
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

  imagesPreview(e) {
    this.imageLogo = e.srcElement.files[0];
    if (!this.imageLogo.type.match('image.*')) {
      return;
    }
    let reader = new FileReader();
    reader.onload = (_event: any) => {
      this.linkLogo = _event.target.result;
    };
    reader.readAsDataURL(this.imageLogo);
  }


  updateCompanyInfo(updateInfo) {
    let formData = new FormData();
    formData.append('UserID', this.user.userId);
    formData.append('CompanyName', updateInfo.CompanyName);
    formData.append('CompanyAddress', updateInfo.Address + ', ' + this.ward + ', ' + this.district + ', ' + this.city);
    formData.append('CompanyPhone', updateInfo.Phone);
    formData.append('CompanyEmail', updateInfo.Email);
    formData.append('CompanyFax', updateInfo.Fax);
    formData.append('CompanyTaxCode', updateInfo.TaxCode);
    formData.append('CompanyEstablishedYear', updateInfo.EstablishedYear);
    formData.append('CompanyLogo', this.imageLogo);
    formData.append('CompanyWebsite', updateInfo.Website);
    this.loginService.updateCompanyProfile(this.constants.UPDATECOMPANYPROFILE, formData).subscribe((response: any) => {
      alert('UPDATE SUCCESSFULLY!');
      if (response) {
        this.loginService.setUser(response);
        this.user = this.loginService.getUser();
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.router.navigate(['/buyer/create-tender']);
      }
    });
  }

}
