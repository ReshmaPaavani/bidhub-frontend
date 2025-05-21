import { Auction } from '../../types';
import { AuctionCard } from './AuctionCard';

interface AuctionGridProps {
  auctions: Auction[];
  emptyMessage?: string;
}

export const AuctionGrid = ({ auctions, emptyMessage = 'No auctions found' }: AuctionGridProps) => {
  if (auctions.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <div>
          <p className="text-lg font-medium text-gray-600">{emptyMessage}</p>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {auctions.map((auction) => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </div>
  );
};