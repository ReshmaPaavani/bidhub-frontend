import { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useAuction } from '../../hooks/useAuction';
import { useAuth } from '../../hooks/useAuth';
import { formatCurrency } from '../../utils/formatters';

interface BidFormProps {
  auctionId: string;
  currentPrice: number;
  minBid: number;
  isActive: boolean;
  endTime: string;
}

export const BidForm = ({ auctionId, currentPrice, minBid, isActive, endTime }: BidFormProps) => {
  const [bidAmount, setBidAmount] = useState(currentPrice + minBid);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { placeBid } = useAuction();
  const { user, isAuthenticated } = useAuth();

  const isEndingSoon = new Date(endTime).getTime() - Date.now() < 24 * 60 * 60 * 1000;
  const isEnded = new Date(endTime) < new Date();

  const handleBidSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      toast.error('Please sign in to place a bid');
      return;
    }
    
    if (bidAmount <= currentPrice) {
      toast.error(`Bid must be higher than ${formatCurrency(currentPrice)}`);
      return;
    }
    
    if (!isActive || isEnded) {
      toast.error('This auction has ended');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await placeBid(auctionId, bidAmount, user.id);
      if (success) {
        setBidAmount(bidAmount + minBid);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEnded) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
        <p className="text-lg font-medium text-gray-700">This auction has ended</p>
        <p className="text-gray-500">Final price: {formatCurrency(currentPrice)}</p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border ${isEndingSoon ? 'border-warning bg-warning/5' : 'border-gray-200 bg-white'} p-4 shadow-sm`}>
      <div className="mb-4">
        <div className="flex items-baseline justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Place Your Bid</h3>
          {isEndingSoon && (
            <span className="animate-pulse rounded-full bg-warning/10 px-2 py-1 text-xs font-medium text-warning">
              Ending Soon!
            </span>
          )}
        </div>
        <p className="text-gray-600">
          Current bid: <span className="font-semibold">{formatCurrency(currentPrice)}</span>
        </p>
        <p className="text-sm text-gray-500">
          Minimum bid: {formatCurrency(currentPrice + minBid)}
        </p>
      </div>

      <form onSubmit={handleBidSubmit}>
        <div className="mb-4">
          <label htmlFor="bidAmount" className="mb-1 block text-sm font-medium text-gray-700">
            Your Bid Amount
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="bidAmount"
              min={currentPrice + minBid}
              step="1"
              className="input w-full pl-7"
              value={bidAmount}
              onChange={(e) => setBidAmount(parseFloat(e.target.value))}
              disabled={isSubmitting || !isActive || !isAuthenticated}
            />
          </div>
        </div>

        {!isAuthenticated ? (
          <div className="mb-4 rounded-md bg-gray-50 p-3 text-center text-sm text-gray-600">
            Please <a href="/login" className="font-medium text-primary hover:underline">sign in</a> to place a bid
          </div>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting || !isActive}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Processing...
              </span>
            ) : (
              `Bid ${formatCurrency(bidAmount)}`
            )}
          </button>
        )}

        <p className="mt-3 text-center text-xs text-gray-500">
          By placing a bid, you agree to our <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
        </p>
      </form>
    </div>
  );
};