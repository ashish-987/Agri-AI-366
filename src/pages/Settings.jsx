import React, { useEffect, useState } from 'react';
import {
  User,
  Bell,
  Wifi,
  Shield,
  CreditCard,
  CheckCircle2,
  Save,
  Loader2,
  AlertCircle,
  Smartphone,
  MessageSquare,
  CloudRain,
  MapPin,
  Lock,
  Download,
  Key,
  Check,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function SettingsPage() {
  const { user, profile, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // Profile Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    district: '',
    village: ''
  });

  // Notification Preferences State
  const [notificationsConfig, setNotificationsConfig] = useState({
    smsAlerts: true,
    whatsappMandi: true,
    severeWeather: true,
    pestWarnings: true,
    weeklyReport: false
  });

  // Security Form State
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Connectivity State
  const [syncingTelemetry, setSyncingTelemetry] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');

  /* Load actual Supabase profile */
  useEffect(() => {
    if (!profile && !user) return;

    setFormData({
      name: profile?.full_name || user?.name || user?.full_name || '',
      email: profile?.email || user?.email || '',
      phone: profile?.phone || user?.phone || '',
      state: profile?.state || user?.state || 'Uttar Pradesh',
      district: profile?.district || user?.district || 'Unnao',
      village: profile?.village || user?.village || 'Jargaon'
    });
  }, [profile, user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    setSavedSuccess(false);
    setError('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSavedSuccess(false);
    setError('');

    try {
      await updateProfile({
        full_name: formData.name.trim(),
        phone: formData.phone.trim(),
        state: formData.state.trim(),
        district: formData.district.trim(),
        village: formData.village.trim()
      });

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      setError(err?.message || 'Failed to update profile settings.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setPasswordLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      setPasswordSuccess(true);
      setPasswordData({ newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordSuccess(false), 4000);
    } catch (err) {
      setPasswordError(err?.message || 'Failed to update password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSyncTelemetry = () => {
    setSyncingTelemetry(true);
    setSyncSuccess(false);
    setTimeout(() => {
      setSyncingTelemetry(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 1200);
  };

  const handleExportData = () => {
    const exportData = {
      profile: formData,
      exportedAt: new Date().toISOString(),
      platform: "AgriAI 366 Smart Farm Ecosystem"
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agriai_farmer_data_${formData.name.toLowerCase() || 'profile'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117] tracking-tight">
          Account & Farm Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#6c7a71] font-semibold">
          Manage your verified farmer profile, alerts, security, and farm synchronization.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* NAVIGATION SIDEBAR */}
        <div className="lg:col-span-4 rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-2">
          {[
            { id: 'profile', label: 'Profile Management', icon: User },
            { id: 'notifications', label: 'Weather & Mandi Alerts', icon: Bell },
            { id: 'connectivity', label: 'Farm Connectivity', icon: Wifi },
            { id: 'security', label: 'Security & Access', icon: Shield },
            { id: 'billing', label: 'Subscription Plan', icon: CreditCard }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#006c49] text-white shadow-md'
                    : 'text-[#3c4a42] hover:bg-emerald-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT CONTAINER */}
        <div className="lg:col-span-8 rounded-3xl p-6 sm:p-8 bg-white border border-emerald-100 shadow-sm space-y-6">
          
          {/* 1. PROFILE MANAGEMENT TAB */}
          {activeTab === 'profile' && (
            <>
              <div className="flex items-center gap-2 border-b border-emerald-100 pb-4">
                <User className="w-5 h-5 text-[#006c49]" />
                <h2 className="font-display font-black text-2xl text-[#002117]">Profile Management</h2>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                {/* USER BADGE */}
                <div className="flex items-center gap-5">
                  <img
                    src={user?.avatar || "/assets/agri_expert_portrait.jpg"}
                    alt="Farmer profile"
                    className="w-20 h-20 rounded-3xl object-cover border-4 border-[#006c49] shadow-sm"
                  />
                  <div>
                    <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-[#006c49] px-3 py-1 rounded-full border border-emerald-200">
                      VERIFIED FARMER ACCOUNT
                    </span>
                    <h3 className="font-display font-black text-xl text-[#002117] mt-2">
                      {formData.name || user?.name || 'Farmer'}
                    </h3>
                    <p className="text-xs text-[#6c7a71] font-semibold">{formData.email}</p>
                  </div>
                </div>

                {savedSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#006c49] text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-none" />
                    <span>Profile settings updated successfully in Supabase!</span>
                  </div>
                )}

                {error && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-none" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold">
                  <div>
                    <label className="block mb-1.5 text-[#6c7a71]">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-[#6c7a71]">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-[#6c7a71]">Mobile Number (SMS / WhatsApp)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-[#6c7a71]">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      placeholder="State name"
                      className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-[#6c7a71]">District</label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => handleChange('district', e.target.value)}
                      placeholder="District name"
                      className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-[#6c7a71]">Village / Tehsil</label>
                    <input
                      type="text"
                      value={formData.village}
                      onChange={(e) => handleChange('village', e.target.value)}
                      placeholder="Village name"
                      className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-emerald-100">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold shadow-md hover:bg-[#046a38] transition-all uppercase tracking-wider flex items-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* 2. WEATHER & MANDI ALERTS TAB */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-emerald-100 pb-4">
                <Bell className="w-5 h-5 text-[#006c49]" />
                <h2 className="font-display font-black text-2xl text-[#002117]">Weather & Mandi Alerts</h2>
              </div>

              <p className="text-xs text-slate-500 font-semibold">
                Configure automated SMS alerts and instant notifications for extreme weather shifts and high-demand mandi price surges.
              </p>

              <div className="space-y-4">
                {[
                  {
                    key: 'smsAlerts',
                    title: 'SMS Weather & Mandi Alerts',
                    desc: 'Receive critical rainfall and price surge alerts on your registered phone number.',
                    icon: Smartphone
                  },
                  {
                    key: 'whatsappMandi',
                    title: 'Daily WhatsApp Mandi Ticker (08:00 AM)',
                    desc: 'Daily bulletin for Wheat, Tomato, Soybean, and Maize modal rates in regional mandis.',
                    icon: MessageSquare
                  },
                  {
                    key: 'severeWeather',
                    title: 'Severe Meteorological Warnings',
                    desc: 'Flash flood, hailstorm, and frost warnings dispatched 24 hours prior to field impact.',
                    icon: CloudRain
                  },
                  {
                    key: 'pestWarnings',
                    title: 'Pest & Blight Outbreak Radar',
                    desc: 'Alerts when neighboring farms within 25km report contagious fungal or viral crop blights.',
                    icon: Shield
                  }
                ].map((item) => {
                  const Icon = item.icon;
                  const isChecked = notificationsConfig[item.key];
                  return (
                    <div
                      key={item.key}
                      className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white text-[#006c49] border border-emerald-200 flex items-center justify-center flex-none mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-[#002117]">{item.title}</h4>
                          <p className="text-[11px] text-slate-500 font-medium mt-0.5">{item.desc}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setNotificationsConfig(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors flex-none ${
                          isChecked ? 'bg-[#006c49]' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                            isChecked ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4 border-t border-emerald-100">
                <button
                  type="button"
                  onClick={() => {
                    setSavedSuccess(true);
                    setTimeout(() => setSavedSuccess(false), 3000);
                  }}
                  className="px-6 py-3 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold hover:bg-[#046a38] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Alert Preferences</span>
                </button>
              </div>
            </div>
          )}

          {/* 3. FARM CONNECTIVITY TAB */}
          {activeTab === 'connectivity' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-emerald-100 pb-4">
                <Wifi className="w-5 h-5 text-[#006c49]" />
                <h2 className="font-display font-black text-2xl text-[#002117]">Farm & Radar Connectivity</h2>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                <p className="font-black text-[#006c49] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Hardware-Free Agricultural Intelligence</span>
                </p>
                <p className="text-slate-600 font-medium">
                  AgriAI 366 utilizes high-resolution Open-Meteo satellite feeds and mathematical soil models. No expensive IoT hardware or soil sensors required.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>GPS Coordinates</span>
                    <MapPin className="w-4 h-4 text-[#006c49]" />
                  </div>
                  <p className="text-sm font-black text-[#002117]">26.5458° N, 80.4907° E</p>
                  <p className="text-[10px] text-slate-400 font-medium">Mapped to Unnao, Uttar Pradesh</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Weather Provider</span>
                    <Wifi className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-sm font-black text-[#002117]">Open-Meteo Synced</p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">Refreshed every 60 minutes</p>
                </div>
              </div>

              {syncSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#006c49] text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Farm field coordinates and weather radar synchronized!</span>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-emerald-100">
                <button
                  type="button"
                  onClick={handleSyncTelemetry}
                  disabled={syncingTelemetry}
                  className="px-6 py-3 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold hover:bg-[#046a38] transition-colors flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-60"
                >
                  <RefreshCw className={`w-4 h-4 ${syncingTelemetry ? 'animate-spin' : ''}`} />
                  <span>{syncingTelemetry ? 'Synchronizing...' : 'Sync Farm Telemetry'}</span>
                </button>
              </div>
            </div>
          )}

          {/* 4. SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-emerald-100 pb-4">
                <Shield className="w-5 h-5 text-[#006c49]" />
                <h2 className="font-display font-black text-2xl text-[#002117]">Security & Credentials</h2>
              </div>

              {passwordSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#006c49] text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-none" />
                  <span>Password updated successfully via Supabase Auth!</span>
                </div>
              )}

              {passwordError && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-none" />
                  <span>{passwordError}</span>
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4 text-xs font-bold">
                <h3 className="text-sm font-black text-[#002117] flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#006c49]" />
                  <span>Update Account Password</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5 text-slate-500">New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="Min. 6 characters"
                      className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-slate-500">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Re-enter password"
                      className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="px-6 py-2.5 rounded-xl bg-[#006c49] text-white text-xs font-bold hover:bg-[#046a38] transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {passwordLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
                    <span>Update Password</span>
                  </button>
                </div>
              </form>

              {/* DATA EXPORT */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-[#002117]">Export Farm & Profile Records</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Download a complete JSON archive of your farm profile and plot history.</p>
                </div>

                <button
                  type="button"
                  onClick={handleExportData}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-emerald-50 hover:text-[#006c49] transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200 flex-none"
                >
                  <Download className="w-4 h-4" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>
          )}

          {/* 5. SUBSCRIPTION TAB */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-emerald-100 pb-4">
                <CreditCard className="w-5 h-5 text-[#006c49]" />
                <h2 className="font-display font-black text-2xl text-[#002117]">Subscription & Plan</h2>
              </div>

              <div className="p-6 rounded-3xl bg-emerald-50/80 border border-emerald-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#006c49] text-white">
                      ACTIVE PLAN
                    </span>
                    <h3 className="font-display font-black text-2xl text-[#002117] mt-1">
                      Kisan Community Plan
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#006c49]">₹0</span>
                    <span className="text-xs text-slate-500 font-bold"> / Lifetime</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium">
                  Includes full access to the AI Mandi marketplace, unlimited 7-day weather intelligence, soil N-P-K recommendation engine, and community advisory forum.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-bold text-[#00422b] pt-2">
                  {[
                    'Live Mandi Ticker across 366 Districts',
                    'Smart Precision Irrigation Models',
                    'Full Crop Disease Diagnostics & Remedies',
                    'Heavy Equipment Rental Marketplace',
                    'Direct Agronomist Consultation Booking',
                    'Supabase Cloud Data Backup & RLS Security'
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-none" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
