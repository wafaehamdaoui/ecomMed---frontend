export class Client {
  id?: number;

  loyalty_points?: number;

  name: string;

  phone: string;

  constructor(
    name: string,
    phone: string,
    loyalty_points?: number,
    id?: number
  ) {
    this.name = name;
    this.phone = phone;
    if (id) {
      this.id = id;
    }
    if (loyalty_points){
      this.loyalty_points = loyalty_points;
    }
  }
}
