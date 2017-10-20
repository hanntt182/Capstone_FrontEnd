import {Component, OnInit} from '@angular/core';
import {Constants} from './../../../constants';
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user;

  constructor(private constants: Constants,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  login(loginValue) {
    let data = {
      'Email': loginValue.email,
      'Password': loginValue.password
    };
    this.loginService.login(this.constants.LOGIN, data).subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.loginService.setLogin(true);
        this.loginService.setUser(response);
        this.user = this.loginService.getUser();
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        $('#loginModal').hide();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
      }
    }, error => {
      console.log(error);
    });
  }

  logout() {
    this.user = null;
    this.loginService.setLogin(false);
    localStorage.removeItem('currentUser');

  }
}
