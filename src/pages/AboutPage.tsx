import React from 'react';
import { Compass, BookOpen, Heart, Award, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onExplore: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onExplore }) => {
  const editorialPillars = [
    {
      title: 'Authenticity & Street Truth',
      description: 'We do not publish sponsored puff pieces. Every vada pav stall, Art Deco boulevard, and suburban café is personally walked, tasted, and documented by our writers.',
      icon: Heart,
    },
    {
      title: 'Both Iconic & Secret Quarters',
      description: 'We celebrate the world-famous majesty of the Gateway of India and Marine Drive while honoring the tucked-away tranquility of Khotachiwadi and Banganga Tank.',
      icon: Compass,
    },
    {
      title: 'Human-First Storytelling',
      description: 'Cities are not just concrete and asphalt—they are the dreams of dabbawalas, Koli fishermen, night-shift tea vendors, and artists who call this peninsula home.',
      icon: BookOpen,
    },
  ];

  const contributors = [
    {
      name: 'Ananya Deshmukh',
      role: 'Editor-in-Chief & Urban Heritage Lead',
      bio: 'An architectural historian and South Mumbai native who has spent 12 years documenting Art Deco heritage, local train lore, and nocturnal Bombay life.',
    },
    {
      name: 'Rohan Merchant',
      role: 'Gastronomy & Street Culture Lead',
      bio: 'A food chronicler obsessed with the geometry of ladi pav, the alchemy of Irani mawa cakes, and the spicy science of street tavas.',
    },
    {
      name: 'Priyanka Iyer',
      role: 'Coastal & Lifestyle Columnist',
      bio: 'A photographer and writer exploring the Arabian Sea’s golden hours, Western Ghat trails, and the monsoon transformations of the city.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#C2410C] font-semibold">
          About The Publication
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
          Mumbai Diaries
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-stone-700 max-w-2xl mx-auto">
          “Stories, Streets & Experiences from the City of Dreams.”
        </p>
      </div>

      {/* Primary Mission Card */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-12 shadow-xs space-y-6">
        <div className="w-12 h-0.5 bg-[#C2410C]" />
        
        <p className="text-lg sm:text-xl font-serif leading-relaxed text-stone-800">
          <strong>Mumbai Diaries</strong> is a digital magazine celebrating Mumbai through its streets, food, people, places and everyday experiences.
        </p>

        <p className="text-base sm:text-lg leading-relaxed text-stone-600">
          The website is designed for people who want to discover both the iconic and lesser-known sides of Mumbai. Whether you are a curious international traveler landing at Chhatrapati Shivaji Maharaj International Airport for the first time, or a lifelong Mumbaikar yearning to rediscover your own neighborhood, Mumbai Diaries serves as an intimate, beautifully crafted field guide.
        </p>

        <p className="text-base sm:text-lg leading-relaxed text-stone-600">
          We believe Mumbai is more than a geographic pin on the western coast of India; it is a relentless, generous emotion. It is the democracy of Marine Drive at twilight, the comforting warmth of hot cutting chai in the pouring monsoon rain, and the synchronized hum of suburban trains hurtling down steel tracks.
        </p>
      </div>

      {/* Editorial Principles */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Our Editorial Principles
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            How we approach every story, neighborhood, and recommendation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {editorialPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-stone-50/80 border border-stone-200 rounded-2xl p-6 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-[#C2410C] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Meet the Editorial Team */}
      <div className="space-y-8 pt-6 border-t border-stone-200">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#C2410C] font-semibold">
            The Voices Behind The Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Meet the Editorial Team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contributors.map((member, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200 rounded-2xl p-6 space-y-3 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-900 font-serif font-bold text-xl flex items-center justify-center mx-auto border-2 border-amber-200">
                {member.name.charAt(0)}
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {member.name}
              </h3>
              <p className="text-xs font-semibold text-[#C2410C] uppercase tracking-wider">
                {member.role}
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-stone-900 text-white p-8 sm:p-12 rounded-3xl text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold">
          Ready to Discover the City of Dreams?
        </h3>
        <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Begin with our handpicked destination guides, street food chronicles, and coastal itineraries.
        </p>
        <div className="pt-2">
          <button
            onClick={onExplore}
            className="px-6 py-3 bg-[#C2410C] hover:bg-[#EA580C] text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Explore All 10 Stories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
