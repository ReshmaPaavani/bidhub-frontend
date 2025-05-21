import { createContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { mockAuctions } from '../data/mockAuctions';
import { Auction, Bid, AuctionFormData } from '../types';

interface AuctionContextType {
  auctions: Auction[];
  featuredAuctions: Auction[];
  isLoading: boolean;
  getAuction: (id: string) => Auction | undefined;
  getUserAuctions: (userId: string) => Auction[];
  getUserBids: (userId: string) => { auction: Auction, bid: Bid }[];
  searchAuctions: (query: string, filters?: Record<string, any>) => Auction[];
  createAuction: (data: AuctionFormData) => Promise<string | null>;
  placeBid: (auctionId: string, amount: number, userId: string) => Promise<boolean>;
  toggleWatchlist: (auctionId: string, userId: string) => void;
}

export const AuctionContext = createContext<AuctionContextType>({
  auctions: [],
  featuredAuctions: [],
  isLoading: false,
  getAuction: () => undefined,
  getUserAuctions: () => [],
  getUserBids: () => [],
  searchAuctions: () => [],
  createAuction: async () => null,
  placeBid: async () => false,
  toggleWatchlist: () => {},
});

interface AuctionProviderProps {
  children: ReactNode;
}

export const AuctionProvider = ({ children }: AuctionProviderProps) => {
  const [auctions, setAuctions] = useState<Auction[]>(mockAuctions);
  const [isLoading, setIsLoading] = useState(false);

  // Get featured auctions (those ending soon or with high activity)
  const featuredAuctions = useMemo(() => {
    return auctions
      .filter(auction => auction.isActive && auction.bids.length > 0)
      .sort((a, b) => {
        // Sort by a combination of time left and bid count
        const aScore = a.bids.length * 10 + (new Date(a.endTime).getTime() - Date.now());
        const bScore = b.bids.length * 10 + (new Date(b.endTime).getTime() - Date.now());
        return bScore - aScore;
      })
      .slice(0, 4);
  }, [auctions]);

  const getAuction = useCallback((id: string) => {
    return auctions.find(auction => auction.id === id);
  }, [auctions]);

  const getUserAuctions = useCallback((userId: string) => {
    return auctions.filter(auction => auction.sellerId === userId);
  }, [auctions]);

  const getUserBids = useCallback((userId: string) => {
    const result: { auction: Auction, bid: Bid }[] = [];
    
    auctions.forEach(auction => {
      const userBids = auction.bids.filter(bid => bid.userId === userId);
      userBids.forEach(bid => {
        result.push({ auction, bid });
      });
    });
    
    return result.sort((a, b) => new Date(b.bid.time).getTime() - new Date(a.bid.time).getTime());
  }, [auctions]);

  const searchAuctions = useCallback((query: string, filters?: Record<string, any>) => {
    let results = [...auctions];
    
    // Apply text search
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(auction => 
        auction.title.toLowerCase().includes(lowerQuery) || 
        auction.description.toLowerCase().includes(lowerQuery) ||
        auction.category.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Apply filters if provided
    if (filters) {
      if (filters.category) {
        results = results.filter(auction => auction.category === filters.category);
      }
      
      if (filters.minPrice !== undefined) {
        results = results.filter(auction => auction.currentPrice >= filters.minPrice);
      }
      
      if (filters.maxPrice !== undefined) {
        results = results.filter(auction => auction.currentPrice <= filters.maxPrice);
      }
      
      if (filters.onlyActive) {
        results = results.filter(auction => auction.isActive);
      }
    }
    
    return results;
  }, [auctions]);

  const createAuction = useCallback(async (data: AuctionFormData): Promise<string | null> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAuction: Auction = {
        id: `auction_${Date.now()}`,
        title: data.title,
        description: data.description,
        images: data.images || ['https://images.pexels.com/photos/5797991/pexels-photo-5797991.jpeg'],
        category: data.category,
        startPrice: data.startPrice,
        currentPrice: data.startPrice,
        startTime: new Date().toISOString(),
        endTime: data.endTime.toISOString(),
        sellerId: data.sellerId,
        sellerName: data.sellerName,
        isActive: true,
        bids: [],
        watchlist: []
      };
      
      setAuctions(prev => [newAuction, ...prev]);
      toast.success('Auction created successfully!');
      return newAuction.id;
    } catch (error) {
      console.error('Create auction failed:', error);
      toast.error('Failed to create auction. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const placeBid = useCallback(async (auctionId: string, amount: number, userId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setAuctions(prev => prev.map(auction => {
        if (auction.id === auctionId) {
          // Ensure bid is higher than current price
          if (amount <= auction.currentPrice) {
            throw new Error('Bid must be higher than the current price');
          }
          
          // Check if auction is still active
          if (!auction.isActive || new Date(auction.endTime) < new Date()) {
            throw new Error('Auction has ended');
          }
          
          const newBid: Bid = {
            id: `bid_${Date.now()}`,
            userId,
            amount,
            time: new Date().toISOString()
          };
          
          return {
            ...auction,
            currentPrice: amount,
            bids: [newBid, ...auction.bids]
          };
        }
        return auction;
      }));
      
      toast.success('Bid placed successfully!');
      return true;
    } catch (error) {
      console.error('Place bid failed:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to place bid');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleWatchlist = useCallback((auctionId: string, userId: string) => {
    setAuctions(prev => prev.map(auction => {
      if (auction.id === auctionId) {
        const isWatched = auction.watchlist.includes(userId);
        const newWatchlist = isWatched
          ? auction.watchlist.filter(id => id !== userId)
          : [...auction.watchlist, userId];
        
        toast.info(isWatched ? 'Removed from watchlist' : 'Added to watchlist');
        
        return {
          ...auction,
          watchlist: newWatchlist
        };
      }
      return auction;
    }));
  }, []);

  const value = useMemo(() => ({
    auctions,
    featuredAuctions,
    isLoading,
    getAuction,
    getUserAuctions,
    getUserBids,
    searchAuctions,
    createAuction,
    placeBid,
    toggleWatchlist,
  }), [auctions, featuredAuctions, isLoading, getAuction, getUserAuctions, getUserBids, searchAuctions, createAuction, placeBid, toggleWatchlist]);

  return (
    <AuctionContext.Provider value={value}>
      {children}
    </AuctionContext.Provider>
  );
};