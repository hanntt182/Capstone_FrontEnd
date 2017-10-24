import {Injectable} from '@angular/core';
import {Post} from "../models/Post";


@Injectable()
export class CommonService {
  public Post: Post;
  public BrandID;
  public searchValue;


  constructor() {
  }

  showLoginForm() {
    document.getElementById('openModalButton').click();
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

  setSearchValue(data) {
    this.searchValue = data;
  }

  getSearchValue() {
    return this.searchValue;
  }

}
