import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, Settings, LogIn, Sprout, ArrowRight, LogOut, TrendingUp, Bot, ScanLine, ShoppingBag, Layers, CloudRain, ShieldAlert, CheckCircle2, ChevronRight, X } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isLoggedIn, user, onOpenAuth, onLogout, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const isLanding = activeTab === 'home';
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotificationsDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    settings: 'Account Settings',
    notifications: 'Alerts & Notifications'
  };

  const quickAlerts = [
    {
      id: 1,
      title: 'Heavy Rain Warning (45mm)',
      time: '12m ago',
      desc: 'Postpone chemical spraying in Unnao sector.',
      icon: CloudRain,
      color: 'text-amber-600 bg-amber-50',
      tab: 'weather'
    },
    {
      id: 2,
      title: 'Wheat Mandi Price Surge',
      time: '1h ago',
      desc: '₹2,450/q (+4.2%) in regional mandis.',
      icon: TrendingUp,
      color: 'text-emerald-600 bg-emerald-50',
      tab: 'marketplace'
    },
    {
      id: 3,
      title: 'Yellow Rust Spore Alert',
      time: '3h ago',
      desc: 'Pathogen detected within 25 km.',
      icon: ShieldAlert,
      color: 'text-rose-600 bg-rose-50',
      tab: 'disease'
    }
  ];

  const mobileNavItems = [
    { id: 'home', label: 'Home', icon: Sprout },
    { id: 'ai', label: 'AI Bot', icon: Bot },
    { id: 'disease', label: 'Scan', icon: ScanLine },
    { id: 'marketplace', label: 'Mandi', icon: ShoppingBag },
    { id: 'menu', label: 'Menu', icon: Menu, isMenuTrigger: true }
  ];

  return (
    <header className="w-full py-3 px-3 sm:px-6 transition-all space-y-3">
      
      {/* LIVE APMC MANDI TICKER BAR (Light White & Emerald Theme) */}
      <div className="w-full bg-white text-[#00422b] px-3 sm:px-4 py-2 rounded-2xl flex items-center justify-between gap-2 shadow-sm text-xs border border-emerald-200/80">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap w-full">
          <div className="flex items-center gap-1.5 text-[#006c49] font-extrabold text-[10px] sm:text-[11px] flex-none">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Mandi Ticker (366 Districts)</span>
            <span className="sm:hidden">Mandi Ticker</span>
          </div>

          <div className="animate-marquee flex items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] text-[#3c4a42] font-semibold">
            <span className="flex items-center gap-1">🌾 Wheat: <strong className="text-[#006c49]">₹2,450/q (+4.2%)</strong></span>
            <span className="flex items-center gap-1">🍅 Tomato: <strong className="text-[#006c49]">₹3,200/q (+8.5%)</strong></span>
            <span className="flex items-center gap-1">🫘 Soybean: <strong className="text-amber-700">₹4,890/q (-1.1%)</strong></span>
            <span className="flex items-center gap-1">🌽 Maize: <strong className="text-[#006c49]">₹2,180/q (+1.5%)</strong></span>
          </div>
        </div>
      </div>

      {/* TOP HEADER BAR */}
      <div className="w-full flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Side: Brand Logo or Mobile Hamburger Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Hamburger Button */}
          {isLoggedIn && setIsMobileMenuOpen && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#006c49] hover:bg-emerald-50 focus:outline-none"
              title="Toggle Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          {!isLoggedIn ? (
            <button 
              onClick={() => setActiveTab('home')} 
              className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#006c49] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform flex-none">
                <Sprout className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="font-display font-extrabold text-xl sm:text-2xl text-[#006c49] tracking-tight">
                  AgriAI <span className="text-[#0284c7]">366</span>
                </span>
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-display font-extrabold text-xs sm:text-base text-[#006c49] uppercase tracking-wider truncate max-w-[160px] sm:max-w-none">
                {pageTitles[activeTab] || 'Dashboard Overview'}
              </span>
            </div>
          )}
        </div>

        {/* Center/Right Search Bar & User / Login Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          
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

          <div className="relative w-32 sm:w-64 hidden sm:block">
            <Search className="w-4 h-4 text-[#006c49]/60 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search yields..."
              className="w-full pl-9 pr-4 py-2 rounded-full text-xs font-semibold bg-white text-[#002117] placeholder-[#6c7a71] border border-emerald-200/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006c49]"
            />
          </div>

          {/* NOTIFICATIONS DROPDOWN ANCHOR */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
              className={`p-2 sm:p-2.5 rounded-full transition-colors relative cursor-pointer ${
                activeTab === 'notifications' || showNotificationsDropdown
                  ? 'bg-[#006c49] text-white shadow-sm'
                  : 'text-[#006c49] hover:bg-[#006c49]/10'
              }`}
              title="Notifications & Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-[#0284c7] absolute top-1.5 right-1.5 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-[#0284c7] absolute top-1.5 right-1.5" />
            </button>

            {/* NOTIFICATIONS QUICK FLYOUT */}
            {showNotificationsDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-emerald-100 z-50 p-4 animate-in fade-in slide-in-from-top-2 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#006c49]" />
                    <span className="font-extrabold text-xs text-[#002117]">Recent Farm Alerts</span>
                    <span className="text-[10px] bg-emerald-100 text-[#006c49] px-2 py-0.5 rounded-full font-bold">3 New</span>
                  </div>
                  <button 
                    onClick={() => setShowNotificationsDropdown(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {quickAlerts.map(alert => {
                    const Icon = alert.icon;
                    return (
                      <button
                        key={alert.id}
                        onClick={() => {
                          setShowNotificationsDropdown(false);
                          setActiveTab(alert.tab);
                        }}
                        className="w-full text-left p-2.5 rounded-2xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-100 transition-all flex items-start gap-3 cursor-pointer group"
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-none border ${alert.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-xs font-bold text-[#002117] group-hover:text-[#006c49] truncate">{alert.title}</p>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{alert.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{alert.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-emerald-100">
                  <button
                    onClick={() => {
                      setShowNotificationsDropdown(false);
                      setActiveTab('notifications');
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#006c49] text-white text-xs font-extrabold hover:bg-[#046a38] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>View All Alerts & Warnings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SETTINGS BUTTON */}
          <button 
            onClick={() => setActiveTab('settings')}
            className={`p-2 sm:p-2.5 rounded-full transition-colors hidden sm:block cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#006c49] text-white shadow-sm'
                : 'text-[#006c49] hover:bg-[#006c49]/10'
            }`}
            title="Account & Farm Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {!isLoggedIn ? (
            <button
              onClick={onOpenAuth}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#006c49] text-white text-xs font-bold shadow-md hover:bg-[#046a38] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 border-l border-[#006c49]/20 pl-2 sm:pl-3">
              {/* CLICKABLE USER PROFILE BADGE */}
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 p-1 sm:px-2 sm:py-1 rounded-full transition-all cursor-pointer group ${
                  activeTab === 'settings' ? 'bg-emerald-100/80' : 'hover:bg-emerald-50'
                }`}
                title="Manage Account Settings"
              >
                <img
                  src={user?.avatar || "/assets/agri_expert_portrait.jpg"}
                  alt={user?.name || "Farmer"}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-[#006c49] group-hover:scale-105 transition-transform"
                />
                <span className="hidden sm:inline font-black text-xs text-[#006c49] group-hover:text-[#046a38]">
                  {user?.name?.split(' ')[0] || user?.full_name?.split(' ')[0] || 'Farmer'}
                </span>
              </button>

              {/* LOGOUT BUTTON */}
              <button
                onClick={onLogout}
                className="p-1.5 rounded-xl hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (FIXED ON PHONE SCREENS) */}
      {isLoggedIn && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-emerald-200/80 px-2 py-2.5 flex items-center justify-around shadow-2xl pb-safe">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isMenuTrigger) {
                    if (setIsMobileMenuOpen) setIsMobileMenuOpen(!isMobileMenuOpen);
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#006c49] font-extrabold scale-105'
                    : 'text-slate-500 font-semibold hover:text-[#006c49]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#006c49]' : 'text-slate-500'}`} />
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}

