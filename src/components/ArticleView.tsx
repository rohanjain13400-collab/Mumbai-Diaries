import React, { useState, useEffect } from 'react';
import { BlogPost, BLOG_POSTS } from '../data/blogs';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Check, 
  Clock, 
  Compass, 
  CheckCircle2, 
  Calendar, 
  Info,
  Type
} from 'lucide-react';
import { BlogCard } from './BlogCard';

interface ArticleViewProps {
  post: BlogPost;
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  post,
  onBack,
  onSelectPost,
  isSaved,
  onToggleSave,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const relatedPosts = post.relatedIds
    .map((id) => BLOG_POSTS.find((p) => p.id === id))
    .filter((p): p is BlogPost => Boolean(p));

  const textClasses = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    larger: 'text-xl sm:text-2xl leading-loose',
  }[fontSize];

  return (
    <article className="min-h-screen pb-24">
      {/* Scroll Reading Progress Bar */}
      <div
        className="fixed top-20 left-0 h-1 bg-[#C2410C] z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Sub-Header Bar */}
      <div className="bg-[#FAF7F2]/90 backdrop-blur-sm border-b border-stone-200/80 sticky top-20 z-30 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Stories</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Font size switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-stone-100/90 rounded-lg p-1 border border-stone-200/60">
              <Type className="w-3.5 h-3.5 text-stone-500 ml-1.5" />
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 text-xs font-medium rounded ${
                  fontSize === 'normal' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 text-xs font-medium rounded ${
                  fontSize === 'large' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('larger')}
                className={`px-2 py-0.5 text-xs font-medium rounded ${
                  fontSize === 'larger' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                A++
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleSave(post.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-orange-50 border-orange-200 text-[#C2410C]'
                  : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
              title={isSaved ? 'Saved to reading list' : 'Save to reading list'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#C2410C]' : ''}`} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 bg-white border border-stone-200 text-stone-600 hover:text-stone-900 rounded-lg transition-colors cursor-pointer"
              title="Share story"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Header Container */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-8">
        {/* Zero-Pill Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500 tracking-wide mb-4">
          <span className="text-[#C2410C] font-semibold uppercase tracking-wider">
            {post.category}
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            {post.readTime}
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            {post.date}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-[1.18] tracking-tight">
          {post.title}
        </h1>

        {/* Dek / Subtitle */}
        <p className="mt-5 text-lg sm:text-xl font-serif italic text-stone-600 leading-relaxed border-l-2 border-[#C2410C] pl-4">
          {post.subtitle}
        </p>

        {/* Byline */}
        <div className="mt-6 flex items-center justify-between pt-6 border-t border-stone-200 text-xs text-stone-500">
          <div>
            <span className="font-semibold text-stone-800">{post.author.name}</span>
            <span className="text-stone-400 mx-1.5">/</span>
            <span>{post.author.role}</span>
          </div>
          <span className="italic font-serif">Mumbai Diaries Special Feature</span>
        </div>
      </header>

      {/* Large Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg bg-stone-100">
          <img
            src={post.image}
            alt={post.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        {post.imageCaption && (
          <p className="mt-3 text-xs sm:text-sm text-stone-500 font-serif italic text-center max-w-2xl mx-auto">
            {post.imageCaption}
          </p>
        )}
      </div>

      {/* Main Prose Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Short Introduction */}
        <div className="mb-10 pb-8 border-b border-stone-200">
          <p className={`${textClasses} text-stone-800 font-medium leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#C2410C]`}>
            {post.excerpt}
          </p>
        </div>

        {/* Structured Sections */}
        <div className="space-y-12">
          {post.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight pt-2">
                  {section.heading}
                </h2>
              )}

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className={`${textClasses} text-stone-700`}>
                  {p}
                </p>
              ))}

              {section.quote && (
                <blockquote className="my-8 py-4 px-6 border-l-4 border-amber-600 bg-amber-50/60 rounded-r-xl">
                  <p className="font-serif italic text-xl sm:text-2xl text-stone-800 leading-snug">
                    "{section.quote}"
                  </p>
                  <footer className="text-xs uppercase tracking-wider text-amber-800 font-semibold mt-2">
                    — Field Notes from Mumbai Diaries
                  </footer>
                </blockquote>
              )}

              {section.highlightBox && (
                <div className="my-6 p-5 bg-stone-100/90 border border-stone-200 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-base">
                    <Info className="w-4 h-4 text-[#C2410C]" />
                    <span>{section.highlightBox.title}</span>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {section.highlightBox.description}
                  </p>
                </div>
              )}

              {section.list && (
                <ul className="space-y-2.5 my-4 pl-2">
                  {section.list.map((item, lIdx) => (
                    <li key={lIdx} className={`${textClasses} text-stone-700 flex items-start gap-2.5`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C] mt-2.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* "Things to Know" Section */}
        <div className="mt-14 p-7 bg-amber-50/50 border border-amber-200/80 rounded-2xl space-y-5">
          <div className="flex items-center gap-2.5 border-b border-amber-200/60 pb-3">
            <Compass className="w-5 h-5 text-[#C2410C]" />
            <h3 className="text-xl font-serif font-bold text-stone-900">
              Essential Things to Know
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-900">
                Best Timing
              </span>
              <p className="text-stone-700 leading-relaxed">
                {post.thingsToKnow.bestTimeToVisit}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-900">
                Estimated Budget
              </span>
              <p className="text-stone-700 leading-relaxed">
                {post.thingsToKnow.budget}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-900">
                Transit & Arrival
              </span>
              <p className="text-stone-700 leading-relaxed">
                {post.thingsToKnow.gettingThere}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-900">
                Curator’s Tip
              </span>
              <p className="text-stone-700 leading-relaxed">
                {post.thingsToKnow.insiderTip}
              </p>
            </div>
          </div>
        </div>

        {/* "Key Takeaways" Section */}
        <div className="mt-8 p-7 bg-white border border-stone-200 rounded-2xl space-y-4">
          <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Key Takeaways</span>
          </h3>
          <ul className="space-y-2.5">
            {post.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3 text-stone-700 text-sm leading-relaxed">
                <span className="text-[#C2410C] font-semibold font-mono text-xs mt-0.5">0{idx + 1}.</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Share & Bookmark Bar */}
        <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-serif font-bold text-stone-900 text-lg">
              Enjoyed this Bombay dispatch?
            </h4>
            <p className="text-xs text-stone-500">
              Save it to your personal reading list or share it with fellow travelers.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleSave(post.id)}
              className={`px-4 py-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-orange-50 border-orange-300 text-[#C2410C]'
                  : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#C2410C]' : ''}`} />
              <span>{isSaved ? 'Story Saved' : 'Save Story'}</span>
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2.5 rounded-lg bg-stone-900 hover:bg-[#C2410C] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Story</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Related Stories Section */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-stone-200">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#C2410C] font-semibold">
              More Dispatches
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">
              Related Stories from Mumbai
            </h2>
            <p className="text-stone-500 text-sm mt-2">
              Continue exploring neighborhoods, flavors, and secret corners of the City of Dreams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((related) => (
              <BlogCard
                key={related.id}
                post={related}
                onSelectPost={(p) => {
                  onSelectPost(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
