export interface Product {
  _id: string;
  subcategory: string;
  name: string;
  images: string[];
  thumbnail: string;
}

export interface ProductsResponse {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  thumbnail: string;
  data: {
    products: Product[];
  };
}

export interface Subcategory {
  _id: string;
  category: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}