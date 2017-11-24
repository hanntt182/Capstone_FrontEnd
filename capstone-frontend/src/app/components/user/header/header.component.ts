import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Constants} from './../../../constants';
import {LoginService} from '../../../services/login.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {CatalogService} from '../../../services/catalog.service';
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user;
  public catalogs;
  public posts;
  public brandId;

  constructor(private constants: Constants,
              private loginService: LoginService,
              private catalogService: CatalogService,
              private router: Router,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.catalogService.getCatalogs(this.constants.GETLISTCATALOG).subscribe((response: any) => {
      this.catalogs = response;
    });
  }

  login(loginValue) {
    let data = {
      'Email': loginValue.email,
      'Password': loginValue.password
    };
    this.loginService.login(this.constants.LOGIN, data).subscribe((response: any) => {
      if (response) {
        this.loginService.setLogin(true);
        this.loginService.setUser(response);
        this.user = this.loginService.getUser();
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        $('#loginModal').hide();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        this.toastr.success('Login successfully!', 'Success!', {showCloseButton: true});
      }
    }, error => {
      this.toastr.error(error._body, 'Please try again!', {showCloseButton: true});
    });
  }

  logout() {
    this.user = null;
    this.loginService.setLogin(false);
    localStorage.removeItem('currentUser');
    this.toastr.success('Logged out!!!', 'Success!', {showCloseButton: true});
  }

  chooseCatalog(catalogId) {
    /*this.catalogService.getCatalogs(this.constants.GETLISTCATALOG).subscribe((response: any) => {
      this.catalogs = response;
      for (let i = 0; i < this.catalogs.length; i++) {
        if (this.catalogs[i].catalogId == catalogId) {
          this.brandId = this.catalogs[i].brands[0].brandId;
          console.log(this.brandId);
          this.router.navigate(['/product/' + catalogId + '/' + this.brandId]);
        }
      }
    }, error => {
      console.log(error);
    });*/

    let data = {
      'CatalogID': catalogId
    };
    this.catalogService.getListBrandByCatalog(this.constants.GETLISTBRANDBYCATALOG, data).subscribe((response: any) => {
      this.brandId = response[0].brandId;
      this.router.navigate(['/product/' + catalogId + '/' + this.brandId]);
    }, error => {
      console.log(error);
    });

  }

  search(searchForm) {
    this.router.navigate(['/search/' + searchForm.search]);
  }
}
