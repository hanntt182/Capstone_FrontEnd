import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Constants} from './../../../constants';
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import {CommonService} from "../../../services/common.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public cities;
  public districts;
  public wards;
  public cityBuy;
  public districtBuy;
  public wardBuy;
  public citySup;
  public districtSup;
  public wardSup;
  public citySupCom;
  public districtSupCom;
  public wardSupCom;
  public status;
  public image;
  imageFile: { link: string, file: any, name: string };

  public banks = ['Orient Commercial Joint Stock Bank',
    'Asia Commercial Bank',
    'Tien Phong Commercial Joint Stock Bank',
    'Hanoi Building Joint-stock Commercial Bank',
    'Maritime Commercial Joint Stock Bank',
    'Sai Gon Thuong Tin Commercial Joint-stock Bank',
    'Eastern Asia Commercial Joint Stock Bank',
    'Viet nam Export – Import Commercial Joint Stock Bank',
    'Nam A Commercial Joint Stock Bank',
    'Saigon bank for Industry & Trade',
    'Vietnam Prosperity commercial joint-stock bank',
    'Viet Nam Technological and Commercial Joint Stock Bank',
    'Military Commercial Joint Stock Bank',
    'Bac A Commercial Joint Stock Bank',
    'Vietnam International Commercial Joint Stock Bank',
    'Southeast Asia Commercial Joint Stock Bank',
    'Housing development Commercial Joint Stock Bank',
    'Southern Commercial Joint Stock Bank',
    'Viet Capital Commercial Joint Stock Bank',
    'Sai Gon Joint Stock Commercial Bank',
    'Viet A Commercial Joint Stock Bank',
    'Saigon-Hanoi Commercial Joint Stock Bank',
    'Global Petro Commercial Joint Stock Bank',
    'An Binh Commercial Joint Stock Bank',
    'Nam Viet Commercial Joint Stock Bank',
    'Kien Long Commercial Joint Stock Bank',
    'Mekong Commercial Bank',
    'Viet Nam thuong Tin Commercial Joint Stock Bank',
    'OCEAN Commercial Joint Stock Bank',
    'Petrolimex Group Commercial Joint Stock Bank',
    'Western Rural Commercial Joint Stock Bank',
    'Great Trust Joint Stock Commercial Bank',
    'Great Asia Commercial Joint Stock Bank',
    'LienViet Post Commercial Joint Stock Bank',
    'Mekong Development Joint Stock Commercial Bank',
    'Bao Viet Joint Stock Commercial Bank',
    'Western Bank (Phuong Tay Bank)',
    'Viet Nam Public Bank (PVcomBank)',
    'Tien Phong Joint Stock Commercial Bank (Tp Bank)',
    'VPBank'
  ];

  constructor(private constants: Constants,
              private loginService: LoginService,
              private router: Router,
              private commonService: CommonService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.commonService.getListCity(this.constants.GETLISTCITY).subscribe((response: any) => {
      this.cities = response.LtsItem;
    }, error => {
      console.log(error);
    });
  }


  chooseCityBuy(cityID) {
    let data = {
      'CityID': cityID
    };
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].ID == cityID) {
        this.cityBuy = this.cities[i].Title;
      }
    }
    this.commonService.getListDistrict(this.constants.GETLISTDISTRICT, data).subscribe((response: any) => {
      this.districts = response;
    }, error => {
      console.log(error);
    });
  }


  chooseDistrictBuy(districtID) {
    let data = {
      'DistrictID': districtID
    };
    for (let i = 0; i < this.districts.length; i++) {
      if (this.districts[i].ID == districtID) {
        this.districtBuy = this.districts[i].Title;
      }
    }
    this.commonService.getListWard(this.constants.GETLISTWARD, data).subscribe((response: any) => {
      this.wards = response;
    }, error => {
      console.log(error);
    });
  }

  chooseWardBuy(wardID) {
    for (let i = 0; i < this.wards.length; i++) {
      if (this.wards[i].ID == wardID) {
        this.wardBuy = this.wards[i].Title;
      }
    }
  }

  chooseCitySup(cityID) {
    let data = {
      'CityID': cityID
    };
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].ID == cityID) {
        this.citySup = this.cities[i].Title;
      }
    }
    this.commonService.getListDistrict(this.constants.GETLISTDISTRICT, data).subscribe((response: any) => {
      this.districts = response;
    }, error => {
      console.log(error);
    });
  }


  chooseDistrictSup(districtID) {
    let data = {
      'DistrictID': districtID
    };
    for (let i = 0; i < this.districts.length; i++) {
      if (this.districts[i].ID == districtID) {
        this.districtSup = this.districts[i].Title;
      }
    }
    this.commonService.getListWard(this.constants.GETLISTWARD, data).subscribe((response: any) => {
      this.wards = response;
    }, error => {
      console.log(error);
    });
  }

  chooseWardSup(wardID) {
    for (let i = 0; i < this.wards.length; i++) {
      if (this.wards[i].ID == wardID) {
        this.wardSup = this.wards[i].Title;
      }
    }
  }

  chooseCitySupCom(cityID) {
    let data = {
      'CityID': cityID
    };
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].ID == cityID) {
        this.citySupCom = this.cities[i].Title;
      }
    }
    this.commonService.getListDistrict(this.constants.GETLISTDISTRICT, data).subscribe((response: any) => {
      this.districts = response;
    }, error => {
      console.log(error);
    });
  }


  chooseDistrictSupCom(districtID) {
    let data = {
      'DistrictID': districtID
    };
    for (let i = 0; i < this.districts.length; i++) {
      if (this.districts[i].ID == districtID) {
        this.districtSupCom = this.districts[i].Title;
      }
    }
    this.commonService.getListWard(this.constants.GETLISTWARD, data).subscribe((response: any) => {
      this.wards = response;
    }, error => {
      console.log(error);
    });
  }

  chooseWardSupCom(wardID) {
    for (let i = 0; i < this.wards.length; i++) {
      if (this.wards[i].ID == wardID) {
        this.wardSupCom = this.wards[i].Title;
      }
    }
  }



  registration(value) {

    let formData = new FormData();
    if (value.Role == 'BUYER') {
      formData.append('Username', value.UserName);
      formData.append('Password', value.Password);
      formData.append('Phone', value.Phone);
      formData.append('Email', value.Email);
      formData.append('Role', value.Role);
      formData.append('Bank', value.Bank);
      formData.append('BankAccount', value.BankAccount);
      formData.append('Address', value.addressBuyer + ', ' + this.wardBuy + ', ' + this.districtBuy + ', ' + this.cityBuy);
    }
    if (value.Role == 'SUPPLIER') {
      formData.append('Username', value.UserName);
      formData.append('Password', value.Password);
      formData.append('Phone', value.Phone);
      formData.append('Email', value.Email);
      formData.append('Role', value.Role);
      formData.append('Bank', value.Bank);
      formData.append('BankAccount', value.BankAccount);
      formData.append('Address', value.addressSup + ', ' + this.wardSup + ', ' + this.districtSup + ', ' + this.citySup);
      formData.append('CompanyName', value.CompanyName);
      formData.append('CompanyTaxCode', value.CompanyTaxCode);
      formData.append('CompanyAddress', value.addressSupCom + ', ' + this.wardSupCom + ', ' + this.districtSupCom + ', ' + this.citySupCom);
      formData.append('CompanyPhone', value.CompanyPhone);
      formData.append('CompanyEstablishedYear', value.CompanyEstablishedYear);
      formData.append('CompanyWebsite', value.CompanyWebsite);
      formData.append('CompanyLogo', this.imageFile.file);
      formData.append('CompanyEmail', value.CompanyEmail);
      formData.append('CompanyFax', value.CompanyFax);
    }
    this.loginService.registration(this.constants.REGISTRATION, formData).subscribe((data) => {
      this.toastr.success(data, 'Success!', {showCloseButton: true});
      setTimeout(function () {
        this.router.navigate(['/home']);
      }, 1000);
    }, error => {
      this.toastr.error(error._body, 'Please try again!', {showCloseButton: true});
      console.log(error._body);
    });
  }

  imagesPreview(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (_event: any) => {
        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
