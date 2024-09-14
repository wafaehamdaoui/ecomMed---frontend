import {CartItem} from "./CartItem";

export class Cart {
  items: CartItem[];
  totalAmount: number;

  constructor(
    items: CartItem[] = [],
    totalAmount:number = 0
  ) {
    this.items = items,
      this.totalAmount =  totalAmount
  }
}
