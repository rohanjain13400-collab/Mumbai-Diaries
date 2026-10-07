import React, { useState } from 'react';
import { BlogPost, BLOG_POSTS } from '../data/blogs';
import { BlogCard } from '../components/BlogCard';
import { MapPin, Compass, Navigation, Landmark, Waves, Trees } from 'lucide-react';

interface PlacesPageProps {
  onSelectPost: (post: BlogPost) => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const PlacesPage: React.FC<PlacesPageProps> = ({
  onSelectPost,
  savedIds,
  onToggleSave,
}) => {
  const [activeZone, setActiveZone] = useState<'all' | 'south' | 'suburbs' | 'heritage'>('all');

  // Filter posts related to places
  const placePosts = BLOG_POSTS.filter(
    (post) =>
      post.category === 'Places' ||
      post.category === 'Travel' ||
      post.id.includes('places') ||
      post.id.includes('sunset') ||
      post.id.includes('hidden-gems') ||
      post.id.includes('one-day')
  );

  const zones = [
    {
      id: 'south',
      name: 'South Mumbai (SoBo)',
      tagline: 'Colonial Splendor & The Queen’s Necklace',
      icon: Landmark,
      description:
        'Apollo Bunder, Fort heritage precinct, Kala Ghoda art galleries, and the sweeping Art Deco boulevard of Marine Drive.',
    },
    {
      id: 'suburbs',
      name: 'Bandra & The Coast',
      tagline: 'Bohemian Streets & Sunset Forts',
      icon: Waves,
      description:
        'Castella de Aguada, Bandra Bandstand, bustling Carter Road, and the charming pastel Portuguese alleys of Ranwar Village.',
    },
    {
      id: 'heritage',
      name: 'Sacred & Hidden Pockets',
      tagline: 'Ancient Cisterns & Forest Caves',
      icon: Trees,
      description:
        'Banganga Tank in Walkeshwar, Khotachiwadi’s wooden architecture, and 2,000-year-old Buddhist Kanheri Caves inside national park limits.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#C2410C] font-semibold">
          Geographic Compendium
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Iconic Places & Neighborhoods of Mumbai
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-serif italic max-w-xl mx-auto">
          From grand Victorian Gothic edifices to salty sea ramparts and quiet Portuguese hamlets, navigate the seven reclaimed islands of Bombay.
        </p>
      </div>

      {/* Neighborhood Spotlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {zones.map((zone) => {
          const Icon = zone.icon;
          return (
            <div
              key={zone.id}
              className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 space-y-3 hover:border-amber-400 transition-all shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#C2410C] flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900">
                {zone.name}
              </h3>
              <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                {zone.tagline}
              </p>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {zone.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Places Transit Advisory Strip */}
      <div className="p-6 bg-stone-900 text-stone-100 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-stone-800 flex items-center justify-center shrink-0 text-amber-400">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg text-white">
              Navigating Mumbai: The Local Golden Rule
            </h4>
            <p className="text-xs text-stone-300 max-w-xl mt-0.5">
              Explore South Mumbai strictly on foot or via metered black-and-yellow kaali-peeli cabs. Use the Western Line local trains to skip suburban peak traffic between Bandra, Andheri, and Churchgate.
            </p>
          </div>
        </div>
      </div>

      {/* Place Stories Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Curated Destination Guides
            </h2>
            <p className="text-stone-500 text-xs mt-1">
              Deep dive into specific destinations, architectural walks, and sunset spots.
            </p>
          </div>
          <span className="text-xs font-semibold text-stone-500">
            {placePosts.length} Guides Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {placePosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onSelectPost={onSelectPost}
              isSaved={savedIds.includes(post.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      </div>

    </div>
  );
};
