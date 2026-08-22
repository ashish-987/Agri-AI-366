import React from 'react';
import { Menu, Search, Bell, Settings, LogIn, Sprout, ArrowRight, LogOut, TrendingUp } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isLoggedIn, user, onOpenAuth, onLogout }) {
  const isLanding = activeTab === 'home';

  const pageTitles = {
    home: 'Home',
    marketplace: 'AI Mandi Marketplace',
    weather: 'Weather Intelligence',
    disease: 'AI Disease Scan',
    farm: 'Farm Management',
    equipment: 'Equipment Leasing Hub',
    experts: 'Expert Consultation',
    forum: 'Community Forum',
    ai: '24/7 AI Agronomist',
    settings: 'Account Settings'
  };

  return (
    <header className="w-full py-3 px-4 sm:px-6 transition-all space-y-3">
      
      {/* LIVE APMC MANDI TICKER BAR (Light White & Emerald Theme) */}
      <div className="w-full bg-white text-[#00422b] px-4 py-2 rounded-2xl flex items-center justify-between gap-2 shadow-sm text-xs border border-emerald-200/80">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap w-full">
          <div className="flex items-center gap-1.5 text-[#006c49] font-extrabold text-[11px] flex-none">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Live Mandi Ticker (366 Districts)</span>
          </div>

          <div className="animate-marquee flex items-center gap-6 text-[11px] text-[#3c4a42] font-semibold">
            <span className="flex items-center gap-1">🌾 Wheat: <strong className="text-[#006c49]">₹2,450/q (+4.2%)</strong></span>
            <span className="flex items-center gap-1">🍅 Tomato: <strong className="text-[#006c49]">₹3,200/q (+8.5%)</strong></span>
            <span className="flex items-center gap-1">🫘 Soybean: <strong className="text-amber-700">₹4,890/q (-1.1%)</strong></span>
            <span className="flex items-center gap-1">🌽 Maize: <strong className="text-[#006c49]">₹2,180/q (+1.5%)</strong></span>
          </div>
        </div>
      </div>

      {/* TOP HEADER BAR */}
      <div className="w-full flex items-center justify-between gap-4">
        
        {/* Left Side: Brand Logo when logged out (no sidebar), or Page Title when logged in (sidebar active) */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <button 
              onClick={() => setActiveTab('home')} 
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#006c49] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform flex-none">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="font-display font-extrabold text-2xl text-[#006c49] tracking-tight">
                  AgriAI <span className="text-[#0284c7]">366</span>
                </span>
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="font-display font-extrabold text-sm sm:text-base text-[#006c49] uppercase tracking-wider">
                {pageTitles[activeTab] || 'Dashboard Overview'}
              </span>
            </div>
          )}
        </div>

        {/* Center/Right Search Bar & User / Login Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Quick Nav Button to Dashboard on Landing Page when Logged In */}
          {isLoggedIn && isLanding && (
            <button
              onClick={() => setActiveTab('marketplace')}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#006c49] text-white text-xs font-extrabold hover:bg-[#046a38] transition-all shadow-sm"
            >
              <span>ENTER DASHBOARD</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="relative w-36 sm:w-64 hidden sm:block">
            <Search className="w-4 h-4 text-[#006c49]/60 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search yields..."
              className="w-full pl-9 pr-4 py-2 rounded-full text-xs font-semibold bg-white text-[#002117] placeholder-[#6c7a71] border border-emerald-200/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006c49]"
            />
          </div>

          <button className="p-2.5 rounded-full text-[#006c49] hover:bg-[#006c49]/10 transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-[#0284c7] absolute top-2 right-2 animate-ping" />
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            className="p-2.5 rounded-full text-[#006c49] hover:bg-[#006c49]/10 transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {!isLoggedIn ? (
            <button
              onClick={onOpenAuth}
              className="px-5 py-2.5 rounded-full bg-[#006c49] text-white text-xs font-bold shadow-md hover:bg-[#046a38] transition-all flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login / Register</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 border-l border-[#006c49]/20 pl-3">
              <img
                src="/assets/agri_expert_portrait.jpg"
                alt="User"
                className="w-8 h-8 rounded-full object-cover border-2 border-[#006c49]"
              />
              <span className="hidden sm:inline font-bold text-xs text-[#006c49]">{user?.name?.split(' ')[0] || 'Farmer'}</span>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
