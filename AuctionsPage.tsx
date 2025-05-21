import { useState } from 'react';
import { SearchFilters } from '../components/auctions/SearchFilters';
import { AuctionGrid } from '../components/auctions/AuctionGrid';
import { useAuction } from '../hooks/useAuction';

export const AuctionsPage = () => {
  const { auctions, searchAuctions } = useAuction();
  const [filteredAuctions, setFilteredAuctions] = useState(auctions.filter(a => a.isActive));
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({ onlyActive: true });

  const handleSearch = (query: string, filters: Record<string, any>) => {
    setSearchQuery(query);
    setActiveFilters(filters);
    setFilteredAuctions(searchAuctions(query, filters));
  };

  const getFilterSummary = () => {
    const parts = [];
    
    if (searchQuery) {
      parts.push(`"${searchQuery}"`);
    }
    
    if (activeFilters.category) {
      parts.push(activeFilters.category);
    }
    
    if (activeFilters.minPrice !== undefined) {
      parts.push(`Min $${activeFilters.minPrice}`);
    }
    
    if (activeFilters.maxPrice !== undefined) {
      parts.push(`Max $${activeFilters.maxPrice}`);
    }
    
    if (activeFilters.onlyActive) {
      parts.push('Active only');
    }
    
    return parts.join(' · ');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Auctions</h1>
          <p className="mt-2 text-gray-600">
            Find unique items and place your bids on our secure platform
          </p>
        </div>

        <SearchFilters onSearch={handleSearch} />

        {getFilterSummary() && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Filters:</span> {getFilterSummary()}
            </p>
          </div>
        )}

        <AuctionGrid 
          auctions={filteredAuctions}
          emptyMessage={
            searchQuery || Object.keys(activeFilters).some(k => k !== 'onlyActive' && activeFilters[k])
              ? "No auctions match your search criteria"
              : "No active auctions available"
          }
        />
      </div>
    </div>
  );
};