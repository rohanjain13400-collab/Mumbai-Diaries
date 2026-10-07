import React, { useState } from 'react';
import { BlogPost, BLOG_POSTS } from '../data/blogs';
import { BlogCard } from '../components/BlogCard';
import { SearchAndFilter } from '../components/SearchAndFilter';
import { SlidersHorizontal } from 'lucide-react';

interface AllBlogsPageProps {
  onSelectPost: (post: BlogPost) => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const AllBlogsPage: React.FC<AllBlogsPageProps> = ({
  onSelectPost,
  savedIds,
  onToggleSave,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [sortBy, setSortBy] = useState<'default' | 'shortest' | 'longest'>('default');

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.sections.some((s) =>
        s.paragraphs.some((p) => p.toLowerCase().includes(query))
      );
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'shortest') {
      return parseInt(a.readTime) - parseInt(b.readTime);
    }
    if (sortBy === 'longest') {
      return parseInt(b.readTime) - parseInt(a.readTime);
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#C2410C] font-semibold">
          Archive & Anthology
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          All Stories from Mumbai
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-serif italic">
          Every street corner, culinary secret, and coastal promenade documented in full narrative prose.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-xs space-y-6">
        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          resultCount={sortedPosts.length}
        />

        {/* Sorting row */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs text-stone-500">
          <span>Showing {sortedPosts.length} of 10 stories</span>
          
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-medium text-stone-600">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-50 border border-stone-200 rounded-md px-2 py-1 text-stone-700 text-xs focus:outline-none focus:border-[#C2410C]"
            >
              <option value="default">Default Order</option>
              <option value="shortest">Shortest Read First</option>
              <option value="longest">Longest In-depth First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Post Grid */}
      {sortedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onSelectPost={onSelectPost}
              isSaved={savedIds.includes(post.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
          <p className="text-lg font-serif font-bold text-stone-800">
            No stories found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-xs font-semibold px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-[#C2410C] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
