export class Order {
  orderID: string;
  productPrice: number;
  shipPrice: number;
  totalPrice: number;

  constructor(data: any) {
    if (data) {
      this.orderID = data.orderID;
      this.productPrice = data.productPrice;
      this.shipPrice = data.shipPrice;
      this.totalPrice = data.totalPrice;
    }
  }
}
