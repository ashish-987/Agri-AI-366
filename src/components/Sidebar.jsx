import React, { useState } from 'react';
import { 
  Sprout, 
  ShoppingBag, 
  ScanLine, 
  Layers, 
  CloudSun, 
  Tractor, 
  Users, 
  Bot, 
  Settings, 
  LogOut, 
  Globe, 
  ChevronDown, 
  LogIn, 
  UserCheck, 
  Lock,
  X
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isLoggedIn, user, onOpenAuth, onLogout, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  const navItems = [
    { id: 'home', label: 'Home', icon: Sprout },
    { id: 'ai', label: 'AI Assistant', icon: Bot, isPulse: true },
    { id: 'disease', label: 'Disease Detection', icon: ScanLine },
    { id: 'farm', label: 'Farm Management', icon: Layers },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'equipment', label: 'Equipment Leasing', icon: Tractor },
    { id: 'experts', label: 'Expert Consultation', icon: Users },
    { id: 'forum', label: 'Community', icon: Users },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, badge: 'AI Mandi' }
  ];

  const languages = ['English', 'हिंदी (Hindi)', 'ਪੰਜਾਬੀ (Punjabi)', 'मराठी (Marathi)', 'తెలుగు (Telugu)'];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between overflow-hidden">
      
      {/* TOP HEADER: BRAND LOGO (FIXED AT TOP OF SIDEBAR) */}
      <div className="flex-none pb-3 border-b border-emerald-100/60">
        <div className="flex items-center justify-between px-1 pt-1">
          <button 
            onClick={() => {
              setActiveTab('home');
              if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
            }} 
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#006c49] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform flex-none">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl text-[#006c49] tracking-tight">
                AgriAI <span className="text-[#0284c7]">366</span>
              </span>
            </div>
          </button>

          {/* Close button for mobile drawer */}
          {setIsMobileMenuOpen && (
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* MIDDLE: NAVIGATION LIST (SCROLLS INTERNALLY ONLY IF NEEDED) */}
      <nav className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-1.5 pr-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isLocked = !isLoggedIn && item.id !== 'home';

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-[#006c49] to-[#046a38] text-white shadow-md ring-2 ring-[#006c49]/20 scale-[1.02]'
                  : 'text-[#065f46] hover:bg-emerald-50/80 hover:text-[#006c49]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-[#006c49]'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-extrabold uppercase ${
                  isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-[#006c49]'
                }`}>
                  {item.badge}
                </span>
              )}

              {isLocked && (
                <Lock className="w-3.5 h-3.5 text-amber-600" />
              )}
            </button>
          );
        })}
      </nav>

      {/* BOTTOM FIXED CONTROLS & USER PROFILE CARD (ALWAYS PINNED TO SIDEBAR BOTTOM) */}
      <div className="flex-none pt-3 space-y-3 border-t border-emerald-100">
        
        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold bg-[#f8fafc] text-[#006c49] hover:bg-white border border-emerald-200/80 shadow-sm transition-all"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#006c49]" />
              <span>{currentLang}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#065f46]" />
          </button>

          {langOpen && (
            <div className="absolute bottom-12 left-0 w-full bg-white rounded-2xl shadow-xl border border-[#006c49]/20 py-2 z-50 animate-in fade-in">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setCurrentLang(lang);
                    setLangOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-[#dcfce7] hover:text-[#006c49] transition-colors ${
                    currentLang === lang ? 'text-[#006c49] bg-[#dcfce7]' : 'text-[#065f46]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile Card */}
        {!isLoggedIn ? (
          <button
            onClick={() => {
              onOpenAuth();
              if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
            }}
            className="w-full py-3 rounded-2xl bg-[#006c49] text-white text-xs font-bold shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Login / Register</span>
          </button>
        ) : (
          <div className="p-3 rounded-2xl bg-white/90 border border-[#006c49]/20 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar || "/assets/agri_expert_portrait.jpg"}
                alt="Farmer Avatar"
                className="w-9 h-9 rounded-full object-cover border-2 border-[#006c49]"
              />
              <div className="max-w-[100px] truncate">
                <p className="font-bold text-xs text-[#006c49] truncate">{user?.name || 'Farmer Singh'}</p>
                <p className="text-[9px] font-bold text-[#0284c7] uppercase">Premium Plan</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setActiveTab('settings');
                  if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
                }}
                className="p-1.5 rounded-xl hover:bg-[#dcfce7] text-[#006c49]"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  onLogout();
                  if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
                }}
                className="p-1.5 rounded-xl hover:bg-red-50 text-red-600"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );

  return (
    <>
      {/* FIXED 100VH DESKTOP SIDEBAR - DOES NOT SCROLL DOWN WITH SITE CONTENT */}
      <aside className="hidden lg:flex w-64 xl:w-72 flex-none h-screen sticky top-0 z-40 p-4 flex-col justify-between bg-white border-r border-emerald-100/80 shadow-sm overflow-hidden">
        {sidebarContent}
      </aside>

      {/* MOBILE SLIDE-OVER DRAWER OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop Blur Overlay */}
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
          />

          {/* Drawer Container */}
          <div className="relative w-80 max-w-[85vw] bg-white h-full p-4 shadow-2xl z-10 flex flex-col overflow-hidden animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
