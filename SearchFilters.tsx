import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (query: string, filters: Record<string, any>) => void;
}

export const SearchFilters = ({ onSearch }: SearchFiltersProps) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [onlyActive, setOnlyActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, {
      category: category || undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      onlyActive
    });
  };

  const clearFilters = () => {
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setOnlyActive(true);
    onSearch(query, { onlyActive: true });
  };

  return (
    <div className="mb-8 w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search auctions..."
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary md:w-auto"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {(category || minPrice || maxPrice || !onlyActive) && (
              <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                !
              </span>
            )}
          </button>
          <button
            type="submit"
            className="btn btn-primary md:w-auto"
          >
            Search
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-lg font-medium text-gray-900">Filters</h3>
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-medium text-primary hover:text-primary-dark"
              >
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-1 gap-y-4 pt-4 sm:grid-cols-2 md:grid-cols-4 md:gap-x-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">All Categories</option>
                  <option value="Art">Art</option>
                  <option value="Antiques">Antiques</option>
                  <option value="Automobiles">Automobiles</option>
                  <option value="Books & Literature">Books & Literature</option>
                  <option value="Collectibles">Collectibles</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Jewelry">Jewelry</option>
                  <option value="Musical Instruments">Musical Instruments</option>
                  <option value="Photography">Photography</option>
                  <option value="Watches">Watches</option>
                </select>
              </div>

              <div>
                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                  Min Price
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    id="minPrice"
                    className="block w-full rounded-md border border-gray-300 py-2 pl-7 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                  Max Price
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    id="maxPrice"
                    className="block w-full rounded-md border border-gray-300 py-2 pl-7 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Any"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="onlyActive"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={onlyActive}
                  onChange={(e) => setOnlyActive(e.target.checked)}
                />
                <label htmlFor="onlyActive" className="ml-2 block text-sm text-gray-700">
                  Show only active auctions
                </label>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};