import React, { useState } from 'react';
import { 
  Sprout, 
  ShoppingBag, 
  ScanLine, 
  CloudSun, 
  Layers, 
  Tractor, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Lock,
  ChevronDown,
  HelpCircle,
  UserCheck,
  Bot,
  Microscope,
  Sun,
  Users
} from 'lucide-react';
import ThreeLeafCanvas from '../components/ThreeLeafCanvas';

export default function Home({ isLoggedIn, onOpenAuth, onGoogleLogin, setActiveTab }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'Is AgriAI 366 completely free for Indian farmers?',
      a: 'Yes, 100% free! AgriAI 366 is built to support Indian farmers across 366 districts with zero registration fees or hidden charges.'
    },
    {
      q: 'How does the AI Mandi Price Prediction model work?',
      a: 'Our AI model analyzes 10+ years of APMC Mandi arrival data, regional monsoon satellite models, and processing mill demand to predict crop prices 7 to 14 days in advance with 94%+ accuracy.'
    },
    {
      q: 'How do I sell my produce directly to corporate buyers?',
      a: 'Once logged in, list your harvested crops under the Marketplace tab. Verified buyers (like ITC, Reliance Retail, Cargill) review listings and send direct purchase offers without middleman commissions.'
    },
    {
      q: 'Can I use voice interaction in regional languages like Hindi or Punjabi?',
      a: 'Absolutely! Our 24/7 AI Voice Agronomist supports English, Hindi, Punjabi, Marathi, and Telugu voice queries regarding crop diseases, weather, and mandi prices.'
    },
    {
      q: 'How accurate is the AI Crop Disease Leaf Scanner?',
      a: 'The leaf disease scanner delivers 98.4% diagnostic accuracy across 120+ plant pathogens, offering both organic remedies and chemical spray dosages.'
    }
  ];

  const ecosystemCards = [
    {
      id: 'ai',
      title: 'AI Advisor',
      desc: 'Get personalized, real-time advice on crop selection, fertilization schedules, and irrigation tailored to your specific soil data.',
      icon: Bot,
      bg: 'bg-[#e0f2fe]',
      iconBg: 'bg-[#38bdf8]/20 text-[#0284c7]'
    },
    {
      id: 'disease',
      title: 'Disease Scan',
      desc: 'Instantly identify plant diseases and pests by simply uploading a photo. Receive immediate, actionable treatment recommendations.',
      icon: Microscope,
      bg: 'bg-[#ffe4e6]',
      iconBg: 'bg-[#f43f5e]/20 text-[#e11d48]'
    },
    {
      id: 'weather',
      title: 'Weather Intel',
      desc: "Hyper-local weather forecasting integrated with your farm's coordinates to help you plan sowing, harvesting, and protection.",
      icon: Sun,
      bg: 'bg-[#fef3c7]',
      iconBg: 'bg-[#f59e0b]/20 text-[#d97706]'
    },
    {
      id: 'experts',
      title: 'Expert Network',
      desc: 'Book 1-on-1 video consultations with certified agronomists and veterinary doctors for complex farm issues.',
      icon: Users,
      bg: 'bg-[#dcfce7]',
      iconBg: 'bg-[#10b981]/20 text-[#006c49]'
    },
    {
      id: 'equipment',
      title: 'Equipment Hub',
      desc: 'A peer-to-peer marketplace to lease heavy machinery, tractors, and drones from nearby farmers or rental agencies.',
      icon: Tractor,
      bg: 'bg-[#ccfbf1]',
      iconBg: 'bg-[#14b8a6]/20 text-[#0d9488]'
    },
    {
      id: 'forum',
      title: 'Community Forum',
      desc: 'Share experiences, ask questions, and learn from a thriving community of progressive farmers across the country.',
      icon: Users,
      bg: 'bg-[#e0f2fe]',
      iconBg: 'bg-[#0284c7]/20 text-[#0284c7]'
    }
  ];

  return (
    <div className="space-y-16 py-2 w-full">
      
      {/* SEAMLESS HERO SECTION (EXACT DESIGN MATCH) */}
      <section className="relative w-full min-h-[calc(100vh-100px)] py-6 md:py-10 px-2 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden">
        
        {/* 3D CANVAS IN BACKGROUND LAYER */}
        <div className="absolute top-0 right-0 bottom-0 w-full lg:w-3/5 h-full z-0 opacity-95 pointer-events-none">
          <ThreeLeafCanvas className="w-full h-full" />
        </div>

        {/* Hero Left Content */}
        <div className="flex-1 space-y-6 z-10 w-full lg:max-w-2xl text-center lg:text-left">
          
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006c49]/15 text-[#006c49] text-xs font-extrabold uppercase tracking-wider">
            <Sprout className="w-4 h-4 text-[#006c49]" />
            <span>NEXT-GEN AGRITECH</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#002117] leading-[1.12] tracking-tight">
            Smart Farming. <br />
            <span className="text-[#38bdf8]">Better Decisions.</span> <br />
            Higher Yield.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#3c4a42] font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
            The all-in-one AI ecosystem for modern agriculture. Connect with experts, detect diseases, and lease equipment with ease.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={onOpenAuth}
                  className="px-7 py-3.5 rounded-xl bg-[#006c49] text-white text-sm font-extrabold shadow-md hover:bg-[#046a38] hover:scale-105 transition-all flex items-center gap-2 uppercase tracking-wider"
                >
                  <span>GET STARTED</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onGoogleLogin}
                  className="px-7 py-3.5 rounded-xl bg-[#bbf7d0] text-[#006c49] text-sm font-extrabold hover:bg-[#86efac] transition-all flex items-center gap-2 uppercase tracking-wider"
                >
                  <Play className="w-4 h-4 fill-[#006c49]" />
                  <span>WATCH DEMO</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setActiveTab('marketplace')}
                className="px-7 py-3.5 rounded-xl bg-[#006c49] text-white text-sm font-extrabold shadow-md hover:bg-[#046a38] hover:scale-105 transition-all flex items-center gap-2 uppercase tracking-wider"
              >
                <span>GO TO MARKETPLACE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Proof Badges & Yield Increase Card */}
          <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6">
            
            {/* Farmer Avatar Stack */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="/assets/agri_expert_portrait.jpg" alt="Farmer" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="/assets/crop_disease_leaf.jpg" alt="Farmer" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="/assets/smart_farm_aerial.jpg" alt="Farmer" />
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#38bdf8] text-[10px] font-extrabold text-white ring-2 ring-white">50k+</div>
              </div>
              <span className="text-xs text-[#3c4a42] font-semibold">Trusted by <strong>50,000+</strong> Farmers across India</span>
            </div>

            {/* Yield Increase Card */}
            <div className="px-4 py-2.5 rounded-2xl bg-[#dcfce7] border border-[#10b981]/30 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#10b981] flex items-center justify-center text-white font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[9px] font-extrabold uppercase text-[#006c49]">AVERAGE YIELD INCREASE</p>
                <p className="text-sm font-extrabold text-[#006c49]">+24.5%</p>
              </div>
            </div>

          </div>

        </div>

        {/* Hero Right Floating 3D Overlays */}
        <div className="w-full lg:w-[460px] h-[320px] sm:h-[400px] relative z-10 hidden sm:flex flex-col justify-between p-6 pointer-events-none">
          <div className="glass-card rounded-2xl p-4 border border-white/90 shadow-xl flex items-center gap-3 self-end animate-float">
            <div className="w-3.5 h-3.5 rounded-full bg-[#10b981] animate-ping" />
            <div>
              <p className="text-[10px] text-[#6c7a71] uppercase font-bold">FIELD HEALTH TWIN</p>
              <p className="text-xs font-bold text-[#00422b]">Optimal NDVI 0.84</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-white/90 shadow-xl flex items-center gap-3 self-start animate-float" style={{ animationDelay: '1.5s' }}>
            <TrendingUp className="w-5 h-5 text-[#006c49]" />
            <div>
              <p className="text-[10px] text-[#6c7a71] uppercase font-bold">AI PRICE TREND</p>
              <p className="text-xs font-bold text-[#006c49]">Wheat +3.2% Today</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: A COMPLETE ECOSYSTEM FOR MODERN FARMING (EXACT CARDS MATCH) */}
      <section className="space-y-8 w-full pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#002117]">
            A Complete Ecosystem for Modern Farming
          </h2>
          <p className="text-sm text-[#3c4a42] font-medium leading-relaxed">
            Everything you need to manage your farm efficiently, from seed to sale, powered by advanced artificial intelligence.
          </p>
        </div>

        {/* 6 PASTEL SOFT COLOR CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {ecosystemCards.map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id}
                onClick={() => {
                  if (!isLoggedIn) {
                    onOpenAuth();
                  } else {
                    setActiveTab(card.id);
                  }
                }}
                className={`${card.bg} rounded-3xl p-7 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between space-y-6 group border border-white/60`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl text-[#002117]">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#3c4a42] font-medium leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {!isLoggedIn && (
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-700">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Login to Access</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* IMPORTANT FAQ ACCORDION SECTION */}
      <section className="glass-card rounded-3xl p-6 sm:p-10 border border-white/90 shadow-xl space-y-6 w-full">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006c49] bg-[#006c49]/15 px-3 py-1 rounded-full">
            <HelpCircle className="w-4 h-4 text-[#006c49]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#002117]">
            Important Farmer Questions & Answers
          </h2>
        </div>

        <div className="space-y-3 w-full">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="rounded-2xl bg-white/75 border border-[#006c49]/15 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4.5 sm:p-5 text-sm font-bold text-[#00422b] hover:text-[#006c49] flex items-center justify-between gap-4 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#006c49] transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-[#3c4a42] font-medium leading-relaxed border-t border-[#006c49]/10 pt-3 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
