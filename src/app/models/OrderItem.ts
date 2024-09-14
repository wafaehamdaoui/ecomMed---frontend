import {Product} from "./Product";

export class OrderItem {
  id?: number;

  orderId?: number;
  productId?: number;

  productResponse: Product;

  quantity: number;

  amount?: number;

  constructor(
    orderId: number,
    product: Product,
    quantity: number,
    amount?: number,
    productId?: number,
    id?: number
  ) {
    this.productResponse = product;
    this.quantity = quantity;
    if (id) {
      this.id = id;
    }
    if (amount) {
      this.amount = amount;
    }
    if (orderId) {
      this.orderId = orderId;
    }
    if (productId) {
      this.productId = productId;
    }
  }
}
