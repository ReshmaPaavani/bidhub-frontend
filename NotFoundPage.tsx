import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-16 text-center">
      <h1 className="mb-4 text-9xl font-bold text-primary">404</h1>
      <h2 className="mb-6 text-3xl font-bold text-gray-900">Page Not Found</h2>
      <p className="mb-8 max-w-md text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
        <Link to="/" className="btn btn-primary">
          Go to Homepage
        </Link>
        <Link to="/auctions" className="btn btn-outline">
          Browse Auctions
        </Link>
      </div>
    </div>
  );
};