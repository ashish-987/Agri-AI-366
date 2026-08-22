import React, { useState } from 'react';
import { User, Bell, Wifi, Shield, CreditCard, Edit2, CheckCircle2, Save } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'Gurpreet Singh',
    email: 'gurpreet.singh@agriai366.com',
    phone: '+91 98765 43210',
    location: 'Ludhiana, Punjab',
    area: '15.5'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-8 py-2 w-full px-4 sm:px-6 animate-in fade-in">
      
      {/* HEADER */}
      <div className="rounded-3xl p-8 bg-white border border-emerald-100 shadow-sm space-y-2">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">Account &amp; Farm Settings</h1>
        <p className="text-xs sm:text-sm text-[#3c4a42] font-medium leading-relaxed">
          Manage your personal profile, notification preferences, IoT sensors, and premium subscription.
        </p>
      </div>

      {/* 2-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: SUB-NAVIGATION CARD */}
        <div className="lg:col-span-4 rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-2">
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-extrabold transition-all ${
              activeTab === 'profile' ? 'bg-[#006c49] text-white shadow-md' : 'text-[#3c4a42] hover:bg-emerald-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Management</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-extrabold transition-all ${
              activeTab === 'notifications' ? 'bg-[#006c49] text-white shadow-md' : 'text-[#3c4a42] hover:bg-emerald-50'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Weather &amp; Mandi Alerts</span>
          </button>

          <button
            onClick={() => setActiveTab('connectivity')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-extrabold transition-all ${
              activeTab === 'connectivity' ? 'bg-[#006c49] text-white shadow-md' : 'text-[#3c4a42] hover:bg-emerald-50'
            }`}
          >
            <Wifi className="w-4 h-4" />
            <span>IoT Farm Connectivity</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-extrabold transition-all ${
              activeTab === 'security' ? 'bg-[#006c49] text-white shadow-md' : 'text-[#3c4a42] hover:bg-emerald-50'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Security &amp; PIN</span>
          </button>

          <button
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-extrabold transition-all ${
              activeTab === 'billing' ? 'bg-[#006c49] text-white shadow-md' : 'text-[#3c4a42] hover:bg-emerald-50'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Subscription &amp; Billing</span>
          </button>

        </div>

        {/* RIGHT COLUMN: SETTINGS FORM CARD */}
        <div className="lg:col-span-8 rounded-3xl p-8 bg-white border border-emerald-100 shadow-sm space-y-6">
          
          <div className="flex items-center gap-2 border-b border-emerald-100 pb-4">
            <User className="w-5 h-5 text-[#006c49]" />
            <h2 className="font-display font-black text-2xl text-[#002117]">Profile Management</h2>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Avatar & Plan Badge */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src="/assets/agri_expert_portrait.jpg"
                  alt="Profile Avatar"
                  className="w-24 h-24 rounded-3xl object-cover border-4 border-[#006c49] shadow-md"
                />
                <button type="button" className="absolute bottom-0 right-0 p-2 rounded-2xl bg-[#006c49] text-white shadow-md hover:bg-[#046a38] transition-all">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-[#006c49] px-3 py-1 rounded-full border border-emerald-200">
                  PREMIUM FARMER PLAN
                </span>
                <h3 className="font-display font-black text-xl text-[#002117] mt-1.5">{formData.name}</h3>
                <p className="text-xs text-[#6c7a71] font-semibold">Verified District 366 Farmer • Punjab</p>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-[#00422b]">
              <div>
                <label className="block mb-1.5 text-[#6c7a71]">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-[#6c7a71]">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-[#6c7a71]">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-[#6c7a71]">Farm Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-1.5 text-[#6c7a71]">Total Farm Area (Acres)</label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c49]"
                />
              </div>
            </div>

            {/* Action Row */}
            <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
              {savedSuccess ? (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006c49]" />
                  <span>Farm profile updated successfully!</span>
                </span>
              ) : <div />}

              <button
                type="submit"
                className="px-8 py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold shadow-md hover:bg-[#046a38] transition-all uppercase tracking-wider flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
}
