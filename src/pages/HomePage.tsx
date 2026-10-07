import React from 'react';
import { BlogPost, BLOG_POSTS } from '../data/blogs';
import { BlogCard } from '../components/BlogCard';
import { SearchAndFilter } from '../components/SearchAndFilter';
import { Compass, Sparkles, BookOpen, ArrowRight, Sun, Train, Coffee, Umbrella } from 'lucide-react';

interface HomePageProps {
  onSelectPost: (post: BlogPost) => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onNavigateToPlaces: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectPost,
  savedIds,
  onToggleSave,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onNavigateToPlaces,
}) => {
  // Filter stories based on search and category
  const filteredStories = BLOG_POSTS.filter((post) => {
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

  const featuredStories = BLOG_POSTS.filter((p) => p.featured);

  const scrollToStories = () => {
    const el = document.getElementById('latest-stories-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-20 sm:space-y-24">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/marine_drive_sunset_1791392182505.jpg"
            alt="Marine Drive Queen's Necklace at sunset in Mumbai"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-102 animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-black/30" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-stone-950/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          
          {/* Subtle Editorial Kicker */}
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>The Premier Travel & Lifestyle Magazine</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white leading-[1.08] text-balance">
            Mumbai Diaries
          </h1>

          {/* Hero Tagline */}
          <p className="mt-6 text-lg sm:text-2xl md:text-3xl font-serif italic text-stone-200 max-w-2xl mx-auto leading-relaxed text-balance">
            Stories, Streets & Experiences from the City of Dreams.
          </p>

          <p className="mt-4 text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            A contemporary digital journal exploring the historic quarters, sizzling street tavas, golden-hour sea promenades, and the unstoppable 24/7 soul of Maximum City.
          </p>

          {/* Two Hero Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNavigateToPlaces}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-[#C2410C] hover:bg-[#EA580C] rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Mumbai</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToStories}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-stone-100 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Latest Stories</span>
            </button>
          </div>

          {/* Quick Pillars Bar */}
          <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-300">
            <div className="flex items-center justify-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Arabian Sea Sunsets</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Coffee className="w-4 h-4 text-amber-400" />
              <span>Iconic Street Food</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Train className="w-4 h-4 text-amber-400" />
              <span>Local Train Pulse</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Umbrella className="w-4 h-4 text-amber-400" />
              <span>Monsoon Magic</span>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C2410C] font-semibold">
              Curator’s Choice
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
              Featured Stories
            </h2>
          </div>
          <p className="text-stone-500 text-sm mt-2 md:mt-0 max-w-md font-serif italic">
            Essential long-form essays capturing the unmistakable aroma, architecture, and horizon of Mumbai.
          </p>
        </div>

        {/* 3 Large Featured Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredStories.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              featured={true}
              onSelectPost={onSelectPost}
              isSaved={savedIds.includes(post.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      </section>

      {/* Curatorial Quote Callout */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-white border border-stone-200 rounded-3xl text-center space-y-4 shadow-xs relative overflow-hidden">
          <div className="w-12 h-0.5 bg-[#C2410C] mx-auto mb-4" />
          <blockquote className="font-serif italic text-2xl sm:text-3xl text-stone-800 leading-snug max-w-2xl mx-auto">
            “You can take a person out of Bombay, but you can never wash the sea salt and cutting chai out of their blood.”
          </blockquote>
          <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold pt-2">
            — The Mumbai Diaries Manifesto
          </p>
        </div>
      </section>

      {/* Latest Stories Section (All 10 Posts with Search & Filter) */}
      <section id="latest-stories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C2410C] font-semibold">
            The Complete Anthology
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
            Latest Stories
          </h2>
          <p className="text-stone-600 text-sm mt-2 font-normal">
            Immerse yourself in all 10 complete guides, culinary essays, and hidden city discoveries.
          </p>
        </div>

        {/* Search & Filter Component */}
        <div className="mb-12">
          <SearchAndFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            resultCount={filteredStories.length}
          />
        </div>

        {/* Grid of Posts */}
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((post) => (
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
          <div className="py-16 text-center bg-white border border-stone-200 rounded-2xl p-8 space-y-3">
            <h3 className="font-serif font-bold text-xl text-stone-800">
              No matching Mumbai stories found
            </h3>
            <p className="text-sm text-stone-500 max-w-sm mx-auto">
              Try adjusting your search terms or clearing category filters to see all 10 articles.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-[#C2410C] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
