import React from 'react';
import { BlogPost, BLOG_POSTS } from '../data/blogs';
import { X, Trash2, ArrowRight, Bookmark } from 'lucide-react';

interface ReadingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onSelectPost: (post: BlogPost) => void;
  onRemoveSaved: (id: string) => void;
  onClearAll: () => void;
}

export const ReadingListModal: React.FC<ReadingListModalProps> = ({
  isOpen,
  onClose,
  savedIds,
  onSelectPost,
  onRemoveSaved,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const savedPosts = savedIds
    .map((id) => BLOG_POSTS.find((p) => p.id === id))
    .filter((p): p is BlogPost => Boolean(p));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF7F2] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#C2410C]" />
            <h3 className="text-xl font-serif font-bold text-stone-900">
              Your Mumbai Reading List
            </h3>
            <span className="text-xs text-stone-500 font-medium ml-1">
              ({savedPosts.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close reading list"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="mt-5 max-h-[60vh] overflow-y-auto space-y-4 pr-1">
          {savedPosts.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 mx-auto flex items-center justify-center">
                <Bookmark className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-stone-800 text-lg">
                No stories saved yet
              </h4>
              <p className="text-stone-500 text-xs max-w-xs mx-auto leading-relaxed">
                Click the bookmark icon on any Mumbai story card or article header to save it for quiet evening reading.
              </p>
            </div>
          ) : (
            savedPosts.map((post) => (
              <div
                key={post.id}
                className="group flex gap-4 p-3.5 bg-white border border-stone-200 rounded-xl hover:border-stone-300 transition-all items-center justify-between"
              >
                <div
                  onClick={() => {
                    onSelectPost(post);
                    onClose();
                  }}
                  className="flex gap-3.5 items-center cursor-pointer flex-1 min-w-0"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C2410C] block">
                      {post.category}
                    </span>
                    <h4 className="text-sm font-serif font-bold text-stone-900 truncate group-hover:text-[#C2410C] transition-colors">
                      {post.title}
                    </h4>
                    <span className="text-xs text-stone-500 block mt-0.5">
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <button
                    onClick={() => {
                      onSelectPost(post);
                      onClose();
                    }}
                    className="p-1.5 text-stone-600 hover:text-[#C2410C] transition-colors cursor-pointer"
                    title="Read story"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveSaved(post.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        {savedPosts.length > 0 && (
          <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
            <button
              onClick={onClearAll}
              className="text-stone-500 hover:text-rose-600 transition-colors cursor-pointer"
            >
              Clear all bookmarks
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Continue Reading
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
