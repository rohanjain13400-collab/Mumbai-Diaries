import React from 'react';
import { BlogPost, BLOG_POSTS } from '../data/blogs';
import { BlogCard } from '../components/BlogCard';
import { CloudRain, Train, Moon, Mountain, Sparkles, Check } from 'lucide-react';

interface ExperiencesPageProps {
  onSelectPost: (post: BlogPost) => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({
  onSelectPost,
  savedIds,
  onToggleSave,
}) => {
  const expPosts = BLOG_POSTS.filter(
    (post) =>
      post.category === 'Experiences' ||
      post.category === 'City Life' ||
      post.category === 'Culture' ||
      post.id.includes('monsoon') ||
      post.id.includes('local') ||
      post.id.includes('sleep') ||
      post.id.includes('getaways')
  );

  const localRituals = [
    {
      title: 'Open-Door Local Train Ride',
      description: 'Taking a non-peak local train from Churchgate to Bandra, leaning against the doorway pole to feel the cool Arabian breeze.',
      icon: Train,
    },
    {
      title: 'Monsoon High Tide Spray',
      description: 'Standing on Marine Drive during a July afternoon high tide, getting soaked by 20-foot sea spray as waves slam into tetrapods.',
      icon: CloudRain,
    },
    {
      title: '2:00 AM Pav Bhaji on Car Hoods',
      description: 'Double-parking in Tardeo or Juhu after midnight, eating butter-drenched pav bhaji balanced on the bonnet of your car.',
      icon: Moon,
    },
    {
      title: 'Sahyadri Mist & Ghat Trekking',
      description: 'Escaping into the Western Ghats near Lonavala or Igatpuri to hike through lush emerald clouds and roaring seasonal waterfalls.',
      icon: Mountain,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#C2410C] font-semibold">
          Kinetic Pulse & Soul
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Unforgettable Mumbai Experiences
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-serif italic max-w-xl mx-auto">
          The true spirit of Bombay cannot be seen in a museum; it must be felt in the rain, on the rails, at midnight, and along the shoreline.
        </p>
      </div>

      {/* Rituals Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
          <Sparkles className="w-5 h-5 text-[#C2410C]" />
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Four Quintessential Mumbai Rites of Passage
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {localRituals.map((ritual, idx) => {
            const Icon = ritual.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-stone-200/90 rounded-2xl p-6 space-y-3 hover:border-amber-400 transition-all shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#C2410C] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    {ritual.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {ritual.description}
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Must-experience</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Experiential Stories Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Experiential Narratives
            </h2>
            <p className="text-stone-500 text-xs mt-1">
              Immersive long-form essays detailing the rhythms and emotions of Bombay life.
            </p>
          </div>
          <span className="text-xs font-semibold text-stone-500">
            {expPosts.length} Stories Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expPosts.map((post) => (
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
