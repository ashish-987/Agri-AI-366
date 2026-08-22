import React, { useState } from 'react';
import { Sprout, X, ShieldCheck, ArrowRight, CheckCircle2, Lock, Mail, User, Phone } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      name: name || (authMode === 'login' ? 'Kisan Farmer' : 'Lakhwinder Singh'),
      email: email || 'farmer@agriai366.in',
      phone: phone || '+91 98765 43210'
    });
    onClose();
  };

  const handleGoogleLogin = () => {
    onLoginSuccess({
      name: 'Gurpreet Singh (Google)',
      email: 'gurpreet.singh@gmail.com',
      phone: '+91 98123 45678',
      avatar: 'https://lh3.googleusercontent.com/a/default-user'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="rounded-3xl p-6 sm:p-8 max-w-md w-full border border-emerald-200 shadow-2xl space-y-6 bg-white relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#6c7a71] hover:text-[#002117] hover:bg-emerald-50 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#006c49] text-white flex items-center justify-center mx-auto shadow-md">
            <Sprout className="w-7 h-7" />
          </div>
          <h2 className="font-display font-black text-2xl text-[#002117]">
            {authMode === 'login' ? 'Welcome to AgriAI 366' : 'Create Free Farmer Account'}
          </h2>
          <p className="text-xs text-[#3c4a42] font-semibold">
            {authMode === 'login'
              ? 'Sign in to access 366 district Mandi prices & AI features.'
              : 'Join 1.2M+ Indian farmers using AI for higher yields.'}
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex rounded-2xl p-1 bg-emerald-50 border border-emerald-200 text-xs font-extrabold">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              authMode === 'login' ? 'bg-[#006c49] text-white shadow-md' : 'text-[#006c49]'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              authMode === 'register' ? 'bg-[#006c49] text-white shadow-md' : 'text-[#006c49]'
            }`}
          >
            Register
          </button>
        </div>

        {/* Google One-Click Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-2xl bg-white border border-emerald-200 hover:border-[#006c49] text-[#002117] text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 group"
        >
          {/* Official Google G Logo */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-emerald-100 w-full" />
          <span className="bg-white px-3 text-[10px] text-[#6c7a71] uppercase font-extrabold absolute">
            or email sign in
          </span>
        </div>

        {/* Email/Phone Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {authMode === 'register' && (
            <div>
              <label className="font-extrabold text-[#00422b] block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#6c7a71] absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Lakhwinder Singh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006c49] font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-extrabold text-[#00422b] block mb-1">Email Address / Mobile</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#6c7a71] absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="farmer@agriai366.in or 9876543210"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006c49] font-medium"
              />
            </div>
          </div>

          <div>
            <label className="font-extrabold text-[#00422b] block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#6c7a71] absolute left-3.5 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006c49] font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{authMode === 'login' ? 'Sign In to AgriAI 366' : 'Register Free Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login Trigger */}
        <div className="pt-2 text-center border-t border-emerald-100">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="text-xs font-bold text-[#006c49] hover:underline inline-flex items-center gap-1"
          >
            <span>⚡ Instant Demo One-Click Sign In</span>
          </button>
        </div>

      </div>
    </div>
  );
}
