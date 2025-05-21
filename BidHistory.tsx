import { format } from 'date-fns';
import { Bid } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface BidHistoryProps {
  bids: Bid[];
  currentUserId?: string;
}

export const BidHistory = ({ bids, currentUserId }: BidHistoryProps) => {
  if (bids.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
        <p className="text-gray-500">No bids yet. Be the first to bid!</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-3">
        <h3 className="text-lg font-semibold text-gray-900">Bid History</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {bids.map((bid) => {
          const isCurrentUser = bid.userId === currentUserId;
          
          return (
            <li key={bid.id} className={`px-4 py-3 transition-colors ${isCurrentUser ? 'bg-primary/5' : ''}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {formatCurrency(bid.amount)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Bidder {bid.userId.slice(0, 4)}...{bid.userId.slice(-4)} 
                    {isCurrentUser && <span className="ml-1 font-medium text-primary">(You)</span>}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(bid.time), 'MMM d, h:mm a')}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};