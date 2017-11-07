import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {User} from "../models/User";


@Injectable()
export class LoginService {
  public isLoggedIn = false;
  public user;
  constructor(private _http: Http) {
  }

  public checkLogged(): boolean {
    return this.isLoggedIn;
  }

  public setLogin(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }

  setUser(data) {
    this.user = new User(data);
  }

  getUser() {
    return this.user;
  }

  login(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  registration(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.text());
  }

  updateCompanyProfile(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }


}
