import React, { useState } from 'react';
import { Bookmark, Search, Menu, X, Compass } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  savedCount,
  onOpenSaved,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'all-blogs', label: 'All Blogs' },
    { id: 'places', label: 'Places' },
    { id: 'food', label: 'Food' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="group text-left text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900 transition-colors"
          >
            Mumbai Diaries
          </button>

          {/* Zone 2: 4–7 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#C2410C] font-semibold'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C2410C] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary action affordances */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              title="Search stories"
              aria-label="Search stories"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenSaved}
              className="relative p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              title="Saved reading list"
              aria-label="Saved reading list"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C2410C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('places')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-white bg-stone-900 hover:bg-[#C2410C] transition-colors rounded-lg cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore City</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-950 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-stone-200 px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-base font-medium py-1 transition-colors ${
                    isActive ? 'text-[#C2410C] font-semibold' : 'text-stone-700'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSaved();
                }}
                className="text-sm text-stone-600 flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4 text-[#C2410C]" />
                <span>Reading List ({savedCount})</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="text-sm text-stone-600 flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-stone-500" />
                <span>Search</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
