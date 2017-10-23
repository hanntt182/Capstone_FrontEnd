import {Injectable} from '@angular/core';
import {Post} from "../models/Post";


@Injectable()
export class CommonService {
  public Post: Post;


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

}
