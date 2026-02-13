export interface CartItem {
  productId: number;
  quantity: number;
  price: number;
  title: string;
  image: string;
}

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}
