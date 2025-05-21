import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock } from 'lucide-react';
import { Auction } from '../../types';
import { useCountdown } from '../../hooks/useCountdown';
import { formatCurrency } from '../../utils/formatters';
import { useAuth } from '../../hooks/useAuth';
import { useAuction } from '../../hooks/useAuction';

interface AuctionCardProps {
  auction: Auction;
  featured?: boolean;
}

export const AuctionCard = ({ auction, featured = false }: AuctionCardProps) => {
  const { id, title, images, currentPrice, bids, endTime, watchlist } = auction;
  const { user } = useAuth();
  const { toggleWatchlist } = useAuction();
  const { days, hours, minutes, seconds, isExpired } = useCountdown(endTime);
  const isWatched = user && watchlist.includes(user.id);
  
  const [isHovered, setIsHovered] = useState(false);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;
    
    toggleWatchlist(id, user.id);
  };

  return (
    <Link
      to={`/auctions/${id}`}
      className={`card group block transition-all duration-300 ${
        featured ? 'flex flex-col md:flex-row overflow-hidden' : 'flex flex-col'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`relative overflow-hidden ${
          featured ? 'md:w-2/5 h-60 md:h-auto' : 'h-48 md:h-56'
        }`}
      >
        <img
          src={images[0]}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={handleWatchlistToggle}
          className={`absolute right-3 top-3 rounded-full p-2 transition-all ${
            isWatched
              ? 'bg-primary text-white'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-primary'
          }`}
        >
          <Heart className={`h-5 w-5 ${isWatched ? 'fill-current' : ''}`} />
        </button>
        
        {!isExpired && (
          <div className="absolute bottom-3 left-3 rounded-md bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              <span>
                {days > 0 ? `${days}d ` : ''}
                {hours > 0 ? `${hours}h ` : ''}
                {minutes > 0 ? `${minutes}m ` : ''}
                {seconds}s
              </span>
            </div>
          </div>
        )}
      </div>
      
      <div className={`flex flex-1 flex-col p-4 ${featured ? 'md:w-3/5' : ''}`}>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary">
          {title}
        </h3>
        
        <div className="mt-auto">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="font-semibold text-gray-900">
                {formatCurrency(currentPrice)}
              </p>
              <p className="text-sm text-gray-500">
                {bids.length} {bids.length === 1 ? 'bid' : 'bids'}
              </p>
            </div>
            
            {featured && (
              <span className="inline-flex rounded-md bg-primary-light/10 px-2 py-1 text-xs font-medium text-primary-dark">
                Featured
              </span>
            )}
            
            {isExpired && (
              <span className="inline-flex rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                Ended
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};