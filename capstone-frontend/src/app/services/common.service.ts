import {Injectable} from '@angular/core';
import {Post} from "../models/Post";
import {Order} from "../models/Order";


@Injectable()
export class CommonService {
  public Post;
  public BrandID;
  public searchValue;
  public catalogID;
  public order;


  constructor() {
  }

  showLoginForm() {
    document.getElementById('openModalButton').click();
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
