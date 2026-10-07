import React, { useState } from 'react';
import { ArrowUp, Instagram, Twitter, Youtube, Send, Check } from 'lucide-react';
import { CATEGORIES } from '../data/blogs';

interface FooterProps {
  onNavigate: (tab: string, categoryFilter?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-stone-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-3xl font-serif font-bold text-stone-100 tracking-tight">
              Mumbai Diaries
            </h3>
            <p className="text-stone-400 text-sm italic font-serif max-w-sm leading-relaxed">
              “Stories, Streets & Experiences from the City of Dreams.”
            </p>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              An independent digital lifestyle magazine curated for explorers, flâneurs, culinary wanderers, and citizens who adore the relentless energy of Bombay.
            </p>

            {/* Newsletter input */}
            <div className="pt-2">
              <span className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                Dispatch from the Bay
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="bg-stone-800 border border-stone-700 text-stone-100 text-xs px-3.5 py-2.5 rounded-l-lg focus:outline-none focus:border-[#C2410C] w-full placeholder:text-stone-500"
                />
                <button
                  type="submit"
                  className="bg-[#C2410C] hover:bg-[#EA580C] text-white px-4 py-2.5 rounded-r-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <>
                      <span>Join</span>
                      <Send className="w-3 h-3" />
                    </>
                  )}
                </button>
              </form>
              {subscribed && (
                <p className="text-emerald-400 text-xs mt-2">
                  Welcome aboard! You will receive our weekly weekend guide.
                </p>
              )}
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
              Explore Sections
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('all-blogs')}
                  className="text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
                >
                  All Blogs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('places')}
                  className="text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Iconic Places
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('food')}
                  className="text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Street Food & Cafés
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experiences')}
                  className="text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Local Experiences
                </button>
              </li>
            </ul>
          </div>

          {/* Magazine Categories */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
              Curated Themes
            </span>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onNavigate('all-blogs', cat)}
                    className="text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial & Connect */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
              Editorial Desk
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
                >
                  About the Publication
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Contact & Submissions
                </button>
              </li>
              <li className="pt-2">
                <span className="text-xs text-stone-400 block mb-2">Follow Our Journey</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-8 h-8 rounded-full bg-stone-800 hover:bg-[#C2410C] flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-8 h-8 rounded-full bg-stone-800 hover:bg-[#C2410C] flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                    aria-label="Twitter / X"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-8 h-8 rounded-full bg-stone-800 hover:bg-[#C2410C] flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© 2026 Mumbai Diaries. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="italic font-serif text-stone-400">
              Crafted with affection for the City of Dreams
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
              title="Return to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
