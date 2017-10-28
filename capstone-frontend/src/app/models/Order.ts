export class Order {
  orderID: string;

  constructor(data: any) {
    if (data) {
      this.orderID = data.orderID;
    }
  }
}
