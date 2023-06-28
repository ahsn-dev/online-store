export interface Product {
  _id?: string;
  productId?: string;
  product?: {
    name: string;
    price: number;
  };
  name: string;
  image: string;
  images?: string[];
  thumbnail?: string;
  price: number;
  quantity?: number;
  subcategory?: string;
  count?: number;
}
