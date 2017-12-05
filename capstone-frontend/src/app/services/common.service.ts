import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Post} from "../models/Post";
import {Order} from "../models/Order";



@Injectable()
export class CommonService {
  public Post;
  public BrandID;
  public searchValue;
  public catalogID;
  public order;


  constructor(private _http: Http) {
  }

  showLoginForm() {
    document.getElementById('openModalButton').click();
  }

  statisticSupplier(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  getListCity(apiUrl): Observable<any> {
    return this._http.get(apiUrl).map((response: Response) => response.json());
  }

  getListDistrict(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  getListWard(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  viewProfileDetail(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  setOrder(data) {
    this.order = new Order(data);
  }

  getOrder() {
    return this.order;
  }

  setPost(data) {
    this.Post = new Post(data);
  }

  getPost() {
    return this.Post;
  }

  setBrandID(data) {
    this.BrandID = data;
  }

  getBrandID() {
    return this.BrandID;
  }

  setCatalogID(data) {
    this.catalogID = data;
  }

  getCatalogID() {
    return this.catalogID;
  }

  setSearchValue(data) {
    this.searchValue = data;
  }

  getSearchValue() {
    return this.searchValue;
  }

}
