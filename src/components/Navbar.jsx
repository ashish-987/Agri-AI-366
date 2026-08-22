import React from 'react';
import { Menu, Search, Bell, Settings, LogIn, UserCheck, Sparkles, TrendingUp } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isLoggedIn, user, onOpenAuth, onLogout }) {
  return (
    <header className="w-full py-2 px-4 sm:px-6 transition-all space-y-2">
      
      {/* LIVE APMC MANDI TICKER BAR */}
      <div className="w-full bg-[#002117] text-white px-4 py-1.5 rounded-2xl flex items-center justify-between gap-2 shadow-sm text-xs border border-[#10b981]/30">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap w-full">
          <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-[11px] flex-none">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Live Mandi Ticker (366 Districts)</span>
          </div>

          <div className="animate-marquee flex items-center gap-6 text-[11px] text-[#bbcabf] font-semibold">
            <span className="flex items-center gap-1">🌾 Wheat: <strong className="text-[#6ffbbe]">₹2,450/q (+4.2%)</strong></span>
            <span className="flex items-center gap-1">🍅 Tomato: <strong className="text-[#6ffbbe]">₹3,200/q (+8.5%)</strong></span>
            <span className="flex items-center gap-1">🫘 Soybean: <strong className="text-amber-300">₹4,890/q (-1.1%)</strong></span>
            <span className="flex items-center gap-1">🌽 Maize: <strong className="text-[#6ffbbe]">₹2,180/q (+1.5%)</strong></span>
          </div>
        </div>
      </div>

      {/* TOP HEADER BAR */}
      <div className="w-full flex items-center justify-between gap-4">
        
        {/* Left Side: Hamburger Menu & Dashboard Overview Heading */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-xl text-[#006c49] hover:bg-[#006c49]/10 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-display font-extrabold text-xs text-[#006c49] uppercase tracking-widest">
            Dashboard Overview
          </span>
        </div>

        {/* Center/Right Search Bar & Icons */}
        <div className="flex items-center gap-4">
          <div className="relative w-48 sm:w-64">
            <Search className="w-4 h-4 text-[#006c49]/60 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search yields..."
              className="w-full pl-9 pr-4 py-2 rounded-full text-xs font-semibold bg-[#006c49]/10 text-[#006c49] placeholder-[#006c49]/60 border border-[#006c49]/15 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c49]"
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

          {!isLoggedIn && (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-full bg-[#006c49] text-white text-xs font-bold shadow-sm hover:bg-[#046a38] transition-all flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
