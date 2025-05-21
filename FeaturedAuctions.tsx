import { useAuction } from '../../hooks/useAuction';
import { AuctionCard } from './AuctionCard';

export const FeaturedAuctions = () => {
  const { featuredAuctions } = useAuction();

  if (featuredAuctions.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Featured Auctions</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {featuredAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} featured />
          ))}
        </div>
      </div>
    </section>
  );
};