import React from 'react';
import { BlogPost, BLOG_POSTS } from '../data/blogs';
import { BlogCard } from '../components/BlogCard';
import { Utensils, Coffee, Flame, Heart } from 'lucide-react';

interface FoodPageProps {
  onSelectPost: (post: BlogPost) => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const FoodPage: React.FC<FoodPageProps> = ({
  onSelectPost,
  savedIds,
  onToggleSave,
}) => {
  const foodPosts = BLOG_POSTS.filter(
    (post) =>
      post.category === 'Food' ||
      post.id.includes('food') ||
      post.id.includes('cafe') ||
      post.id.includes('sleep')
  );

  const bites = [
    {
      name: 'Vada Pav',
      tag: 'The Quintessential Snack',
      description:
        'Spiced golden batata vada deep-fried in gram flour, stuffed into freshly baked ladi pav with red garlic peanut thecha and green chutney.',
      origin: 'Dadar Station, 1966',
    },
    {
      name: 'Pav Bhaji',
      tag: 'The Midnight Tava Classic',
      description:
        'Slow-simmered medley of potatoes, green peas, and tomatoes smashed on a massive flat iron tava with half a block of Amul butter.',
      origin: 'Bombay Cotton Exchange',
    },
    {
      name: 'Bun Maska & Irani Chai',
      tag: 'Colonial Persian Nostalgia',
      description:
        'A soft crusty bun sliced and heavily slathered with salted butter, dipped warm into cardamom-infused milky tea with a side of mawa cake.',
      origin: '19th Century Irani Cafes',
    },
    {
      name: 'Bombay Toasted Sandwich',
      tag: 'Street-Side Ingenuity',
      description:
        'Beetroot, cucumber, potato, and green capsicum pressed between buttered slices in a cast-iron tong over charcoal grills.',
      origin: 'Churchgate & Fort Kiosks',
    },
    {
      name: 'Sev Puri & Bhel Puri',
      tag: 'Seaside Coastal Chaat',
      description:
        'Delicate flat crisps piled with spiced potatoes, tangy raw mango, date-tamarind reduction, and an avalanche of golden chickpea sev.',
      origin: 'Girgaon Chowpatty',
    },
    {
      name: 'Sol Kadhi & Fish Thali',
      tag: 'Konkan Coast Heritage',
      description:
        'Pink tangy digestive drink of wild kokum and freshly pressed coconut milk, paired with crisp rava-fried pomfret or surmai.',
      origin: 'Koli Fishing Villages',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#C2410C] font-semibold">
          Gastronomy & Street Culture
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          A Culinary Odyssey Through Bombay
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-serif italic max-w-xl mx-auto">
          From smoke-belching roadside tavas to quiet third-wave roasteries and vintage Irani marble tables, discover what feeds 20 million dreamers.
        </p>
      </div>

      {/* Iconic Mumbai Bites Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
          <Utensils className="w-5 h-5 text-[#C2410C]" />
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            The Iconic Mumbai Bites Lexicon
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bites.map((bite, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200/90 rounded-2xl p-6 space-y-2.5 hover:border-amber-400 transition-all shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-xl text-stone-900">
                    {bite.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-[#C2410C] uppercase tracking-wider">
                    {bite.tag}
                  </span>
                </div>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {bite.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                <span className="font-mono text-[11px]">Legacy: {bite.origin}</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Food Articles Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              In-Depth Food Stories
            </h2>
            <p className="text-stone-500 text-xs mt-1">
              Complete chronicles covering historic recipes, legendary stalls, and coffee culture.
            </p>
          </div>
          <span className="text-xs font-semibold text-stone-500">
            {foodPosts.length} Culinary Essays
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodPosts.map((post) => (
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
