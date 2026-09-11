import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Shield, PhoneCall, Clock, Share2 } from 'lucide-react';

export default function StoryDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const story = location.state?.story;

  if (!story) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-4">
          <Shield size={32} />
        </div>
        <h2 className="text-2xl font-bold text-[#2E003E] mb-2">Story Not Found</h2>
        <p className="text-slate-600 text-sm max-w-sm mb-6">
          The story you are looking for might have been moved or is currently unavailable.
        </p>
        <Link
          to="/survivorStories"
          className="bg-gradient-to-r from-[#6A0DAD] to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
        >
          Return to Survivor Stories
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.desc,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Story link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-bold text-purple-700 hover:text-purple-950 transition cursor-pointer"
        >
          <ArrowLeft size={18} />
          <span>Back to Stories</span>
        </button>

        {/* Story Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
          <div className="relative h-72 sm:h-96 w-full">
            <img 
              src={story.img} 
              alt={story.title} 
              className="w-full h-full object-cover" 
              onError={(e) => { e.target.src = '/images/news_3.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            {story.category && (
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 bg-[#2E003E]/80 backdrop-blur-md text-white text-xs font-bold rounded-full border border-purple-400/30">
                  {story.category}
                </span>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2E003E] leading-tight">
              {story.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <span className="font-bold text-purple-900">By {story.author || 'Anonymous Survivor'}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {story.readTime || '3 min read'}</span>
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-xs font-bold transition"
              >
                <Share2 size={13} /> Share Story
              </button>
            </div>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {story.desc}
            </p>

            {/* Helpline box */}
            <div className="p-6 bg-gradient-to-r from-purple-900 to-[#2E003E] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-base">You Are Never Alone</h4>
                <p className="text-xs text-purple-200 mt-0.5">Free 24/7 confidential legal counsel & emergency response.</p>
              </div>
              <div className="flex gap-2">
                <a href="tel:181" className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-full text-xs transition flex items-center gap-1.5">
                  <PhoneCall size={13} /> Helpline: 181
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
