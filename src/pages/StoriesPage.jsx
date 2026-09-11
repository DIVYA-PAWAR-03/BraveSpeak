import React, { useState, useMemo } from 'react';
import { 
  Heart, PlusCircle, Search, Clock, Tag, Share2, 
  CheckCircle2, X, AlertCircle, Sparkles, MessageCircle, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialStories = [
  {
    id: 1,
    img: '/images/news_6.png',
    title: 'Breaking the Workplace Silence',
    category: 'Workplace Courage',
    desc: 'When discriminatory remarks and inappropriate advances started at my firm, I felt completely isolated. After learning about the POSH Internal Complaints Committee, I documented everything and filed a formal complaint. The process was hard, but it resulted in corrective action and created safer policies for every woman in our team.',
    author: 'Ananya S.',
    readTime: '3 min read',
    likes: 42,
    date: 'August 2024'
  },
  {
    id: 2,
    img: '/images/news_7.png',
    title: 'Finding Strength in Community Counseling',
    category: 'Healing & Recovery',
    desc: 'Healing from traumatic assault felt impossible until I joined a weekly survivor circle. Speaking my truth in a space with zero judgment gave me my dignity back. No one should carry this weight alone.',
    author: 'Pooja M.',
    readTime: '4 min read',
    likes: 68,
    date: 'July 2024'
  },
  {
    id: 3,
    img: '/images/news_8.png',
    title: 'Taking on Cyber Blackmail & Winning',
    category: 'Cyber Safety',
    desc: 'My private photos were leaked and used to blackmail me for money. Instead of giving in, I took screenshots and immediately contacted cybercrime.gov.in and the 1930 helpline. The cyber cell acted swiftly to take down the content and identify the perpetrator.',
    author: 'Anonymous',
    readTime: '3 min read',
    likes: 95,
    date: 'September 2024'
  },
  {
    id: 4,
    img: '/images/news_9.png',
    title: 'A Fresh Start After Years of Domestic Abuse',
    category: 'Legal Victory',
    desc: 'With the assistance of the District Legal Services Authority (DLSA) providing free legal counsel, I was able to secure a protection order and financial independence. Freedom is real, and help is out there.',
    author: 'Sunita R.',
    readTime: '5 min read',
    likes: 112,
    date: 'June 2024'
  },
  {
    id: 5,
    img: '/images/news_11.webp',
    title: 'Voices United on Campus',
    category: 'Community Action',
    desc: 'After persistent stalking incidents went unaddressed on our university campus, we mobilized a student awareness campaign demanding CCTV coverage, emergency call boxes, and mandatory gender sensitization workshops.',
    author: 'Student Collective',
    readTime: '3 min read',
    likes: 84,
    date: 'May 2024'
  },
  {
    id: 6,
    img: '/images/news_3.jpg',
    title: 'Reclaiming My Voice After Modesty Assault',
    category: 'Workplace Courage',
    desc: 'Overcoming fear of public scrutiny, I filed an FIR under Section 354 IPC. The support from my family and legal advocate helped me stand firm through trial proceedings.',
    author: 'Deepa V.',
    readTime: '4 min read',
    likes: 73,
    date: 'April 2024'
  },
  {
    id: 7,
    img: '/images/news_10.webp',
    title: 'Therapy & Mindful Recovery Journey',
    category: 'Healing & Recovery',
    desc: 'Trauma recovery is not linear. Regular counseling sessions, yoga, and journaling helped me rebuild my self-worth step by step.',
    author: 'Kavita T.',
    readTime: '2 min read',
    likes: 56,
    date: 'March 2024'
  },
  {
    id: 8,
    img: '/images/news_4.jpeg',
    title: 'Becoming an Advocate for Others',
    category: 'Community Action',
    desc: 'Having survived harassment early in my career, I now volunteer with women safety NGOs to mentor young professionals on assertiveness, reporting protocols, and emotional resilience.',
    author: 'Meera K.',
    readTime: '4 min read',
    likes: 129,
    date: 'February 2024'
  }
];

const categories = [
  'All',
  'Workplace Courage',
  'Cyber Safety',
  'Healing & Recovery',
  'Legal Victory',
  'Community Action'
];

export default function StoriesPage() {
  const [stories, setStories] = useState(initialStories);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedMap, setLikedMap] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [form, setForm] = useState({ name: '', title: '', category: 'Workplace Courage', desc: '', isAnonymous: false });
  const [successToast, setSuccessToast] = useState('');

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
      const matchesSearch = 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [stories, selectedCategory, searchQuery]);

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
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

  const handleSubmitStory = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.desc.trim()) return;

    const newStory = {
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

    setStories([newStory, ...stories]);
    setForm({ name: '', title: '', category: 'Workplace Courage', desc: '', isAnonymous: false });
    setShowForm(false);
    setSuccessToast('Your story has been shared safely with the BraveSpeak community!');
    setTimeout(() => setSuccessToast(''), 5000);
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6A0DAD] to-purple-600 hover:from-purple-600 hover:to-[#6A0DAD] text-white rounded-full font-semibold shadow-lg shadow-purple-950/20 hover:scale-105 transition-all cursor-pointer"
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

        {/* Stories Grid */}
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
              const likeCount = story.likes + (isLiked ? 1 : 0);

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
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full border transition ${
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
                        className="p-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:text-purple-900 transition"
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
                  className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition"
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
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-600 font-bold rounded-full border border-rose-200 hover:bg-rose-100 transition"
                    >
                      <Heart size={16} className={likedMap[selectedStory.id] ? "fill-rose-500" : ""} />
                      <span>{selectedStory.likes + (likedMap[selectedStory.id] ? 1 : 0)} People Supported</span>
                    </button>

                    <button
                      onClick={() => setSelectedStory(null)}
                      className="px-6 py-2 bg-[#2E003E] text-white font-semibold rounded-full hover:bg-purple-950 transition"
                    >
                      Close Reader
                    </button>
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
                  className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition"
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
                      className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-[#6A0DAD] to-purple-600 hover:from-purple-600 hover:to-[#6A0DAD] text-white font-semibold rounded-xl text-sm shadow-md transition"
                    >
                      Submit Story
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
