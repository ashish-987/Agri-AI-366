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
  AlertCircle
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {

  const {
    user,
    profile,
    updateProfile
  } = useAuth();

  const [activeTab, setActiveTab] =
    useState('profile');

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      phone: '',
      state: '',
      district: '',
      village: ''
    });

  const [loading, setLoading] =
    useState(false);

  const [savedSuccess, setSavedSuccess] =
    useState(false);

  const [error, setError] =
    useState('');

  /*
   * Load actual Supabase profile.
   */
  useEffect(() => {

    if (!profile) return;

    setFormData({
      name: profile.full_name || '',
      email: profile.email || user?.email || '',
      phone: profile.phone || '',
      state: profile.state || '',
      district: profile.district || '',
      village: profile.village || ''
    });

  }, [profile, user]);

  const handleChange = (field, value) => {

    setFormData((previous) => ({
      ...previous,
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

      setTimeout(() => {
        setSavedSuccess(false);
      }, 4000);

    } catch (err) {

      console.error(err);

      setError(
        err?.message ||
          'Unable to update your profile.'
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-2 w-full px-4 sm:px-6 animate-in fade-in">

      {/* HEADER */}
      <div className="rounded-3xl p-8 bg-white border border-emerald-100 shadow-sm space-y-2">

        <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">
          Account & Farm Settings
        </h1>

        <p className="text-xs sm:text-sm text-[#3c4a42] font-medium leading-relaxed">
          Manage your real AgriAI farmer profile.
        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* NAVIGATION */}
        <div className="lg:col-span-4 rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-2">

          {[
            {
              id: 'profile',
              label: 'Profile Management',
              icon: User
            },
            {
              id: 'notifications',
              label: 'Weather & Mandi Alerts',
              icon: Bell
            },
            {
              id: 'connectivity',
              label: 'Farm Connectivity',
              icon: Wifi
            },
            {
              id: 'security',
              label: 'Security',
              icon: Shield
            },
            {
              id: 'billing',
              label: 'Subscription',
              icon: CreditCard
            }
          ].map((item) => {

            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setActiveTab(item.id)
                }
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-extrabold transition-all ${
                  activeTab === item.id
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

        {/* PROFILE */}
        <div className="lg:col-span-8 rounded-3xl p-8 bg-white border border-emerald-100 shadow-sm space-y-6">

          <div className="flex items-center gap-2 border-b border-emerald-100 pb-4">

            <User className="w-5 h-5 text-[#006c49]" />

            <h2 className="font-display font-black text-2xl text-[#002117]">
              Profile Management
            </h2>

          </div>

          {activeTab !== 'profile' ? (

            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">

              <p className="text-sm font-bold text-[#006c49]">
                {activeTab === 'notifications' &&
                  'Notification preferences will be connected in the notifications phase.'}

                {activeTab === 'connectivity' &&
                  'Hardware-free farm connectivity will be added later. AgriAI 366 does not require IoT hardware.'}

                {activeTab === 'security' &&
                  'Supabase Authentication securely manages your account.'}

                {activeTab === 'billing' &&
                  'Subscription functionality will be added later.'}
              </p>

            </div>

          ) : (

            <form
              onSubmit={handleSave}
              className="space-y-6"
            >

              {/* USER */}
              <div className="flex items-center gap-5">

                <img
                  src="/assets/agri_expert_portrait.jpg"
                  alt="Farmer profile"
                  className="w-20 h-20 rounded-3xl object-cover border-4 border-[#006c49]"
                />

                <div>

                  <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-[#006c49] px-3 py-1 rounded-full border border-emerald-200">
                    FARMER ACCOUNT
                  </span>

                  <h3 className="font-display font-black text-xl text-[#002117] mt-2">
                    {formData.name || 'Farmer'}
                  </h3>

                  <p className="text-xs text-[#6c7a71] font-semibold">
                    {formData.email}
                  </p>

                </div>

              </div>

              {/* ERROR */}
              {error && (
                <div className="flex items-start gap-2 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">

                  <AlertCircle className="w-4 h-4 flex-none" />

                  <span>{error}</span>

                </div>
              )}

              {/* SUCCESS */}
              {savedSuccess && (
                <div className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3.5 py-2 rounded-full border border-emerald-200 flex items-center gap-1.5 w-fit">

                  <CheckCircle2 className="w-4 h-4" />

                  Profile updated successfully.

                </div>
              )}

              {/* FORM */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">

                <div>

                  <label className="block mb-1.5 text-[#6c7a71]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      handleChange(
                        'name',
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                  />

                </div>

                <div>

                  <label className="block mb-1.5 text-[#6c7a71]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 cursor-not-allowed"
                  />

                </div>

                <div>

                  <label className="block mb-1.5 text-[#6c7a71]">
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      handleChange(
                        'phone',
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                  />

                </div>

                <div>

                  <label className="block mb-1.5 text-[#6c7a71]">
                    State
                  </label>

                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) =>
                      handleChange(
                        'state',
                        e.target.value
                      )
                    }
                    placeholder="Uttar Pradesh"
                    className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                  />

                </div>

                <div>

                  <label className="block mb-1.5 text-[#6c7a71]">
                    District
                  </label>

                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) =>
                      handleChange(
                        'district',
                        e.target.value
                      )
                    }
                    placeholder="Lucknow"
                    className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                  />

                </div>

                <div>

                  <label className="block mb-1.5 text-[#6c7a71]">
                    Village
                  </label>

                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) =>
                      handleChange(
                        'village',
                        e.target.value
                      )
                    }
                    placeholder="Village name"
                    className="w-full px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                  />

                </div>

              </div>

              {/* SAVE */}
              <div className="flex justify-end pt-4 border-t border-emerald-100">

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold shadow-md hover:bg-[#046a38] transition-all uppercase tracking-wider flex items-center gap-2 disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}

                </button>

              </div>

            </form>

          )}

        </div>

      </div>

    </div>
  );
}
