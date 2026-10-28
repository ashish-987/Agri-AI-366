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
  X,
  FlaskConical
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isLoggedIn, user, onOpenAuth, onLogout, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  const navItems = [
    { id: 'home', label: 'Home', icon: Sprout },
    { id: 'ai', label: 'AI Assistant', icon: Bot, isPulse: true },
    { id: 'disease', label: 'Disease Detection', icon: ScanLine },
    { id: 'farm', label: 'Farm Management', icon: Layers },
    { id: 'soil', label: 'Soil Health', icon: FlaskConical },
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

          {/* Close button for Mobile Menu Drawer */}
          {setIsMobileMenuOpen && (
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* MIDDLE SCROLLABLE NAVIGATION LIST */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 space-y-1 pr-1 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all relative group cursor-pointer ${
                isActive
                  ? 'bg-[#006c49] text-white shadow-md shadow-emerald-900/10'
                  : 'text-[#00422b] hover:bg-emerald-50/80 hover:text-[#006c49]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 flex-none ${isActive ? 'text-white' : 'text-[#006c49] group-hover:scale-110 transition-transform'}`} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.isPulse && !isActive && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}

              {item.badge && (
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white text-[#006c49]' : 'bg-emerald-100 text-[#006c49]'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* BOTTOM FIXED FOOTER: PROFILE / SETTINGS & LANGUAGE */}
      <div className="flex-none pt-3 border-t border-emerald-100/60 space-y-3">
        
        {/* LANGUAGE SELECTOR */}
        <div className="relative">
          <button 
            onClick={() => setLangOpen(!langOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#006c49]" />
              <span className="truncate">{currentLang}</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
          </button>

          {langOpen && (
            <div className="absolute bottom-full left-0 mb-1 w-full bg-white rounded-2xl border border-slate-200 shadow-xl py-1 z-50 animate-in fade-in">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setCurrentLang(l);
                    setLangOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-[#006c49] transition-colors"
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PROFILE / LOGOUT / SETTINGS */}
        {isLoggedIn ? (
          <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-100/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#006c49] text-white flex items-center justify-center font-bold text-xs shadow-sm flex-none">
                  {user?.full_name ? user.full_name[0].toUpperCase() : 'F'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black text-[#002117] truncate">{user?.full_name || 'Farmer'}</p>
                  <p className="text-[10px] text-slate-500 font-semibold truncate">{user?.district || user?.role || 'Farmer'}</p>
                </div>
              </div>

              <button 
                onClick={() => setActiveTab('settings')}
                className={`p-1.5 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-[#006c49] text-white' : 'text-slate-500 hover:bg-emerald-100 hover:text-[#006c49]'}`}
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onLogout}
              className="w-full py-2 rounded-xl bg-white border border-emerald-200 text-xs font-extrabold text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full py-3 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold hover:bg-[#046a38] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer uppercase tracking-wider"
          >
            <LogIn className="w-4 h-4" />
            <span>Farmer Sign In</span>
          </button>
        )}

      </div>

    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR (FIXED ON LEFT) */}
      <aside className="hidden lg:block fixed top-0 left-0 w-64 bg-white border-r border-emerald-100 p-4 h-screen z-30 shadow-sm">
        {sidebarContent}
      </aside>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex">
          <div className="w-72 bg-white h-full p-4 shadow-2xl flex flex-col justify-between animate-in slide-in-from-left">
            {sidebarContent}
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}
    </>
  );
}
