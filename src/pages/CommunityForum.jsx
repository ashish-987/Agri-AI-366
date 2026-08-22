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
  Send
} from 'lucide-react';

export default function CommunityForum() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [postText, setPostText] = useState('');

  const posts = [
    {
      id: 1,
      author: 'Rajesh Kumar',
      location: 'Maharashtra • 2 hours ago',
      badge: 'Success Story',
      badgeBg: 'bg-[#dcfce7] text-[#006c49]',
      text: 'Incredible results this season! Yield improved by 20% using organic composting techniques recommended by the AI Assistant. The soil moisture retention has been fantastic even during the dry spell last week. Here\'s a look at the harvest.',
      img: '/assets/fresh_mandi_produce.jpg',
      verified: true,
      likes: 245,
      comments: 32,
      authorImg: '/assets/agri_expert_portrait.jpg'
    },
    {
      id: 2,
      author: 'Anita Deshmukh',
      location: 'Gujarat • 5 hours ago',
      badge: 'Question',
      badgeBg: 'bg-[#fef3c7] text-[#d97706]',
      text: 'Has anyone tried the new drought-resistant wheat seeds in black cotton soil? Looking for feedback on germination rates and water requirements.',
      img: null,
      verified: false,
      likes: 89,
      comments: 18,
      authorImg: '/assets/smart_farm_aerial.jpg'
    }
  ];

  const trendingTopics = [
    { tag: '#OrganicFertilizer', posts: '1.2k posts this week' },
    { tag: '#TomatoBlight', posts: '845 posts • High Activity' },
    { tag: '#MonsoonPrep2024', posts: '530 posts' }
  ];

  const suggestedExperts = [
    { name: 'Dr. Meera Patel', title: 'Soil Pathologist', img: '/assets/agri_expert_portrait.jpg' },
    { name: 'Vikram Singh', title: 'Irrigation Specialist', img: '/assets/agri_expert_portrait.jpg' }
  ];

  return (
    <div className="space-y-8 py-2 w-full">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: User Profile Card & Feed Filter */}
        <div className="lg:col-span-3 space-y-6">
          {/* User Profile Card */}
          <div className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm text-center space-y-4">
            <img
              src="/assets/agri_expert_portrait.jpg"
              alt="Farmer Singh"
              className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-[#006c49]"
            />
            <div>
              <h2 className="font-display font-extrabold text-lg text-[#002117]">Farmer Singh</h2>
              <p className="text-xs text-[#6c7a71]">Punjab, India</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#006c49]/10">
              <div className="bg-[#dcfce7]/60 p-2.5 rounded-2xl">
                <p className="font-display font-black text-xl text-[#006c49]">142</p>
                <p className="text-[9px] font-extrabold uppercase text-[#6c7a71]">POSTS</p>
              </div>
              <div className="bg-[#dcfce7]/60 p-2.5 rounded-2xl">
                <p className="font-display font-black text-xl text-[#0284c7]">8.5k</p>
                <p className="text-[9px] font-extrabold uppercase text-[#6c7a71]">IMPACT</p>
              </div>
            </div>

            <button className="w-full py-3 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all">
              VIEW FULL PROFILE
            </button>
          </div>

          {/* Explore Feed Filter Menu */}
          <div className="rounded-3xl p-5 bg-white border border-[#006c49]/15 shadow-sm space-y-2">
            <p className="text-[10px] font-extrabold uppercase text-[#006c49] tracking-wider px-3 mb-2">EXPLORE FEED</p>
            
            <button
              onClick={() => setActiveFilter('all')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeFilter === 'all' ? 'bg-[#dcfce7] text-[#006c49]' : 'text-[#3c4a42] hover:bg-[#dcfce7]/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#006c49]" />
                <span>All Activity</span>
              </div>
              <span className="text-[9px] font-extrabold uppercase bg-[#006c49] text-white px-2 py-0.5 rounded-full">New</span>
            </button>

            <button
              onClick={() => setActiveFilter('success')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeFilter === 'success' ? 'bg-[#dcfce7] text-[#006c49]' : 'text-[#3c4a42] hover:bg-[#dcfce7]/50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#006c49]" />
              <span>Success Stories</span>
            </button>

            <button
              onClick={() => setActiveFilter('questions')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeFilter === 'questions' ? 'bg-[#dcfce7] text-[#006c49]' : 'text-[#3c4a42] hover:bg-[#dcfce7]/50'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-[#006c49]" />
              <span>Questions & Q&A</span>
            </button>

            <button
              onClick={() => setActiveFilter('equipment')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeFilter === 'equipment' ? 'bg-[#dcfce7] text-[#006c49]' : 'text-[#3c4a42] hover:bg-[#dcfce7]/50'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-[#006c49]" />
              <span>Equipment Tips</span>
            </button>
          </div>
        </div>

        {/* CENTER COLUMN: Create Post & Feed */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Post Creator Box */}
          <div className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <img src="/assets/agri_expert_portrait.jpg" alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-[#006c49] flex-none" />
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What's happening on the farm today?"
                className="w-full p-3 rounded-2xl bg-[#dcfce7]/30 text-xs font-semibold border border-[#006c49]/10 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c49] resize-none h-20"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#006c49]/10">
              <div className="flex items-center gap-3 text-xs text-[#006c49] font-bold">
                <button className="flex items-center gap-1 hover:underline">
                  <ImageIcon className="w-4 h-4" />
                  <span>Photo/Video</span>
                </button>
                <button className="flex items-center gap-1 hover:underline">
                  <HelpCircle className="w-4 h-4" />
                  <span>Ask Question</span>
                </button>
              </div>

              <button className="px-6 py-2 rounded-xl bg-[#006c49] text-white text-xs font-extrabold shadow-md hover:bg-[#046a38] transition-all">
                POST
              </button>
            </div>
          </div>

          {/* Feed Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={post.authorImg} alt={post.author} className="w-10 h-10 rounded-full object-cover border-2 border-[#006c49]" />
                    <div>
                      <h3 className="font-display font-bold text-sm text-[#002117]">{post.author}</h3>
                      <p className="text-[11px] text-[#6c7a71]">{post.location}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full ${post.badgeBg}`}>
                    {post.badge}
                  </span>
                </div>

                <p className="text-xs text-[#3c4a42] font-medium leading-relaxed">{post.text}</p>

                {post.img && (
                  <div className="rounded-2xl overflow-hidden relative max-h-72">
                    <img src={post.img} alt="Post Attachment" className="w-full h-full object-cover" />
                    {post.verified && (
                      <span className="absolute bottom-3 right-3 text-[10px] font-extrabold uppercase bg-white/90 text-[#006c49] px-3 py-1 rounded-full shadow-md">
                        ✓ Verified Output
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-[#006c49]/10 text-xs font-bold text-[#6c7a71]">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 hover:text-[#006c49]">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-[#006c49]">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                  <button className="flex items-center gap-1.5 hover:text-[#006c49]">
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
          <div className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-4">
            <h3 className="font-display font-extrabold text-xs uppercase text-[#006c49] tracking-wider">
              🔥 TRENDING TOPICS
            </h3>
            <div className="space-y-3 text-xs">
              {trendingTopics.map((topic, i) => (
                <div key={i} className="space-y-0.5">
                  <p className="font-bold text-[#002117] hover:text-[#006c49] cursor-pointer">{topic.tag}</p>
                  <p className="text-[10px] text-[#6c7a71]">{topic.posts}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Experts */}
          <div className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-4">
            <h3 className="font-display font-extrabold text-xs uppercase text-[#006c49] tracking-wider">
              SUGGESTED EXPERTS
            </h3>
            <div className="space-y-3">
              {suggestedExperts.map((exp, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={exp.img} alt={exp.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-xs text-[#002117]">{exp.name}</p>
                      <p className="text-[10px] text-[#6c7a71]">{exp.title}</p>
                    </div>
                  </div>
                  <button className="p-1.5 rounded-full bg-[#dcfce7] text-[#006c49] hover:bg-[#006c49] hover:text-white transition-colors">
                    <UserPlus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Meetup Banner */}
          <div className="rounded-3xl p-6 bg-[#00422b] text-white space-y-2 shadow-lg relative overflow-hidden">
            <h3 className="font-display font-black text-xl text-[#6ffbbe]">Join the Summit</h3>
            <p className="text-xs text-[#bbcabf] font-semibold">Annual Agri-Tech Virtual Meetup</p>
          </div>

        </div>

      </div>

    </div>
  );
}
