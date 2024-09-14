import {Product} from "./Product";

export class CartItem {
  product: Product;
  quantity: number;
  price: number;

  constructor(
    product: Product,
    quantity: number,
    price: number,
  ) {
    this.product = product;
    this.quantity = quantity;
    this.price = price
  }
}
