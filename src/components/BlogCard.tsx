import React, { useState } from 'react';
import { BlogPost } from '../data/blogs';
import { Bookmark, ArrowRight, Clock } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  onSelectPost: (post: BlogPost) => void;
  isSaved?: boolean;
  onToggleSave?: (id: string, e: React.MouseEvent) => void;
  featured?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  onSelectPost,
  isSaved = false,
  onToggleSave,
  featured = false,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      onClick={() => onSelectPost(post)}
      className={`group relative flex flex-col bg-white border border-stone-200/90 rounded-2xl overflow-hidden hover:border-stone-300 hover:shadow-md transition-all duration-300 cursor-pointer ${
        featured ? 'lg:col-span-1' : ''
      }`}
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        {!imageError ? (
          <img
            src={post.image}
            alt={post.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-stone-100 to-amber-50 text-stone-600">
            <span className="font-serif text-lg font-medium text-stone-800">{post.title}</span>
            <span className="text-xs text-stone-500 mt-1">Mumbai Diaries</span>
          </div>
        )}

        {/* Bookmark affordance */}
        {onToggleSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(post.id, e);
            }}
            aria-label={isSaved ? 'Remove from reading list' : 'Save to reading list'}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-stone-700 hover:text-[#C2410C] hover:bg-white transition-all cursor-pointer"
          >
            <Bookmark
              className={`w-4 h-4 transition-colors ${
                isSaved ? 'fill-[#C2410C] text-[#C2410C]' : 'text-stone-700'
              }`}
            />
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-6 sm:p-7 justify-between">
        <div className="space-y-3">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs font-medium text-stone-500 tracking-wide">
            <span className="text-[#C2410C] font-semibold uppercase tracking-wider">
              {post.category}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              {post.readTime}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{post.date}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 group-hover:text-[#C2410C] transition-colors leading-snug line-clamp-2">
            {post.title}
          </h3>

          {/* Description / Excerpt */}
          <p className="text-stone-600 text-sm leading-relaxed line-clamp-3 font-normal">
            {post.excerpt}
          </p>
        </div>

        {/* Card Footer with "Read Story" CTA */}
        <div className="pt-6 mt-4 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-medium">
            By {post.author.name}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 group-hover:text-[#C2410C] transition-colors">
            <span>Read Story</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  );
};
