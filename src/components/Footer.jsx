import React from 'react';
import { Sprout, ShieldCheck, Phone, Mail, Heart } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="w-full bg-[#002117] text-[#b0f0d6] pt-12 pb-8 mt-12 border-t border-[#10b981]/20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#10b981]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full px-6 sm:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        {/* Brand info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#10b981] to-[#6ffbbe] flex items-center justify-center text-[#002117]">
              <Sprout className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl text-white">
              AgriAI <span className="text-[#10b981]">366</span>
            </span>
          </div>
          <p className="text-xs text-[#bbcabf] leading-relaxed">
            The next-generation smart farming ecosystem. Empowering Indian farmers with AI Mandi price predictions, disease diagnostics, 3D field twin, and direct buyer connections.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#10b981]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
            <span>AI Mandi Network: Operational (366 Districts)</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-white text-sm mb-4">Core Ecosystem</h4>
          <ul className="space-y-2 text-xs text-[#bbcabf]">
            <li><button onClick={() => setActiveTab('marketplace')} className="hover:text-[#10b981] transition-colors">Buyer Marketplace</button></li>
            <li><button onClick={() => setActiveTab('weather')} className="hover:text-[#10b981] transition-colors">Hyperlocal Weather Intel</button></li>
            <li><button onClick={() => setActiveTab('disease')} className="hover:text-[#10b981] transition-colors">AI Crop Disease Scanner</button></li>
            <li><button onClick={() => setActiveTab('farm')} className="hover:text-[#10b981] transition-colors">Digital Twin Farm Management</button></li>
            <li><button onClick={() => setActiveTab('equipment')} className="hover:text-[#10b981] transition-colors">Smart Equipment Rental Hub</button></li>
          </ul>
        </div>

        {/* Intelligence & Support */}
        <div>
          <h4 className="font-display font-bold text-white text-sm mb-4">AI Intelligence</h4>
          <ul className="space-y-2 text-xs text-[#bbcabf]">
            <li><button onClick={() => setActiveTab('marketplace')} className="hover:text-[#10b981] transition-colors">APMC Mandi Live Price Ticker</button></li>
            <li><button onClick={() => setActiveTab('marketplace')} className="hover:text-[#10b981] transition-colors">AI Price Trajectory Forecast</button></li>
            <li><button onClick={() => setActiveTab('experts')} className="hover:text-[#10b981] transition-colors">1-on-1 Agronomist Consultations</button></li>
            <li><button onClick={() => setActiveTab('forum')} className="hover:text-[#10b981] transition-colors">Farmer Community Network</button></li>
            <li><button onClick={() => setActiveTab('ai')} className="hover:text-[#10b981] transition-colors">24/7 Voice AI Agronomist</button></li>
          </ul>
        </div>

        {/* Helpline & Security */}
        <div className="space-y-4">
          <h4 className="font-display font-bold text-white text-sm mb-2">Farmer Helpline</h4>
          <div className="p-4 rounded-xl bg-white/5 border border-[#10b981]/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Phone className="w-4 h-4 text-[#10b981]" />
              <span>Toll Free: 1800-366-FARM</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#bbcabf]">
              <Mail className="w-4 h-4 text-[#10b981]" />
              <span>support@agriai366.in</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#bbcabf]">
            <ShieldCheck className="w-5 h-5 text-[#10b981]" />
            <span>Government Mandi Data Sync (Kisan Suvidha & APMC)</span>
          </div>
        </div>
      </div>

      <div className="w-full px-6 sm:px-12 mt-12 pt-6 border-t border-[#10b981]/10 flex flex-col md:flex-row items-center justify-between text-xs text-[#6c7a71]">
        <p>© 2026 AgriAI 366 Ecosystem. All rights reserved.</p>
        <p className="flex items-center gap-1 mt-2 md:mt-0">
          Built with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for Indian Farmers & Smart Agriculture.
        </p>
      </div>
    </footer>
  );
}
