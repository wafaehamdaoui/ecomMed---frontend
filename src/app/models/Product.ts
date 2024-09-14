export class Product {
  id?: number; // Optional field since it may not be present initially

  code: string;

  description?: string; // Optional field

  price: number;

  stock_quantity: number;

  image_url: string;

  categoryId: number; // Assuming Category is another class that you have defined

  constructor(
    code: string,
    price: number,
    stock_quantity: number,
    image_url: string,
    categoryId: number,
    id?: number,
    description?: string
  ) {
    this.code = code;
    this.price = price;
    this.stock_quantity = stock_quantity;
    this.image_url = image_url;
    this.categoryId = categoryId;
    if (id) {
      this.id = id;
    }
    if (description) {
      this.description = description;
    }
  }
}
