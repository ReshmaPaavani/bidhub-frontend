import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Gavel, Package, Heart, Clock, Plus, ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAuction } from '../hooks/useAuction';
import { AuctionCard } from '../components/auctions/AuctionCard';
import { formatCurrency } from '../utils/formatters';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { getUserAuctions, getUserBids, auctions } = useAuction();
  const [activeTab, setActiveTab] = useState('my-bids');
  
  if (!user) return null;
  
  const userAuctions = getUserAuctions(user.id);
  const userBids = getUserBids(user.id);
  const watchedAuctions = auctions.filter(auction => auction.watchlist.includes(user.id));
  
  const activeAuctions = userAuctions.filter(auction => auction.isActive);
  const endedAuctions = userAuctions.filter(auction => !auction.isActive);
  
  const activeBids = userBids
    .filter(({ auction }) => auction.isActive)
    .sort((a, b) => new Date(b.bid.time).getTime() - new Date(a.bid.time).getTime());
  
  const wonAuctions = userBids
    .filter(({ auction, bid }) => {
      if (auction.isActive) return false;
      const highestBid = auction.bids[0];
      return highestBid && highestBid.userId === user.id;
    })
    .map(({ auction }) => auction);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your auctions, bids, and account
          </p>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-primary/10 p-3 text-primary">
                <Gavel className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Bids</p>
                <p className="text-2xl font-bold text-gray-900">{activeBids.length}</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-success/10 p-3 text-success">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Won Auctions</p>
                <p className="text-2xl font-bold text-gray-900">{wonAuctions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-secondary/10 p-3 text-secondary">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">My Auctions</p>
                <p className="text-2xl font-bold text-gray-900">{userAuctions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-accent/10 p-3 text-accent">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Watchlist</p>
                <p className="text-2xl font-bold text-gray-900">{watchedAuctions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Create Auction Button */}
        <div className="mb-8 flex justify-end">
          <Link to="/create-auction" className="btn btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            Create New Auction
          </Link>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('my-bids')}
              className={`py-4 text-sm font-medium ${
                activeTab === 'my-bids'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              My Bids
            </button>
            <button
              onClick={() => setActiveTab('my-auctions')}
              className={`py-4 text-sm font-medium ${
                activeTab === 'my-auctions'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              My Auctions
            </button>
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`py-4 text-sm font-medium ${
                activeTab === 'watchlist'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Watchlist
            </button>
            <button
              onClick={() => setActiveTab('won')}
              className={`py-4 text-sm font-medium ${
                activeTab === 'won'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Won Auctions
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'my-bids' && (
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">My Bids</h2>
            
            {activeBids.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                <p className="text-lg font-medium text-gray-600">You haven't placed any bids yet</p>
                <p className="mt-1 text-gray-500">Start browsing auctions to find items you're interested in</p>
                <Link to="/auctions" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
                  Browse auctions
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Item
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Your Bid
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Current Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Bid Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {activeBids.map(({ auction, bid }) => (
                      <tr key={bid.id}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          {auction.title}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {formatCurrency(bid.amount)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {formatCurrency(auction.currentPrice)}
                          {auction.currentPrice > bid.amount && (
                            <span className="ml-2 text-error">Outbid</span>
                          )}
                          {auction.currentPrice === bid.amount && (
                            <span className="ml-2 text-success">Leading</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {auction.isActive ? 'Active' : 'Ended'}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {format(new Date(bid.time), 'MMM d, h:mm a')}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <Link to={`/auctions/${auction.id}`} className="text-primary hover:underline">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'my-auctions' && (
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">My Auctions</h2>
            
            {userAuctions.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                <p className="text-lg font-medium text-gray-600">You haven't created any auctions yet</p>
                <p className="mt-1 text-gray-500">Start selling your items by creating an auction</p>
                <Link to="/create-auction" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
                  Create an auction
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                <h3 className="mb-3 text-lg font-medium text-gray-900">Active Auctions</h3>
                {activeAuctions.length === 0 ? (
                  <p className="mb-6 text-gray-500">You don't have any active auctions</p>
                ) : (
                  <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {activeAuctions.map((auction) => (
                      <AuctionCard key={auction.id} auction={auction} />
                    ))}
                  </div>
                )}
                
                <h3 className="mb-3 text-lg font-medium text-gray-900">Ended Auctions</h3>
                {endedAuctions.length === 0 ? (
                  <p className="text-gray-500">You don't have any ended auctions</p>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {endedAuctions.map((auction) => (
                      <AuctionCard key={auction.id} auction={auction} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'watchlist' && (
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">My Watchlist</h2>
            
            {watchedAuctions.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                <p className="text-lg font-medium text-gray-600">Your watchlist is empty</p>
                <p className="mt-1 text-gray-500">Add items to your watchlist to keep track of auctions you're interested in</p>
                <Link to="/auctions" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
                  Browse auctions
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {watchedAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'won' && (
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Won Auctions</h2>
            
            {wonAuctions.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                <p className="text-lg font-medium text-gray-600">You haven't won any auctions yet</p>
                <p className="mt-1 text-gray-500">Keep bidding to win auctions and see them here</p>
                <Link to="/auctions" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
                  Browse auctions
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {wonAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};