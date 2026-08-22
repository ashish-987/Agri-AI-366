import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Image as ImageIcon, 
  HelpCircle, 
  MapPin, 
  TrendingUp, 
  PlusCircle, 
  CheckCircle2, 
  Sparkles,
  UserPlus,
  Send,
  Flame,
  Award,
  Check,
  X
} from 'lucide-react';

export default function CommunityForum() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [postText, setPostText] = useState('');
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [followedExperts, setFollowedExperts] = useState({});
  const [toastNotice, setToastNotice] = useState('');

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Rajesh Kumar',
      location: 'Maharashtra • 2 hours ago',
      badge: 'Success Story',
      badgeBg: 'bg-emerald-100 text-[#006c49] border border-emerald-200',
      text: 'Incredible harvest results this season! Wheat yield improved by 24.5% using organic bio-composting and AI soil telemetry. Water retention stayed high even during the dry spell.',
      img: '/assets/fresh_mandi_produce.jpg',
      verified: true,
      likes: 245,
      comments: [
        { author: 'Dr. Meera Patel', role: 'Soil Pathologist', text: 'Great work Rajesh! Bio-composting builds excellent soil organic carbon content.' },
        { author: 'Harpreet Dhillon', role: 'Farmer (Punjab)', text: 'Did you apply 25kg Urea during tillering as well?' }
      ],
      authorImg: '/assets/agri_expert_portrait.jpg'
    },
    {
      id: 2,
      author: 'Anita Deshmukh',
      location: 'Gujarat • 5 hours ago',
      badge: 'Farmer Question',
      badgeBg: 'bg-amber-100 text-amber-800 border border-amber-200',
      text: 'Has anyone tried the new drought-resistant wheat seeds in black cotton soil? Looking for feedback on germination rates and water requirement per acre.',
      img: null,
      verified: false,
      likes: 89,
      comments: [
        { author: 'Vikram Singh', role: 'Irrigation Specialist', text: 'Black cotton soil holds moisture well. Keep drip irrigation interval to 4 days.' }
      ],
      authorImg: '/assets/smart_farm_aerial.jpg'
    }
  ]);

  const handleCreatePost = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: Date.now(),
      author: 'Gurpreet Singh',
      location: 'Punjab • Just now',
      badge: 'Discussion',
      badgeBg: 'bg-blue-100 text-blue-800 border border-blue-200',
      text: postText,
      img: '/assets/smart_farm_aerial.jpg',
      verified: true,
      likes: 1,
      comments: [],
      authorImg: '/assets/agri_expert_portrait.jpg'
    };
    setPosts([newPost, ...posts]);
    setPostText('');
    setToastNotice('✅ Your post has been published live to the Kisan Community Forum!');
    setTimeout(() => setToastNotice(''), 4000);
  };

  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, { author: 'Gurpreet Singh (You)', role: 'Verified Farmer', text: newComment }]
        };
      }
      return p;
    }));
    setNewComment('');
  };

  const toggleFollowExpert = (name) => {
    const isFollowing = !followedExperts[name];
    setFollowedExperts({ ...followedExperts, [name]: isFollowing });
    setToastNotice(isFollowing ? `✓ You are now following ${name}!` : `Unfollowed ${name}`);
    setTimeout(() => setToastNotice(''), 3000);
  };

  const trendingTopics = [
    { tag: '#OrganicFertilizer', posts: '1.2k posts this week' },
    { tag: '#TomatoBlightControl', posts: '845 posts • High Activity' },
    { tag: '#DripIrrigationSetup', posts: '530 posts' }
  ];

  const suggestedExperts = [
    { name: 'Dr. Meera Patel', title: 'Soil Pathologist', img: '/assets/agri_expert_portrait.jpg' },
    { name: 'Vikram Singh', title: 'Irrigation Specialist', img: '/assets/agri_expert_portrait.jpg' }
  ];

  return (
    <div className="space-y-8 py-2 w-full px-4 sm:px-6 animate-in fade-in">
      
      {/* Toast Notification */}
      {toastNotice && (
        <div className="p-4 rounded-2xl bg-[#006c49] text-white font-bold text-xs flex items-center justify-between shadow-xl animate-in fade-in">
          <span>{toastNotice}</span>
          <button onClick={() => setToastNotice('')} className="p-1 text-emerald-200 hover:text-white">✕</button>
        </div>
      )}

      {/* HEADER */}
      <div className="rounded-3xl p-8 bg-white border border-emerald-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#006c49] text-xs font-bold border border-emerald-200">
            <Users className="w-3.5 h-3.5 text-[#006c49]" />
            <span>FARMER COMMUNITY &amp; ADVISORY FORUM</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">
            Kisan Community Forum
          </h1>
          <p className="text-xs sm:text-sm text-[#3c4a42] font-medium">
            Share crop yields, ask peer questions, and discuss real-time farming techniques with 50,000+ Indian farmers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: User Profile Card & Feed Filter */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* User Profile Card */}
          <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm text-center space-y-4">
            <img
              src="/assets/agri_expert_portrait.jpg"
              alt="Gurpreet Singh"
              className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-[#006c49] shadow-sm"
            />
            <div>
              <h2 className="font-display font-black text-lg text-[#002117]">Gurpreet Singh</h2>
              <p className="text-xs text-[#6c7a71] font-semibold">Punjab, India • 12 Acres Farm</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-100">
              <div className="bg-emerald-50/70 p-2.5 rounded-2xl text-center">
                <p className="font-display font-black text-xl text-[#006c49]">142</p>
                <p className="text-[9px] font-extrabold uppercase text-[#6c7a71]">POSTS</p>
              </div>
              <div className="bg-blue-50/70 p-2.5 rounded-2xl text-center">
                <p className="font-display font-black text-xl text-[#0284c7]">8.5k</p>
                <p className="text-[9px] font-extrabold uppercase text-[#6c7a71]">IMPACT</p>
              </div>
            </div>
          </div>

          {/* Feed Filter Menu */}
          <div className="rounded-3xl p-5 bg-white border border-emerald-100 shadow-sm space-y-2">
            <p className="text-[10px] font-extrabold uppercase text-[#006c49] tracking-wider px-3 mb-2">EXPLORE COMMUNITY</p>
            
            <button
              onClick={() => setActiveFilter('all')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeFilter === 'all' ? 'bg-[#006c49] text-white shadow-md' : 'text-[#3c4a42] hover:bg-emerald-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4" />
                <span>All Community Activity</span>
              </div>
            </button>

            <button
              onClick={() => setActiveFilter('success')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeFilter === 'success' ? 'bg-[#006c49] text-white shadow-md' : 'text-[#3c4a42] hover:bg-emerald-50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#006c49]" />
              <span>Success Stories</span>
            </button>

            <button
              onClick={() => setActiveFilter('questions')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeFilter === 'questions' ? 'bg-[#006c49] text-white shadow-md' : 'text-[#3c4a42] hover:bg-emerald-50'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-[#006c49]" />
              <span>Questions &amp; Q&amp;A</span>
            </button>
          </div>
        </div>

        {/* CENTER COLUMN: Create Post & Feed */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Post Creator Box */}
          <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <img src="/assets/agri_expert_portrait.jpg" alt="User" className="w-10 h-10 rounded-2xl object-cover border-2 border-[#006c49] flex-none" />
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Share your crop update or ask the farmer community a question..."
                className="w-full p-3.5 rounded-2xl bg-emerald-50/50 text-xs font-semibold text-[#002117] placeholder-[#6c7a71] border border-emerald-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c49] resize-none h-24"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-emerald-100">
              <div className="flex items-center gap-3 text-xs text-[#006c49] font-extrabold">
                <button onClick={() => setPostText(prev => prev + " [Photo Attached]")} className="flex items-center gap-1.5 hover:underline">
                  <ImageIcon className="w-4 h-4" />
                  <span>Attach Farm Photo</span>
                </button>
              </div>

              <button 
                onClick={handleCreatePost}
                className="px-7 py-2.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold shadow-md hover:bg-[#046a38] transition-all uppercase tracking-wider flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>POST TO FORUM</span>
              </button>
            </div>
          </div>

          {/* Feed Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={post.authorImg} alt={post.author} className="w-10 h-10 rounded-2xl object-cover border-2 border-[#006c49]" />
                    <div>
                      <h3 className="font-display font-black text-sm text-[#002117]">{post.author}</h3>
                      <p className="text-[11px] text-[#6c7a71] font-medium">{post.location}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full ${post.badgeBg}`}>
                    {post.badge}
                  </span>
                </div>

                <p className="text-xs text-[#3c4a42] font-semibold leading-relaxed">{post.text}</p>

                {post.img && (
                  <div className="rounded-2xl overflow-hidden relative max-h-72 border border-emerald-100">
                    <img src={post.img} alt="Post Attachment" className="w-full h-full object-cover" />
                    {post.verified && (
                      <span className="absolute bottom-3 right-3 text-[10px] font-extrabold uppercase bg-white text-[#006c49] px-3 py-1 rounded-full shadow-md border border-emerald-100">
                        ✓ Verified Yield Result
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-emerald-100 text-xs font-extrabold text-[#6c7a71]">
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleLike(post.id)} className="flex items-center gap-1.5 hover:text-[#006c49] transition-colors">
                      <ThumbsUp className="w-4 h-4 text-[#006c49]" />
                      <span>{post.likes} Likes</span>
                    </button>
                    <button onClick={() => setActiveCommentPost(post)} className="flex items-center gap-1.5 hover:text-[#006c49] transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments.length} Comments</span>
                    </button>
                  </div>
                  <button onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    setToastNotice('Link copied to clipboard!');
                    setTimeout(() => setToastNotice(''), 3000);
                  }} className="flex items-center gap-1.5 hover:text-[#006c49] transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Trending Topics & Suggested Experts */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Trending Topics */}
          <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-4">
            <h3 className="font-display font-extrabold text-xs uppercase text-[#006c49] tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>TRENDING TOPICS</span>
            </h3>
            <div className="space-y-3 text-xs">
              {trendingTopics.map((topic, i) => (
                <div 
                  key={i} 
                  onClick={() => setPostText(`${topic.tag} `)}
                  className="space-y-0.5 border-b border-emerald-50 pb-2 last:border-0 cursor-pointer hover:opacity-80"
                >
                  <p className="font-extrabold text-[#002117] hover:text-[#006c49]">{topic.tag}</p>
                  <p className="text-[10px] text-[#6c7a71] font-semibold">{topic.posts}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Experts */}
          <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-4">
            <h3 className="font-display font-extrabold text-xs uppercase text-[#006c49] tracking-wider">
              SUGGESTED EXPERTS TO FOLLOW
            </h3>
            <div className="space-y-3">
              {suggestedExperts.map((exp, i) => {
                const isFollowing = followedExperts[exp.name];
                return (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={exp.img} alt={exp.name} className="w-9 h-9 rounded-2xl object-cover border border-emerald-200" />
                      <div>
                        <p className="font-black text-xs text-[#002117]">{exp.name}</p>
                        <p className="text-[10px] text-[#6c7a71] font-semibold">{exp.title}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleFollowExpert(exp.name)}
                      className={`p-2 rounded-xl text-xs font-extrabold transition-all shadow-sm ${
                        isFollowing ? 'bg-[#006c49] text-white' : 'bg-emerald-100 text-[#006c49] hover:bg-[#006c49] hover:text-white'
                      }`}
                    >
                      {isFollowing ? <Check className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* COMMENTS DRAWER MODAL */}
      {activeCommentPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-emerald-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div>
                <span className="text-[9px] font-extrabold uppercase bg-emerald-100 text-[#006c49] px-2.5 py-1 rounded-full">
                  DISCUSSION THREAD
                </span>
                <h3 className="font-display font-black text-xl text-[#002117] mt-1">Comments on {activeCommentPost.author}'s Post</h3>
              </div>
              <button onClick={() => setActiveCommentPost(null)} className="text-gray-400 hover:text-red-500 text-lg font-bold">✕</button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {activeCommentPost.comments.length === 0 ? (
                <p className="text-xs text-[#6c7a71] font-medium text-center py-4">No comments yet. Be the first farmer to reply!</p>
              ) : (
                activeCommentPost.comments.map((c, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[#002117]">{c.author}</span>
                      <span className="text-[10px] text-[#006c49] font-bold">{c.role}</span>
                    </div>
                    <p className="text-[#3c4a42] font-semibold">{c.text}</p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleAddComment(activeCommentPost.id); }} className="flex items-center gap-2 pt-2 border-t border-emerald-100">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a reply or ask a follow-up question..."
                className="flex-1 p-3 rounded-2xl bg-emerald-50/50 text-xs font-semibold border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
              />
              <button type="submit" className="p-3 rounded-2xl bg-[#006c49] text-white shadow-md hover:bg-[#046a38]">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
