import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public mainImage = 'https://cdn.tgdd.vn/Products/Images/42/87840/iphone-7-plus-256gb-jet-black-3-400x460.png';

  constructor() {
  }

  ngOnInit() {
  }

  setImage($event) {
    this.mainImage = $event.target.src;
  }
}
