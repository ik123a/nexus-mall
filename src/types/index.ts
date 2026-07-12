export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  comparePrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  description: string;
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  colors?: string[];
  sizes?: string[];
  tags: string[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  productCount: number;
  floor: number;
};

export type Floor = {
  id: number;
  name: string;
  description: string;
  theme: string;
  stores: Store[];
};

export type Store = {
  id: string;
  name: string;
  category: string;
  floor: number;
  position: { x: number; y: number };
  brand?: string;
  rating: number;
  isOpen: boolean;
  image: string;
  description: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  estimatedDelivery: string;
  trackingNumber: string;
};

export type Review = {
  id: string;
  productId: string;
  user: { name: string; avatar: string };
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  membership: "Bronze" | "Silver" | "Gold" | "Platinum" | "Nexus Elite";
  points: number;
  joinedAt: string;
};
