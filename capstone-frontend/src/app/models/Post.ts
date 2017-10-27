export class Post {
  postId;
  supplier;
  product;
  brand;
  catalog;
  status;
  postTitle;
  primaryImage: string;
  minOrderQuantity;
  minPrice;
  maxPrice;
  lastUpdatedDay;
  unit;
  supplierAbility;
  color;
  warranty;
  currentNumberOrder;
  postImages;
  postDescriptions;
  review;
  maxNumberOrder;

  constructor(data: any) {
    if (data) {
      this.postId = data.postId;
      this.supplier = data.supplier;
      this.product = data.product;
      this.brand = data.brand;
      this.catalog = data.catalog;
      this.status = data.status;
      this.postTitle = data.postTitle;
      this.primaryImage = data.primaryImage;
      this.minOrderQuantity = data.minOrderQuantity;
      this.minPrice = data.minPrice;
      this.maxPrice = data.maxPrice;
      this.lastUpdatedDay = data.lastUpdatedDay;
      this.unit = data.unit;
      this.supplierAbility = data.supplierAbility;
      this.color = data.color;
      this.warranty = data.warranty;
      this.currentNumberOrder = data.currentNumberOrder;
      this.postImages = data.postImages;
      this.postDescriptions = data.postDescriptions;
      this.review = data.review;
      this.maxNumberOrder = data.maxNumberOrder;
    }
  }
}
