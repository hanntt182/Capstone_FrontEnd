import { Component, OnInit } from '@angular/core';
import { Constants} from './../../../constants';
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public status;
  public image;
  imageFile: { link: string, file: any, name: string };

  constructor(private constants: Constants,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
  }

  registration(value) {
    let formData = new FormData();
    if (value.Role == 'BUYER') {
      formData.append('Username', value.UserName);
      formData.append('Password', value.Password);
      formData.append('Phone', value.Phone);
      formData.append('Email', value.Email);
      formData.append('Role', value.Role);
      formData.append('Address', value.Address);
    }
    if (value.Role == 'SUPPLIER') {
      formData.append('Username', value.UserName);
      formData.append('Password', value.Password);
      formData.append('Phone', value.Phone);
      formData.append('Email', value.Email);
      formData.append('Role', value.Role);
      formData.append('CompanyName', value.CompanyName);
      formData.append('CompanyTaxCode', value.CompanyTaxCode);
      formData.append('CompanyAddress', value.CompanyAddress);
      formData.append('CompanyCity', value.CompanyCity);
      formData.append('CompanyPhone', value.CompanyPhone);
      formData.append('CompanyEstablishedYear', value.CompanyEstablishedYear);
      formData.append('CompanyWebsite', value.CompanyWebsite);
      formData.append('CompanyLogo', this.imageFile.file);
      formData.append('CompanyEmail', value.CompanyEmail);
      formData.append('CompanyFax', value.CompanyFax);
    }
    this.loginService.registration(this.constants.REGISTRATION, formData).subscribe((data) => {
      console.log(data);
      alert(data);
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
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
