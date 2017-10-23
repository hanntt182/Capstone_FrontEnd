export class Post {
  CatalogID;

  constructor(data: any) {
    if (data) {
      this.CatalogID = data.CatalogID;
    }
  }
}
