export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface StoreState {
  products: Product[];
  cart: CartItem[];
}

export interface StoreEvents {
  "products/set": Product[];
  "cart/add": Product;
  "cart/remove": string;
  "cart/increase": string;
  "cart/decrease": string;
}
