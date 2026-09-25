import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Shield, PhoneCall, Clock, Share2, MessageCircle, Send, User } from 'lucide-react';
import { storiesApi } from '../services/api';

export default function StoryDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [story, setStory] = useState(location.state?.story || null);
  const [loading, setLoading] = useState(!location.state?.story);
  const [likes, setLikes] = useState(location.state?.story?.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (id) {
      storiesApi.getById(id)
        .then((res) => {
          if (res.success && res.data) {
            const s = res.data;
            setStory({
              id: s.id,
              img: s.image_url || '/images/news_3.jpg',
              title: s.title,
              category: s.category,
              desc: s.description,
              author: s.is_anonymous ? 'Anonymous' : s.author,
              readTime: s.read_time || '3 min read',
              likes: s.likes || 0,
              date: new Date(s.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            });
            setLikes(s.likes || 0);
            if (s.comments) setComments(s.comments);
          }
        })
        .catch((err) => {
          console.warn('Could not fetch story by ID:', err);
        })
        .finally(() => setLoading(false));

      storiesApi.getComments(id)
        .then((res) => {
          if (res.success) setComments(res.data);
        })
        .catch(() => {});
    }
  }, [id]);

  const handleLike = async () => {
    const updated = !isLiked;
    setIsLiked(updated);
    setLikes((prev) => prev + (updated ? 1 : -1));
    if (updated && story?.id) {
      try {
        await storiesApi.like(story.id);
      } catch (e) {
        console.warn('Like sync failed:', e);
      }
    }
  };

  const handleShare = () => {
    if (!story) return;
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

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentInput.trim() || !story?.id) return;

    try {
      setSubmittingComment(true);
      const res = await storiesApi.addComment(story.id, {
        author: commentAuthor.trim() || 'Supporter',
        content: commentInput.trim()
      });

      if (res.success && res.data) {
        setComments([res.data, ...comments]);
        setCommentInput('');
      }
    } catch (err) {
      setComments([{
        id: Date.now(),
        author: commentAuthor.trim() || 'Supporter',
        content: commentInput.trim(),
        created_at: new Date().toISOString()
      }, ...comments]);
      setCommentInput('');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-10 h-10 border-4 border-purple-200 dark:border-slate-700 border-t-purple-800 dark:border-t-purple-400 rounded-full animate-spin mb-3"></div>
        <p className="text-xs font-semibold text-purple-900 dark:text-purple-300">Loading story details...</p>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 rounded-full flex items-center justify-center mb-4">
          <Shield size={32} />
        </div>
        <h2 className="text-2xl font-bold text-[#2E003E] dark:text-slate-100 mb-2">Story Not Found</h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-sm mb-6">
          The story you are looking for might have been moved or is currently unavailable.
        </p>
        <Link
          to="/survivorStories"
          className="bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
        >
          Return to Survivor Stories
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-bold text-purple-700 dark:text-purple-400 hover:text-purple-950 dark:hover:text-purple-300 transition cursor-pointer"
        >
          <ArrowLeft size={18} />
          <span>Back to Stories</span>
        </button>

        {/* Story Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-purple-100 dark:border-slate-700/80 overflow-hidden">
          <div className="relative h-72 sm:h-96 w-full bg-purple-900 dark:bg-slate-900">
            <img 
              src={story.img} 
              alt={story.title} 
              className="w-full h-full object-cover" 
              onError={(e) => { e.target.src = '/images/news_3.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            {story.category && (
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 bg-[#2E003E]/80 dark:bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold rounded-full border border-purple-400/30 dark:border-purple-500/30">
                  {story.category}
                </span>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2E003E] dark:text-slate-100 leading-tight">
              {story.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/60 pb-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <span className="font-bold text-purple-900 dark:text-purple-300">By {story.author || 'Anonymous Survivor'}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {story.readTime || '3 min read'}</span>
                <span>•</span>
                <span>{story.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    isLiked 
                      ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800' 
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400'
                  }`}
                >
                  <Heart size={13} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />
                  <span>{likes} Supported</span>
                </button>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 dark:bg-purple-950/60 border border-purple-200/50 dark:border-purple-800/50 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  <Share2 size={13} /> Share
                </button>
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {story.desc}
            </p>

            {/* Helpline box */}
            <div className="p-6 bg-purple-900 dark:bg-purple-950 border dark:border-purple-800/80 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-base">You Are Never Alone</h4>
                <p className="text-xs text-purple-200 mt-0.5">Free 24/7 confidential legal counsel & emergency response.</p>
              </div>
              <div className="flex gap-2">
                <a href="tel:181" className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-full text-xs transition flex items-center gap-1.5">
                  <PhoneCall size={13} /> Helpline: 181
                </a>
                <a href="tel:112" className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full text-xs transition flex items-center gap-1.5">
                  Emergency: 112
                </a>
              </div>
            </div>

            {/* Comments / Messages of Support Section */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-700/60 space-y-4">
              <h3 className="text-lg font-bold text-[#2E003E] dark:text-slate-100 flex items-center gap-2">
                <MessageCircle size={20} className="text-purple-700 dark:text-purple-400" />
                <span>Messages of Support ({comments.length})</span>
              </h3>

              <form onSubmit={handleAddComment} className="space-y-3 bg-purple-50/60 dark:bg-slate-900/60 p-4 rounded-2xl border border-purple-200 dark:border-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    placeholder="Your Name / Supporter Alias (Optional)"
                    className="px-3 py-2 bg-white dark:bg-slate-800 border border-purple-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Write a warm note of encouragement or solidarity..."
                    className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-purple-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                  <button
                    type="submit"
                    disabled={submittingComment || !commentInput.trim()}
                    className="px-4 py-2 bg-purple-900 dark:bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-950 dark:hover:bg-purple-500 transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                  >
                    <Send size={13} />
                    <span>Send</span>
                  </button>
                </div>
              </form>

              <div className="space-y-3">
                {comments.length === 0 ? (
                  <p className="text-xs text-slate-400 dark:text-slate-500 italic text-center py-4">
                    No messages yet. Be the first to leave a message of strength!
                  </p>
                ) : (
                  comments.map((c) => (
                    <div key={c.id} className="p-4 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs space-y-1.5">
                      <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                        <span className="font-bold text-purple-950 dark:text-purple-300 flex items-center gap-1.5">
                          <User size={13} className="text-purple-600 dark:text-purple-400" />
                          {c.author}
                        </span>
                        <span className="text-[10px]">{new Date(c.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{c.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


