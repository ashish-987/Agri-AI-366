import React, { useState } from 'react';

import {
  Sprout,
  X,
  ArrowRight,
  Lock,
  Mail,
  User,
  Phone,
  Loader2,
  AlertCircle,
  CheckCircle2,
  KeyRound
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export default function AuthModal({
  isOpen,
  onClose
}) {
  const {
    login,
    signup,
    loginWithGoogle,
    sendPhoneOTP,
    verifyPhoneOTP
  } = useAuth();

  const [authMethod, setAuthMethod] = useState('email'); // 'email' | 'phone'
  const [authMode, setAuthMode] = useState('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) {
    return null;
  }

  const resetMessages = () => {
    setError('');
    setSuccess('');
  };

  const switchMode = (mode) => {
    resetMessages();
    setAuthMode(mode);
  };

  const switchMethod = (method) => {
    resetMessages();
    setAuthMethod(method);
    setOtpSent(false);
    setOtp('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    resetMessages();
    setLoading(true);

    try {
      if (!email.trim()) {
        throw new Error('Please enter your email address.');
      }

      if (password.length < 6) {
        throw new Error('Password must contain at least 6 characters.');
      }

      if (authMode === 'register') {
        if (!name.trim()) {
          throw new Error('Please enter your full name.');
        }

        await signup({
          email: email.trim(),
          password,
          fullName: name.trim(),
          phone: phone.trim()
        });

        setSuccess(
          'Account created successfully. Please check your email if verification is required.'
        );

        setPassword('');
        return;
      }

      await login(email.trim(), password);

      onClose();
      setEmail('');
      setPassword('');
      setName('');
      setPhone('');
    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Authentication failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    resetMessages();
    setLoading(true);

    try {
      if (!phone.trim()) {
        throw new Error('Please enter your phone number.');
      }

      await sendPhoneOTP(phone.trim());

      setOtpSent(true);
      setSuccess('OTP sent successfully.');
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Unable to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    resetMessages();
    setLoading(true);

    try {
      if (!otp.trim()) {
        throw new Error('Please enter the OTP.');
      }

      await verifyPhoneOTP(phone.trim(), otp.trim());

      setSuccess('Phone verified successfully.');
      setPhone('');
      setOtp('');
      setOtpSent(false);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    resetMessages();
    setLoading(true);

    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Google login is not configured yet.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="rounded-3xl p-5 sm:p-8 max-w-md w-[92%] sm:w-full max-h-[90vh] overflow-y-auto no-scrollbar border border-emerald-200 shadow-2xl space-y-5 sm:space-y-6 bg-white relative">
        
        {/* CLOSE */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-2 rounded-full text-[#6c7a71] hover:text-[#002117] hover:bg-emerald-50 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#006c49] text-white flex items-center justify-center mx-auto shadow-md">
            <Sprout className="w-7 h-7" />
          </div>

          <h2 className="font-display font-black text-2xl text-[#002117]">
            {authMode === 'login'
              ? 'Welcome to AgriAI 366'
              : 'Create Farmer Account'}
          </h2>

          <p className="text-xs text-[#3c4a42] font-semibold">
            {authMode === 'login'
              ? 'Sign in to access your AgriAI dashboard.'
              : 'Create your free AgriAI farmer account.'}
          </p>
        </div>

        {/* AUTH METHOD SELECTOR (EMAIL vs PHONE) */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => switchMethod('email')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-2 ${
              authMethod === 'email'
                ? 'bg-white text-[#006c49] shadow-sm'
                : 'text-slate-600 hover:text-[#006c49]'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </button>

          <button
            type="button"
            onClick={() => switchMethod('phone')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-2 ${
              authMethod === 'phone'
                ? 'bg-white text-[#006c49] shadow-sm'
                : 'text-slate-600 hover:text-[#006c49]'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Phone OTP</span>
          </button>
        </div>

        {/* MODE TABS (For Email mode) */}
        {authMethod === 'email' && (
          <div className="flex rounded-2xl p-1 bg-emerald-50 border border-emerald-200 text-xs font-extrabold">
            <button
              type="button"
              onClick={() => switchMode('login')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                authMode === 'login'
                  ? 'bg-[#006c49] text-white shadow-md'
                  : 'text-[#006c49]'
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => switchMode('register')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                authMode === 'register'
                  ? 'bg-[#006c49] text-white shadow-md'
                  : 'text-[#006c49]'
              }`}
            >
              Register
            </button>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="flex gap-2 items-start p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 flex-none mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="flex gap-2 items-start p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 flex-none mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* OAUTH & QUICK OPTIONS */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-white border border-emerald-200 hover:border-[#006c49] text-[#002117] text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* DIVIDER */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-emerald-100 w-full" />
          <span className="bg-white px-3 text-[10px] text-[#6c7a71] uppercase font-extrabold absolute">
            or {authMethod === 'email' ? 'email' : 'phone'}
          </span>
        </div>

        {/* EMAIL FORM */}
        {authMethod === 'email' && (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {/* NAME */}
            {authMode === 'register' && (
              <div>
                <label className="font-extrabold text-[#00422b] block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#6c7a71] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006c49] font-medium disabled:opacity-60"
                  />
                </div>
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="font-extrabold text-[#00422b] block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6c7a71] absolute left-3.5 top-3" />
                <input
                  type="email"
                  placeholder="farmer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006c49] font-medium disabled:opacity-60"
                />
              </div>
            </div>

            {/* PHONE FOR REGISTER */}
            {authMode === 'register' && (
              <div>
                <label className="font-extrabold text-[#00422b] block mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#6c7a71] absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006c49] font-medium disabled:opacity-60"
                  />
                </div>
              </div>
            )}

            {/* PASSWORD */}
            <div>
              <label className="font-extrabold text-[#00422b] block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6c7a71] absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={loading}
                  className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006c49] font-medium disabled:opacity-60"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Please wait...</span>
                </>
              ) : (
                <>
                  <span>
                    {authMode === 'login' ? 'Sign In' : 'Create Account'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* PHONE OTP FORM */}
        {authMethod === 'phone' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="font-extrabold text-[#00422b] block mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#6c7a71] absolute left-3.5 top-3" />
                <input
                  type="tel"
                  placeholder="+919876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading || otpSent}
                  className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006c49] font-medium disabled:opacity-60"
                />
              </div>
            </div>

            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            ) : (
              <>
                <div>
                  <label className="font-extrabold text-[#00422b] block mb-1">
                    Enter OTP
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#6c7a71] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      disabled={loading}
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006c49] font-mono text-center tracking-[0.5em] font-bold text-base disabled:opacity-60"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp('');
                    setError('');
                  }}
                  className="w-full text-center text-xs font-bold text-[#006c49] hover:underline"
                >
                  Change phone number
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
