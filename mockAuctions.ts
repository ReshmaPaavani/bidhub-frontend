import { Auction } from '../types';
import { addDays, subDays, subHours } from 'date-fns';

// Helper to generate random bids
const generateBids = (count: number, startPrice: number, userId = '123456') => {
  const bids = [];
  let currentPrice = startPrice;
  
  for (let i = 0; i < count; i++) {
    // Random increment between 5-15% of current price
    const increment = currentPrice * (0.05 + Math.random() * 0.1);
    currentPrice += increment;
    
    // Alternate between our user and random users
    const bidUserId = i % 3 === 0 ? userId : `user_${Math.floor(Math.random() * 1000)}`;
    
    bids.push({
      id: `bid_${Date.now()}_${i}`,
      userId: bidUserId,
      amount: Math.floor(currentPrice),
      time: new Date(Date.now() - (i * 60 * 60 * 1000)).toISOString() // Each bid 1 hour apart
    });
  }
  
  // Sort bids in descending time order (newest first)
  return bids.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
};

export const mockAuctions: Auction[] = [
  {
    id: 'auction_1',
    title: 'Vintage Rolex Submariner',
    description: 'Rare 1969 Rolex Submariner in excellent condition. Original box and papers included. Recently serviced and keeps perfect time.',
    images: [
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
      'https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg'
    ],
    category: 'Watches',
    startPrice: 8500,
    currentPrice: 12750,
    startTime: subDays(new Date(), 3).toISOString(),
    endTime: addDays(new Date(), 4).toISOString(),
    sellerId: 'seller_1',
    sellerName: 'Vintage Timepieces',
    isActive: true,
    bids: generateBids(15, 8500),
    watchlist: ['123456', 'user_42', 'user_99']
  },
  {
    id: 'auction_2',
    title: 'Limited Edition Gibson Les Paul Custom',
    description: 'Rare 2018 Gibson Les Paul Custom Shop limited edition in Alpine White. Immaculate condition with original hardshell case and certificate of authenticity.',
    images: [
      'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg',
      'https://images.pexels.com/photos/164951/pexels-photo-164951.jpeg'
    ],
    category: 'Musical Instruments',
    startPrice: 3999,
    currentPrice: 4750,
    startTime: subDays(new Date(), 5).toISOString(),
    endTime: addDays(new Date(), 2).toISOString(),
    sellerId: 'seller_2',
    sellerName: 'Music Collectors Inc',
    isActive: true,
    bids: generateBids(7, 3999),
    watchlist: ['user_42', 'user_77']
  },
  {
    id: 'auction_3',
    title: 'First Edition Harry Potter Book Set',
    description: 'Complete set of first edition Harry Potter books, all signed by J.K. Rowling. Excellent condition and includes custom display case.',
    images: [
      'https://images.pexels.com/photos/1560093/pexels-photo-1560093.jpeg',
      'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg'
    ],
    category: 'Books & Literature',
    startPrice: 12000,
    currentPrice: 15300,
    startTime: subDays(new Date(), 6).toISOString(),
    endTime: addDays(new Date(), 1).toISOString(),
    sellerId: 'seller_3',
    sellerName: 'Rare Books Gallery',
    isActive: true,
    bids: generateBids(10, 12000, '123456'),
    watchlist: ['123456', 'user_33']
  },
  {
    id: 'auction_4',
    title: 'Antique Persian Silk Rug',
    description: 'Handwoven Persian silk rug from the early 20th century. Exquisite craftsmanship with vibrant colors and intricate patterns. Size: 9ft x 12ft.',
    images: [
      'https://images.pexels.com/photos/4947737/pexels-photo-4947737.jpeg',
      'https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg'
    ],
    category: 'Antiques',
    startPrice: 5500,
    currentPrice: 7200,
    startTime: subDays(new Date(), 4).toISOString(),
    endTime: addDays(new Date(), 5).toISOString(),
    sellerId: 'seller_4',
    sellerName: 'Heritage Antiques',
    isActive: true,
    bids: generateBids(8, 5500),
    watchlist: ['user_22', 'user_45']
  },
  {
    id: 'auction_5',
    title: 'Restored 1965 Ford Mustang Convertible',
    description: 'Fully restored 1965 Ford Mustang Convertible in Candy Apple Red. Original 289 V8 engine, new interior, and immaculate paint. Show quality condition.',
    images: [
      'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg'
    ],
    category: 'Automobiles',
    startPrice: 65000,
    currentPrice: 79500,
    startTime: subDays(new Date(), 7).toISOString(),
    endTime: addDays(new Date(), 3).toISOString(),
    sellerId: 'seller_5',
    sellerName: 'Classic Auto Traders',
    isActive: true,
    bids: generateBids(12, 65000),
    watchlist: ['user_88', 'user_102']
  },
  {
    id: 'auction_6',
    title: 'Apple-1 Computer Original',
    description: 'Extremely rare original Apple-1 computer, fully functional with original manual and documentation. One of only 200 ever made by Steve Jobs and Steve Wozniak.',
    images: [
      'https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg',
      'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg'
    ],
    category: 'Electronics',
    startPrice: 250000,
    currentPrice: 355000,
    startTime: subDays(new Date(), 10).toISOString(),
    endTime: addDays(new Date(), 4).toISOString(),
    sellerId: 'seller_6',
    sellerName: 'Tech History Museum',
    isActive: true,
    bids: generateBids(9, 250000),
    watchlist: ['123456', 'user_55', 'user_77']
  },
  {
    id: 'auction_7',
    title: 'Original Banksy Artwork',
    description: 'Authenticated Banksy piece with certificate of authenticity from Pest Control. Comes with museum quality framing and UV-protective glass.',
    images: [
      'https://images.pexels.com/photos/20967/pexels-photo.jpg',
      'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg'
    ],
    category: 'Art',
    startPrice: 180000,
    currentPrice: 226500,
    startTime: subDays(new Date(), 8).toISOString(),
    endTime: addDays(new Date(), 6).toISOString(),
    sellerId: 'seller_7',
    sellerName: 'Modern Art Gallery',
    isActive: true,
    bids: generateBids(14, 180000),
    watchlist: ['user_34', 'user_87']
  },
  {
    id: 'auction_8',
    title: 'Vintage Leica M3 Camera',
    description: 'Collectible Leica M3 camera in perfect working condition. Includes original leather case and 50mm Summicron lens. Serial number dates to 1955.',
    images: [
      'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg',
      'https://images.pexels.com/photos/821736/pexels-photo-821736.jpeg'
    ],
    category: 'Photography',
    startPrice: 3200,
    currentPrice: 4100,
    startTime: subDays(new Date(), 5).toISOString(),
    endTime: addDays(new Date(), 2).toISOString(),
    sellerId: 'seller_8',
    sellerName: 'Classic Camera Shop',
    isActive: true,
    bids: generateBids(11, 3200, '123456'),
    watchlist: ['123456', 'user_91']
  },
  {
    id: 'auction_9',
    title: 'Antique Diamond Engagement Ring',
    description: 'Exquisite Art Deco diamond ring from the 1920s. Features a 1.5 carat old European cut center diamond with sapphire accents in platinum setting.',
    images: [
      'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg',
      'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg'
    ],
    category: 'Jewelry',
    startPrice: 9800,
    currentPrice: 12200,
    startTime: subDays(new Date(), 4).toISOString(),
    endTime: addDays(new Date(), 3).toISOString(),
    sellerId: 'seller_9',
    sellerName: 'Heritage Jewelers',
    isActive: true,
    bids: generateBids(8, 9800),
    watchlist: ['user_44', 'user_67']
  },
  {
    id: 'auction_10',
    title: 'Rare First Edition Comic Book Collection',
    description: 'Complete collection of rare first edition comic books including Action Comics #1, Detective Comics #27, and Amazing Fantasy #15. All professionally graded and slabbed.',
    images: [
      'https://images.pexels.com/photos/16516/pexels-photo.jpg',
      'https://images.pexels.com/photos/5797991/pexels-photo-5797991.jpeg'
    ],
    category: 'Collectibles',
    startPrice: 450000,
    currentPrice: 575000,
    startTime: subDays(new Date(), 12).toISOString(),
    endTime: addDays(new Date(), 8).toISOString(),
    sellerId: 'seller_10',
    sellerName: 'Collectible Treasures',
    isActive: true,
    bids: generateBids(16, 450000),
    watchlist: ['123456', 'user_29', 'user_63']
  },
  // Auction that has already ended
  {
    id: 'auction_11',
    title: 'Rare Stradivarius Violin',
    description: 'Exceptional 18th century Stradivarius violin with provenance documents and authentication certificates. In pristine condition with original case.',
    images: [
      'https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg',
      'https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg'
    ],
    category: 'Musical Instruments',
    startPrice: 1200000,
    currentPrice: 1850000,
    startTime: subDays(new Date(), 15).toISOString(),
    endTime: subHours(new Date(), 12).toISOString(), // Already ended
    sellerId: 'seller_11',
    sellerName: 'Fine Instrument Auctions',
    isActive: false,
    bids: generateBids(22, 1200000),
    watchlist: ['user_11', 'user_73']
  }
];