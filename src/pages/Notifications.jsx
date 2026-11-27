import React, { useState } from 'react';
import { 
  Bell, 
  CloudRain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Trash2, 
  CheckCheck, 
  Filter,
  ArrowRight,
  ExternalLink,
  Sparkles,
  ShieldAlert,
  Sprout
} from 'lucide-react';

export default function Notifications({ setActiveTab }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Heavy Rainfall Warning',
      category: 'weather',
      categoryLabel: 'Weather & Climate',
      message: 'IMD predicts 45mm rainfall in your district over the next 36 hours. Postpone chemical spraying and prepare field drainage.',
      time: '12 minutes ago',
      timestamp: 'Today, 11:45 AM',
      read: false,
      priority: 'high',
      actionText: 'View Weather Forecast',
      actionTab: 'weather',
      icon: CloudRain,
      color: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    {
      id: 2,
      title: 'Wheat Mandi Price Surge (+8.5%)',
      category: 'mandi',
      categoryLabel: 'Mandi Intelligence',
      message: 'Sharbati Wheat prices in regional mandis increased to ₹2,450/quintal due to elevated miller demand. Favorable selling window.',
      time: '1 hour ago',
      timestamp: 'Today, 10:30 AM',
      read: false,
      priority: 'medium',
      actionText: 'Go to Mandi Marketplace',
      actionTab: 'marketplace',
      icon: TrendingUp,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      id: 3,
      title: 'Pest Outbreak Alert: Yellow Rust',
      category: 'pest',
      categoryLabel: 'Crop Pathology',
      message: 'Yellow Rust spore activity detected within 25 km of your registered sector. Inspect underside of wheat leaves for linear pustules.',
      time: '3 hours ago',
      timestamp: 'Today, 08:15 AM',
      read: false,
      priority: 'urgent',
      actionText: 'Launch AI Disease Scanner',
      actionTab: 'disease',
      icon: ShieldAlert,
      color: 'text-rose-600 bg-rose-50 border-rose-200'
    },
    {
      id: 4,
      title: 'Second Urea Top-Dressing Reminder',
      category: 'tasks',
      categoryLabel: 'Agronomic Schedule',
      message: 'Your Wheat crop in North Field has reached Day 42 (Crown Root Stage). Recommended dosage: 30kg/acre Urea followed by light irrigation.',
      time: 'Yesterday',
      timestamp: 'Oct 29, 04:30 PM',
      read: true,
      priority: 'medium',
      actionText: 'View Fertilizer Plan',
      actionTab: 'soil',
      icon: Sprout,
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      id: 5,
      title: 'Farm Profile Synchronized',
      category: 'system',
      categoryLabel: 'System Notice',
      message: 'Your field boundaries and soil profile have been successfully backed up to your Supabase cloud storage account.',
      time: '2 days ago',
      timestamp: 'Oct 28, 02:10 PM',
      read: true,
      priority: 'low',
      actionText: 'Manage Farm Plots',
      actionTab: 'farm',
      icon: CheckCircle2,
      color: 'text-slate-600 bg-slate-50 border-slate-200'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !n.read;
    return n.category === activeFilter;
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#006c49] flex items-center justify-center border border-emerald-100 flex-none relative">
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="w-3.5 h-3.5 rounded-full bg-[#0284c7] border-2 border-white absolute -top-1 -right-1" />
            )}
          </div>
          <div>
            <h1 className="font-display font-extrabold text-2xl text-[#002117]">
              Alerts & Farm Notifications
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Real-time meteorological warnings, mandi rate shifts, and agronomic reminders
            </p>
          </div>
        </div>

        {/* TOP CONTROLS */}
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-[#006c49] text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer border border-emerald-200/60"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark all read</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer border border-slate-200"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear list</span>
            </button>
          )}
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Alerts', count: notifications.length },
          { id: 'unread', label: 'Unread', count: unreadCount },
          { id: 'weather', label: 'Weather Warnings' },
          { id: 'mandi', label: 'Mandi Trends' },
          { id: 'pest', label: 'Pest & Pathology' },
          { id: 'tasks', label: 'Field Tasks' }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === filter.id
                ? 'bg-[#006c49] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-[#006c49] border border-slate-200'
            }`}
          >
            <span>{filter.label}</span>
            {filter.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeFilter === filter.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* NOTIFICATIONS LIST */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#006c49] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-base text-slate-800">No Notifications in this Category</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              You are completely caught up! New weather alerts, crop disease advisories, and price trends will appear here automatically.
            </p>
          </div>
        ) : (
          filteredNotifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl bg-white border transition-all hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  !item.read
                    ? 'border-emerald-300 ring-1 ring-emerald-300/40 bg-emerald-50/20'
                    : 'border-slate-200/80 opacity-90'
                }`}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-none border ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-sm text-[#002117]">
                        {item.title}
                      </h3>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-[#0284c7] inline-block" />
                      )}
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {item.categoryLabel}
                      </span>
                      {item.priority === 'urgent' && (
                        <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                          CRITICAL ALERT
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {item.message}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-semibold pt-1">
                      <span>{item.timestamp}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {item.actionText && (
                    <button
                      onClick={() => {
                        markAsRead(item.id);
                        if (setActiveTab && item.actionTab) {
                          setActiveTab(item.actionTab);
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-[#006c49] text-white text-xs font-bold hover:bg-[#046a38] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm flex-none"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => deleteNotification(item.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Dismiss alert"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

