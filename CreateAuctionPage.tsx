import { AuctionForm } from '../components/auctions/AuctionForm';

export const CreateAuctionPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Auction</h1>
          <p className="mt-2 text-gray-600">
            List your item for auction and start receiving bids
          </p>
        </div>

        <AuctionForm />
      </div>
    </div>
  );
};