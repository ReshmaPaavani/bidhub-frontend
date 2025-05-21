import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="hidden flex-1 items-center justify-center bg-primary-dark md:flex">
        <div className="max-w-md px-8 text-white">
          <h1 className="mb-4 text-4xl font-bold">Welcome to BidHub</h1>
          <p className="mb-6 text-lg leading-relaxed text-white/90">
            Sign in to access your account, track your bids, and participate in exciting auctions.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-white/10 p-2">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Secure Bidding</h3>
                <p className="text-sm text-white/80">Bid with confidence on our secure platform</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-white/10 p-2">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Real-time Updates</h3>
                <p className="text-sm text-white/80">Get instant notifications on your auction activity</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-white/10 p-2">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Easy Transactions</h3>
                <p className="text-sm text-white/80">Smooth buying and selling process from start to finish</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </div>
  );
};