export type productColor = {
  name: string;
  hex: string;
};

export type productTypes = {
  id: string;
  title: string;
  description: string;
  price: number;
  discount?: number;
  images: string[];
  imageUrl: string;
  originalPrice: number;
  colors: productColor[];
  sizes: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
};
