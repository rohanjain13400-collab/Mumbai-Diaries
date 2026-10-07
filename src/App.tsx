import React, { useState, useEffect } from 'react';
import { BlogPost, BLOG_POSTS } from './data/blogs';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AllBlogsPage } from './pages/AllBlogsPage';
import { PlacesPage } from './pages/PlacesPage';
import { FoodPage } from './pages/FoodPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ArticleView } from './components/ArticleView';
import { ReadingListModal } from './components/ReadingListModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('mumbai_diaries_bookmarks');
      return stored ? JSON.parse(stored) : ['10-places-you-must-visit-in-mumbai', 'food-lovers-guide-to-mumbai-street-food'];
    } catch {
      return ['10-places-you-must-visit-in-mumbai', 'food-lovers-guide-to-mumbai-street-food'];
    }
  });
  const [readingListOpen, setReadingListOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('mumbai_diaries_bookmarks', JSON.stringify(savedIds));
    } catch {
      // fallback
    }
  }, [savedIds]);

  const handleSelectPost = (post: BlogPost) => {
    setActivePost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStories = () => {
    setActivePost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRemoveSaved = (id: string) => {
    setSavedIds((prev) => prev.filter((item) => item !== id));
  };

  const handleClearAllSaved = () => {
    setSavedIds([]);
  };

  const handleTabChange = (tab: string, categoryFilter?: string) => {
    setActivePost(null);
    setCurrentTab(tab);
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSearch = () => {
    setActivePost(null);
    setCurrentTab('all-blogs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={activePost ? '' : currentTab}
        setCurrentTab={(tab) => handleTabChange(tab)}
        savedCount={savedIds.length}
        onOpenSaved={() => setReadingListOpen(true)}
        onOpenSearch={handleOpenSearch}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePost ? (
          <ArticleView
            post={activePost}
            onBack={handleBackToStories}
            onSelectPost={handleSelectPost}
            isSaved={savedIds.includes(activePost.id)}
            onToggleSave={(id) => handleToggleSave(id)}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomePage
                onSelectPost={handleSelectPost}
                savedIds={savedIds}
                onToggleSave={handleToggleSave}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onNavigateToPlaces={() => handleTabChange('places')}
              />
            )}

            {currentTab === 'all-blogs' && (
              <AllBlogsPage
                onSelectPost={handleSelectPost}
                savedIds={savedIds}
                onToggleSave={handleToggleSave}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            )}

            {currentTab === 'places' && (
              <PlacesPage
                onSelectPost={handleSelectPost}
                savedIds={savedIds}
                onToggleSave={handleToggleSave}
              />
            )}

            {currentTab === 'food' && (
              <FoodPage
                onSelectPost={handleSelectPost}
                savedIds={savedIds}
                onToggleSave={handleToggleSave}
              />
            )}

            {currentTab === 'experiences' && (
              <ExperiencesPage
                onSelectPost={handleSelectPost}
                savedIds={savedIds}
                onToggleSave={handleToggleSave}
              />
            )}

            {currentTab === 'about' && (
              <AboutPage onExplore={() => handleTabChange('all-blogs')} />
            )}

            {currentTab === 'contact' && <ContactPage />}
          </>
        )}
      </main>

      {/* Magazine Footer */}
      <Footer onNavigate={(tab, cat) => handleTabChange(tab, cat)} />

      {/* Reading List Modal / Drawer */}
      <ReadingListModal
        isOpen={readingListOpen}
        onClose={() => setReadingListOpen(false)}
        savedIds={savedIds}
        onSelectPost={handleSelectPost}
        onRemoveSaved={handleRemoveSaved}
        onClearAll={handleClearAllSaved}
      />
    </div>
  );
}
