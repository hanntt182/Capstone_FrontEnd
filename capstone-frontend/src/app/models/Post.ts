export class Post {
  CatalogID;
  public primaryImage;
  public postId;
  public post;
  public descriptions;
  public extraImages;
  public postTitle;
  public productName;
  public brandName;
  public catalogName;
  public minPrice;
  public maxPrice;
  public unit;
  public minOrderQuantity;
  public supplierAbility;
  public username;
  public colorName;
  public warranty;
  public companyLogo;
  public companyName;
  public companyAddress;
  public companyPhone;
  public companyWebsite;
  public establishedYear;
  public companyEmail;
  public companyFax;

  constructor(data: any) {
    if (data) {
      this.CatalogID = data.CatalogID;
      this.postId = data.postId;
      this.post = data.post;
      this.descriptions = data.descriptions;
      this.extraImages = data.extraImages;
      this.postTitle = data.postTitle;
      this.productName = data.productName;
      this.brandName = data.brandName;
      this.catalogName = data.catalogName;
      this.minPrice = data.minPrice;
      this.maxPrice = data.maxPrice;
      this.unit = data.unit;
      this.minOrderQuantity = data.minOrderQuantity;
      this.supplierAbility = data.supplierAbility;
      this.username = data.username;
      this.colorName = data.colorName;
      this.warranty = data.warranty;
      this.companyLogo = data.companyLogo;
      this.companyName = data.companyName;
      this.companyAddress = data.companyAddress;
      this.companyPhone = data.companyPhone;
      this.companyWebsite = data.companyWebsite;
      this.establishedYear = data.establishedYear;
      this.companyEmail = data.companyEmail;
      this.companyFax = data.companyFax;
    }
  }
}
