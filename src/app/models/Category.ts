import {Product} from "./Product";


export class Category {
  id?: number; // Optional field since it may not be present initially

  name: string;

  description?: string; // Optional field

  products: Product[]; // Array of Product objects

  constructor(
    name: string,
    products: Product[] = [], // Default to an empty array
    id?: number,
    description?: string
  ) {
    this.name = name;
    this.products = products;
    if (id) {
      this.id = id;
    }
    if (description) {
      this.description = description;
    }
  }
}
