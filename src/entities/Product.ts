export interface Product {
  _id?: string;
  productId?: string;
  name: string;
  image: string;
  images?: string[];
  thumbnail?: string;
  price: number;
  quantity?: number;
  subcategory?: string;
}
