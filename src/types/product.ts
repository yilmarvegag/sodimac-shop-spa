export type ApiResponse = {
  data: {
    results: Product[];
  };
};

export interface Price {
  label: string;
  type: string;
  symbol: string;
  price: string;
  unit: string;
  priceWithoutFormatting: number;
}

export interface Highlight {
  key: string;
  value: string;
}

export interface Badge {
  type: string;
  value: string;
}

export interface Product {
  productId: string;
  skuId: string;
  displayName: string;
  brand: string;
  model?: string;
  prices: Price[];
  mediaUrls: string[];
  highlights: Highlight[];
  badges: Badge[];
  rating?: string;
  totalReviews?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}