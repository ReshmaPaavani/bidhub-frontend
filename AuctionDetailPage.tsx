import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft, User, Tag, Package, Heart, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { ImageGallery } from '../components/auctions/ImageGallery';
import { BidForm } from '../components/auctions/BidForm';
import { BidHistory } from '../components/auctions/BidHistory';
import { useAuction } from '../hooks/useAuction';
import { useAuth } from '../hooks/useAuth';
import { useCountdown } from '../hooks/useCountdown';
import { formatCurrency } from '../utils/formatters';

export const AuctionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAuction, toggleWatchlist } = useAuction();
  const { user } = useAuth();
  
  const auction = getAuction(id || '');
  
  useEffect(() => {
    if (!auction) {
      navigate('/auctions');
    }
    
    // Update page title
    if (auction) {
      document.title = `${auction.title} | BidHub`;
    }
    
    return () => {
      document.title = 'BidHub | Online Auction Platform';
    };
  }, [auction, navigate]);
  
  if (!auction) {
    return null;
  }
  
  const { days, hours, minutes, seconds, isExpired } = useCountdown(auction.endTime);
  const isWatched = user && auction.watchlist.includes(user.id);
  
  const handleWatchlistToggle = () => {
    if (!user) return;
    toggleWatchlist(auction.id, user.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb navigation */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/auctions" className="flex items-center hover:text-primary">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Auctions
            </Link>
            <span>/</span>
            <span className="text-gray-900">{auction.title}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left column - Images and details */}
          <div className="lg:col-span-3">
            <ImageGallery images={auction.images} title={auction.title} />
            
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h1 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">{auction.title}</h1>
              
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {auction.category}
                </span>
                
                {isExpired ? (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                    Auction Ended
                  </span>
                ) : (
                  <span className="flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    <Clock className="mr-1 h-3 w-3" />
                    {days > 0 && `${days}d `}
                    {hours > 0 && `${hours}h `}
                    {minutes > 0 && `${minutes}m `}
                    {seconds}s
                  </span>
                )}
                
                <span className="text-sm text-gray-500">
                  {auction.bids.length} {auction.bids.length === 1 ? 'bid' : 'bids'}
                </span>
              </div>
              
              <div className="mb-6 border-t border-gray-100 pt-5">
                <h2 className="mb-3 text-xl font-semibold text-gray-900">Description</h2>
                <p className="whitespace-pre-line text-gray-700">{auction.description}</p>
              </div>
              
              <div className="border-t border-gray-100 pt-5">
                <h2 className="mb-3 text-xl font-semibold text-gray-900">Details</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-start">
                    <User className="mr-3 h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Seller</p>
                      <p className="text-gray-900">{auction.sellerName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Tag className="mr-3 h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Starting Price</p>
                      <p className="text-gray-900">{formatCurrency(auction.startPrice)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="mr-3 h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Start Date</p>
                      <p className="text-gray-900">{format(new Date(auction.startTime), 'PPP')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="mr-3 h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">End Date</p>
                      <p className="text-gray-900">{format(new Date(auction.endTime), 'PPP')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Bidding and other info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current price and bid form */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4">
                <p className="text-sm text-gray-600">Current Price</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(auction.currentPrice)}</p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleWatchlistToggle}
                  className={`btn flex-1 ${
                    isWatched
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isWatched ? 'fill-current' : ''}`} />
                  {isWatched ? 'Watching' : 'Add to Watchlist'}
                </button>
              </div>
            </div>
            
            {/* Bid form */}
            <BidForm
              auctionId={auction.id}
              currentPrice={auction.currentPrice}
              minBid={10}
              isActive={auction.isActive}
              endTime={auction.endTime}
            />
            
            {/* Bid history */}
            <BidHistory bids={auction.bids} currentUserId={user?.id} />
            
            {/* Info cards */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-start">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Buyer Protection</h3>
                  <p className="text-sm text-gray-600">
                    Get full refund if the item is not as described or doesn't arrive
                  </p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-start">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Shipping Information</h3>
                  <p className="text-sm text-gray-600">
                    Seller typically ships within 3 business days of auction end
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};