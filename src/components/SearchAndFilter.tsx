import React from 'react';
import { Search, X } from 'lucide-react';
import { CATEGORIES } from '../data/blogs';

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  resultCount: number;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  resultCount,
}) => {
  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories by keyword (e.g., Marine Drive, Vada Pav, Monsoon, Cafés...)"
            className="w-full pl-12 pr-10 py-3.5 bg-white border border-stone-200 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 shadow-xs focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 p-1.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Category Segmented Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-950 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Filter Stats & Reset */}
      {(searchQuery || selectedCategory !== 'All') && (
        <div className="flex items-center justify-center gap-3 text-xs text-stone-500">
          <span>
            Found <strong className="text-stone-800 font-semibold">{resultCount}</strong> {resultCount === 1 ? 'story' : 'stories'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-[#C2410C] hover:underline font-medium cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
