export interface Bid {
  id: string;
  userId: string;
  amount: number;
  time: string;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  startPrice: number;
  currentPrice: number;
  startTime: string;
  endTime: string;
  sellerId: string;
  sellerName: string;
  isActive: boolean;
  bids: Bid[];
  watchlist: string[];
}

export interface AuctionFormData {
  title: string;
  description: string;
  images?: string[];
  category: string;
  startPrice: number;
  endTime: Date;
  sellerId: string;
  sellerName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}