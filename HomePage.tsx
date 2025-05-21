import { Link } from 'react-router-dom';
import { ArrowRight, Gavel, Package, Clock, Shield } from 'lucide-react';
import { FeaturedAuctions } from '../components/auctions/FeaturedAuctions';
import { useAuction } from '../hooks/useAuction';
import { AuctionGrid } from '../components/auctions/AuctionGrid';

export const HomePage = () => {
  const { auctions } = useAuction();
  
  // Get recent active auctions
  const recentAuctions = auctions
    .filter(auction => auction.isActive)
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
    .slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-dark via-primary to-primary-light py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Discover Unique Treasures at Your Fingertips
            </h1>
            <p className="mb-8 text-lg text-white/90">
              Bid on exclusive items or sell your valuables on the web's premier auction platform
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Link to="/auctions" className="btn bg-white text-primary hover:bg-gray-100">
                Browse Auctions
              </Link>
              <Link to="/create-auction" className="btn border border-white bg-transparent hover:bg-white/10">
                Start Selling
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute left-0 right-0 bottom-0 h-16 w-full overflow-hidden">
          <svg
            className="absolute bottom-0 w-full text-gray-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Featured Auctions */}
      <FeaturedAuctions />

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">How BidHub Works</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Our simple process makes it easy to buy and sell items through online auctions
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Gavel className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Create an Account</h3>
              <p className="text-gray-600">
                Sign up for free and get access to all features on our platform
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Package className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">List or Find Items</h3>
              <p className="text-gray-600">
                Browse thousands of listings or create your own auction
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Bid and Win</h3>
              <p className="text-gray-600">
                Place competitive bids and track auctions until they close
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure Transactions</h3>
              <p className="text-gray-600">
                Complete your purchase or sale with our secure payment system
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/help" className="inline-flex items-center text-primary hover:underline">
              Learn more about our process
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Auctions */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Recent Auctions</h2>
            <Link
              to="/auctions"
              className="flex items-center text-sm font-medium text-primary hover:underline"
            >
              View all auctions
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <AuctionGrid auctions={recentAuctions} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-dark py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Start Bidding?</h2>
            <p className="mb-8 text-lg text-white/90">
              Join thousands of users buying and selling unique items every day
            </p>
            <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100">
              Create an Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};