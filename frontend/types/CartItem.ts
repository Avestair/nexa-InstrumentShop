export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  color?: string;
  //   [key: string]: any;
}
