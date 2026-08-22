import React, { useState } from 'react';
import { User, Bell, Wifi, Shield, CreditCard, Edit2, CheckCircle2 } from 'lucide-react';

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
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 py-2 w-full">
      
      {/* HEADER (EXACT MATCH TO SCREENSHOT 2) */}
      <div className="space-y-2">
        <h1 className="font-display font-black text-4xl text-[#002117]">Settings</h1>
        <p className="text-xs sm:text-sm text-[#3c4a42] font-medium leading-relaxed">
          Manage your profile, preferences, and connected farm devices.
        </p>
      </div>

      {/* 2-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: SUB-NAVIGATION CARD */}
        <div className="lg:col-span-4 rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-2">
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'profile' ? 'bg-[#dcfce7] text-[#006c49]' : 'text-[#3c4a42] hover:bg-[#dcfce7]/50'
            }`}
          >
            <User className="w-4 h-4 text-[#006c49]" />
            <span>Profile Management</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'notifications' ? 'bg-[#dcfce7] text-[#006c49]' : 'text-[#3c4a42] hover:bg-[#dcfce7]/50'
            }`}
          >
            <Bell className="w-4 h-4 text-[#006c49]" />
            <span>Notifications</span>
          </button>

          <button
            onClick={() => setActiveTab('connectivity')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'connectivity' ? 'bg-[#dcfce7] text-[#006c49]' : 'text-[#3c4a42] hover:bg-[#dcfce7]/50'
            }`}
          >
            <Wifi className="w-4 h-4 text-[#006c49]" />
            <span>Farm Connectivity</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'security' ? 'bg-[#dcfce7] text-[#006c49]' : 'text-[#3c4a42] hover:bg-[#dcfce7]/50'
            }`}
          >
            <Shield className="w-4 h-4 text-[#006c49]" />
            <span>Security</span>
          </button>

          <button
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'billing' ? 'bg-[#dcfce7] text-[#006c49]' : 'text-[#3c4a42] hover:bg-[#dcfce7]/50'
            }`}
          >
            <CreditCard className="w-4 h-4 text-[#006c49]" />
            <span>Subscription & Billing</span>
          </button>

        </div>

        {/* RIGHT COLUMN: SETTINGS FORM CARD (EXACT MATCH TO SCREENSHOT 2) */}
        <div className="lg:col-span-8 rounded-3xl p-8 bg-white border border-[#006c49]/15 shadow-sm space-y-6">
          
          <div className="flex items-center gap-2 border-b border-[#006c49]/15 pb-4">
            <User className="w-5 h-5 text-[#006c49]" />
            <h2 className="font-display font-extrabold text-2xl text-[#002117]">Profile Management</h2>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Avatar & Plan Badge */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src="/assets/agri_expert_portrait.jpg"
                  alt="Profile Avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#006c49]"
                />
                <button type="button" className="absolute bottom-0 right-0 p-2 rounded-full bg-[#006c49] text-white shadow-md">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase bg-[#dcfce7] text-[#006c49] px-3 py-1 rounded-full">
                  PREMIUM MEMBER
                </span>
                <h3 className="font-display font-bold text-lg text-[#002117] mt-1">{formData.name}</h3>
                <p className="text-xs text-[#6c7a71]">Verified District 366 Farmer</p>
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
                  className="w-full px-4 py-3 rounded-2xl bg-[#dcfce7] border border-[#006c49]/20 text-[#002117] font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-[#6c7a71]">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#dcfce7] border border-[#006c49]/20 text-[#002117] font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-[#6c7a71]">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#dcfce7] border border-[#006c49]/20 text-[#002117] font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-[#6c7a71]">Farm Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#dcfce7] border border-[#006c49]/20 text-[#002117] font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-1.5 text-[#6c7a71]">Total Farm Area (Acres)</label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#dcfce7] border border-[#006c49]/20 text-[#002117] font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c49]"
                />
              </div>
            </div>

            {/* Action Row */}
            <div className="flex items-center justify-between pt-4 border-t border-[#006c49]/15">
              {savedSuccess ? (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006c49]" />
                  <span>Profile updated successfully!</span>
                </span>
              ) : <div />}

              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-[#006c49] text-white text-xs font-extrabold shadow-md hover:bg-[#046a38] transition-all uppercase tracking-wider"
              >
                Save Changes
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
}
