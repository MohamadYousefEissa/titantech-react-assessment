export interface Cart {
  id: number;
  products: CartItem[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalQuantity: number;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  discountPercentage?: number;
  discountedTotal?: number;
  quantity: number;
  total: number;
  thumbnail: string;
}
