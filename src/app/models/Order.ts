import {OrderStatus} from "./OrderStatus";
import {OrderItem} from "./OrderItem";

export class Order {
  id?: number; // Optional field since it may not be present initially

  clientId: number;

  address: string;

  total_amount?: number;

  status: OrderStatus;

  created_at?: any ;

  orderItemResponses: OrderItem[]; // Array of OrderItem objects

  constructor(
    clientId: number,
    address: string,
    status: OrderStatus,
    orderItems: OrderItem[] = [], // Default to an empty array
    total_amount: number = 0,
    created_at?: any,
    id?: number
  ) {
    this.clientId = clientId;
    this.address = address;
    this.status = status;
    this.total_amount = total_amount;
    this.orderItemResponses = orderItems;
    if (id) {
      this.id = id;
    }
    if(created_at){
      this.created_at = created_at;
    }
  }
}
