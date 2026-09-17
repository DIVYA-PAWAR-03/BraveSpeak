import React, { useState, useEffect, useMemo } from 'react';
import { 
  Heart, PlusCircle, Search, Clock, Tag, Share2, 
  CheckCircle2, X, AlertCircle, Sparkles, MessageCircle, Send, ArrowRight, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { storiesApi } from '../services/api';

const categories = [
  'All',
  'Workplace Courage',
  'Cyber Safety',
  'Healing & Recovery',
  'Legal Victory',
  'Community Action'
];

export default function StoriesPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedMap, setLikedMap] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', title: '', category: 'Workplace Courage', desc: '', isAnonymous: false });
  const [successToast, setSuccessToast] = useState('');

  // Load stories from API
  const loadStories = async () => {
    try {
      setLoading(true);
      const res = await storiesApi.getAll({
        category: selectedCategory !== 'All' ? selectedCategory : '',
        search: searchQuery
      });
      if (res.success) {
        setStories(res.data.map(s => ({
          id: s.id,
          img: s.image_url || '/images/news_3.jpg',
          title: s.title,
          category: s.category,
          desc: s.description,
          author: s.is_anonymous ? 'Anonymous' : s.author,
          readTime: s.read_time || '3 min read',
          likes: s.likes || 0,
          date: new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        })));
      }
    } catch (err) {
      console.warn('Could not load from API, keeping current view:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, [selectedCategory]);

  // Handle Search submit / debounce
  const filteredStories = useMemo(() => {
    if (!searchQuery.trim()) return stories;
    const q = searchQuery.toLowerCase();
    return stories.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.author.toLowerCase().includes(q)
    );
  }, [stories, searchQuery]);

  // Load comments when opening story modal
  useEffect(() => {
    if (selectedStory?.id) {
      setComments([]);
      storiesApi.getComments(selectedStory.id)
        .then(res => {
          if (res.success) setComments(res.data);
        })
        .catch(err => console.warn('Failed to load comments:', err));
    }
  }, [selectedStory]);

  const handleLike = async (id, e) => {
    e.stopPropagation();
    const isCurrentlyLiked = likedMap[id];
    setLikedMap(prev => ({ ...prev, [id]: !isCurrentlyLiked }));
    
    // Update local story state
    setStories(prev => prev.map(s => s.id === id ? { ...s, likes: s.likes + (isCurrentlyLiked ? -1 : 1) } : s));
    if (selectedStory && selectedStory.id === id) {
      setSelectedStory(prev => ({ ...prev, likes: prev.likes + (isCurrentlyLiked ? -1 : 1) }));
    }

    if (!isCurrentlyLiked) {
      try {
        await storiesApi.like(id);
      } catch (err) {
        console.warn('Failed to register like on server:', err);
      }
    }
  };

  const handleShare = (story, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.desc,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${story.title} - Read on BraveSpeak`);
      alert("Story link copied to clipboard!");
    }
  };

  const handleSubmitStory = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.desc.trim()) return;

    try {
      setSubmitting(true);
      const res = await storiesApi.create({
        title: form.title.trim(),
        category: form.category,
        description: form.desc.trim(),
        author: form.name.trim(),
        is_anonymous: form.isAnonymous
      });

      if (res.success && res.data) {
        const s = res.data;
        const formatted = {
          id: s.id,
          img: s.image_url || '/images/news_3.jpg',
          title: s.title,
          category: s.category,
          desc: s.description,
          author: s.is_anonymous ? 'Anonymous' : s.author,
          readTime: s.read_time || '3 min read',
          likes: s.likes || 1,
          date: 'Just Now'
        };
        setStories([formatted, ...stories]);
      }

      setForm({ name: '', title: '', category: 'Workplace Courage', desc: '', isAnonymous: false });
      setShowForm(false);
      setSuccessToast('Your story has been safely submitted and published to BraveSpeak!');
      setTimeout(() => setSuccessToast(''), 5000);
    } catch (err) {
      console.warn('Story submission error:', err);
      // Fallback local addition
      const fallbackStory = {
        id: Date.now(),
        img: '/images/news_3.jpg',
        title: form.title.trim(),
        category: form.category,
        desc: form.desc.trim(),
        author: form.isAnonymous ? 'Anonymous' : (form.name.trim() || 'Anonymous Survivor'),
        readTime: '3 min read',
        likes: 1,
        date: 'Just Now'
      };
      setStories([fallbackStory, ...stories]);
      setShowForm(false);
      setSuccessToast('Your story has been shared safely with the community!');
      setTimeout(() => setSuccessToast(''), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentInput.trim() || !selectedStory) return;

    try {
      setCommentLoading(true);
      const res = await storiesApi.addComment(selectedStory.id, {
        author: commentAuthor.trim() || 'Supporter',
        content: commentInput.trim()
      });

      if (res.success && res.data) {
        setComments([res.data, ...comments]);
        setCommentInput('');
      }
    } catch (err) {
      console.warn('Comment post error:', err);
      // Local addition fallback
      setComments([{
        id: Date.now(),
        author: commentAuthor.trim() || 'Supporter',
        content: commentInput.trim(),
        created_at: new Date().toISOString()
      }, ...comments]);
      setCommentInput('');
    } finally {
      setCommentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider">
            <Heart size={14} className="text-rose-600 fill-rose-600" /> Survivor Voices & Healing
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E003E] tracking-tight">
            Stories of Courage, Justice & Resilience
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Real experiences from survivors who broke their silence, stood up for their legal rights, and found healing. Your story can inspire someone else to take their first step.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white rounded-full font-semibold shadow-lg shadow-purple-950/20 hover:scale-105 transition-all cursor-pointer"
            >
              <PlusCircle size={18} />
              <span>Share Your Story (Anonymous Allowed)</span>
            </button>
          </div>
        </div>

        {/* Success Toast */}
        <AnimatePresence>
          {successToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-xl mx-auto bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-2xl flex items-center gap-3 shadow-lg"
            >
              <CheckCircle2 size={22} className="text-emerald-600 shrink-0" />
              <p className="text-sm font-semibold">{successToast}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-purple-100 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories by topic, keyword, or author..."
              className="w-full pl-12 pr-4 py-3.5 bg-purple-50/50 border border-purple-200 rounded-2xl text-slate-800 placeholder-purple-400/80 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#2E003E] text-white shadow-md shadow-purple-950/20"
                    : "bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-800 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs font-semibold text-purple-900">Loading verified stories...</p>
          </div>
        )}

        {/* Stories Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-purple-100 p-8">
                <AlertCircle size={40} className="mx-auto text-purple-400 mb-3" />
                <h3 className="text-xl font-bold text-[#2E003E]">No stories found</h3>
                <p className="text-slate-500 text-sm mt-1">Try clearing your search query or selecting "All" categories.</p>
              </div>
            ) : (
              filteredStories.map((story) => {
                const isLiked = likedMap[story.id];
                const likeCount = story.likes;

                return (
                  <motion.div
                    key={story.id}
                    layout
                    onClick={() => setSelectedStory(story)}
                    className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-purple-100 hover:border-purple-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    whileHover={{ y: -6 }}
                  >
                    <div>
                      {/* Story Cover Image */}
                      <div className="relative h-52 overflow-hidden bg-purple-900">
                        <img
                          src={story.img}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { e.target.src = '/images/news_3.jpg'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-[#2E003E]/80 backdrop-blur-md text-white text-xs font-bold rounded-full border border-purple-400/30">
                            {story.category}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1.5 opacity-90">
                          <Clock size={13} />
                          <span>{story.readTime}</span>
                          <span>•</span>
                          <span>{story.date}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <h2 className="text-xl font-bold text-[#2E003E] group-hover:text-purple-700 transition-colors line-clamp-2">
                          {story.title}
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                          {story.desc}
                        </p>
                      </div>
                    </div>

                    {/* Card Bottom Bar */}
                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-purple-900">By {story.author}</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => handleLike(story.id, e)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full border transition cursor-pointer ${
                            isLiked
                              ? "bg-rose-50 border-rose-300 text-rose-600 font-bold"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600"
                          }`}
                          title="Show support"
                        >
                          <Heart size={14} className={isLiked ? "fill-rose-500 text-rose-500" : ""} />
                          <span>{likeCount}</span>
                        </button>
                        <button
                          onClick={(e) => handleShare(story, e)}
                          className="p-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:text-purple-900 transition cursor-pointer"
                          title="Share story"
                        >
                          <Share2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        )}

        {/* Story Detail Reading Modal */}
        <AnimatePresence>
          {selectedStory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-100 p-6 sm:p-8 relative"
              >
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition cursor-pointer"
                  aria-label="Close story"
                >
                  <X size={20} />
                </button>

                <div className="space-y-5">
                  <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full">
                    {selectedStory.category}
                  </span>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2E003E] leading-tight">
                    {selectedStory.title}
                  </h1>

                  <div className="flex items-center gap-3 text-xs text-slate-500 border-b border-slate-100 pb-4">
                    <span className="font-bold text-purple-900">Shared by {selectedStory.author}</span>
                    <span>•</span>
                    <span>{selectedStory.date}</span>
                    <span>•</span>
                    <span>{selectedStory.readTime}</span>
                  </div>

                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-md">
                    <img
                      src={selectedStory.img}
                      alt={selectedStory.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-slate-700 text-base leading-relaxed whitespace-pre-line">
                    {selectedStory.desc}
                  </p>

                  <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-900 space-y-1">
                    <p className="font-bold">Need assistance or someone to talk to?</p>
                    <p>Call the 24x7 National Helpline at <a href="tel:181" className="font-bold underline">181</a> or police emergency at <a href="tel:112" className="font-bold underline">112</a>.</p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <button
                      onClick={(e) => handleLike(selectedStory.id, e)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-600 font-bold rounded-full border border-rose-200 hover:bg-rose-100 transition cursor-pointer"
                    >
                      <Heart size={16} className={likedMap[selectedStory.id] ? "fill-rose-500" : ""} />
                      <span>{selectedStory.likes} People Supported</span>
                    </button>

                    <button
                      onClick={() => setSelectedStory(null)}
                      className="px-6 py-2 bg-[#2E003E] text-white font-semibold rounded-full hover:bg-purple-950 transition cursor-pointer"
                    >
                      Close Reader
                    </button>
                  </div>

                  {/* Community Messages / Comments Section */}
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <h3 className="text-base font-bold text-[#2E003E] flex items-center gap-2">
                      <MessageCircle size={18} className="text-purple-700" />
                      <span>Community Words of Encouragement ({comments.length})</span>
                    </h3>

                    {/* Add Comment Form */}
                    <form onSubmit={handleAddComment} className="space-y-3 bg-purple-50/50 p-4 rounded-2xl border border-purple-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={commentAuthor}
                          onChange={(e) => setCommentAuthor(e.target.value)}
                          placeholder="Your Name / Supporter Alias (Optional)"
                          className="px-3 py-2 bg-white border border-purple-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder="Write a message of solidarity and encouragement..."
                          className="flex-1 px-3 py-2 bg-white border border-purple-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                        />
                        <button
                          type="submit"
                          disabled={commentLoading || !commentInput.trim()}
                          className="px-4 py-2 bg-purple-900 text-white rounded-xl text-xs font-bold hover:bg-purple-950 transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                        >
                          <Send size={13} />
                          <span>Send</span>
                        </button>
                      </div>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                      {comments.length === 0 ? (
                        <p className="text-xs text-slate-400 italic text-center py-2">
                          No messages yet. Be the first to leave words of strength!
                        </p>
                      ) : (
                        comments.map((c) => (
                          <div key={c.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-1">
                            <div className="flex justify-between items-center text-slate-500">
                              <span className="font-bold text-purple-950 flex items-center gap-1">
                                <User size={12} className="text-purple-600" />
                                {c.author}
                              </span>
                              <span className="text-[10px]">{new Date(c.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{c.content}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Share Story Submission Modal */}
        <AnimatePresence>
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-100 p-6 sm:p-8 relative"
              >
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition cursor-pointer"
                  aria-label="Close form"
                >
                  <X size={20} />
                </button>

                <div className="space-y-2 mb-6">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                    <Sparkles size={14} /> Safe & Confidential
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#2E003E]">Share Your Experience</h2>
                  <p className="text-xs text-slate-500">
                    Your story can provide courage and guidance to other women facing similar challenges.
                  </p>
                </div>

                <form onSubmit={handleSubmitStory} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full p-3 bg-purple-50/50 border border-purple-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      {categories.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Story Title *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={75}
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g., How I Stood Up to Workplace Harassment"
                      className="w-full p-3 bg-purple-50/50 border border-purple-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Your Story *
                      </label>
                      <span className="text-[11px] text-slate-400">{form.desc.length} / 1000</span>
                    </div>
                    <textarea
                      required
                      rows={5}
                      maxLength={1000}
                      value={form.desc}
                      onChange={(e) => setForm({ ...form, desc: e.target.value })}
                      placeholder="Share what happened, how you addressed it, what laws/resources helped, and what advice you'd give..."
                      className="w-full p-3 bg-purple-50/50 border border-purple-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <input
                      type="checkbox"
                      id="anonymousCheck"
                      checked={form.isAnonymous}
                      onChange={(e) => setForm({ ...form, isAnonymous: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-400"
                    />
                    <label htmlFor="anonymousCheck" className="text-xs font-semibold text-purple-900 cursor-pointer">
                      Post as Anonymous (Recommended for complete privacy)
                    </label>
                  </div>

                  {!form.isAnonymous && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Your Name / Display Alias
                      </label>
                      <input
                        type="text"
                        maxLength={40}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g., Priya S. or Survivor from Delhi"
                        className="w-full p-3 bg-purple-50/50 border border-purple-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                  )}

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-3 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-semibold rounded-xl text-sm shadow-md transition disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? 'Submitting...' : 'Submit Story'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
