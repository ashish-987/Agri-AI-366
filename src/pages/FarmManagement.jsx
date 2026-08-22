import React, { useState } from 'react';
import { 
  Layers, 
  Sprout, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Droplets, 
  Activity, 
  AlertTriangle, 
  DollarSign, 
  Clock, 
  Calendar,
  Check,
  Zap,
  Radio,
  Play,
  ShieldCheck,
  BarChart2,
  ArrowUpRight,
  Plus,
  RefreshCw
} from 'lucide-react';

export default function FarmManagement() {
  const [activeSector, setActiveSector] = useState('Sector A (Wheat)');
  const [irrigationActive, setIrrigationActive] = useState(false);
  const [actionNotice, setActionNotice] = useState('');

  const triggerIrrigation = () => {
    setIrrigationActive(true);
    setActionNotice('💧 Automated Drip Irrigation initialized for ' + activeSector + ' via smart IoT relay.');
    setTimeout(() => setActionNotice(''), 5000);
  };

  const triggerScan = () => {
    setActionNotice('🛰️ High-resolution satellite NDVI telemetry refreshed! Field health optimal (NDVI 0.84).');
    setTimeout(() => setActionNotice(''), 5000);
  };

  return (
    <div className="space-y-8 py-2 w-full px-4 sm:px-6 animate-in fade-in">
      
      {/* Toast Notification */}
      {actionNotice && (
        <div className="p-4 rounded-2xl bg-[#00422b] text-white font-bold text-xs flex items-center justify-between shadow-xl animate-in fade-in">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice('')} className="p-1 text-emerald-300 hover:text-white">✕</button>
        </div>
      )}

      {/* TOP HEADER & MISSION CONTROL BAR */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-emerald-100 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#006c49] text-[11px] font-extrabold uppercase tracking-wider border border-emerald-200">
            <Radio className="w-3.5 h-3.5 text-[#006c49] animate-pulse" />
            <span>MISSION CONTROL • DIGITAL TWIN LIVE</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">
            Farm Operations & Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-[#3c4a42] font-medium">
            Real-time IoT sensors, crop lifecycle analytics, digital twin soil health, and resource management.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={triggerScan}
            className="px-4 py-2.5 rounded-2xl bg-white text-[#006c49] border border-emerald-200 text-xs font-bold shadow-sm hover:bg-emerald-50 transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#006c49]" />
            <span>Refresh NDVI</span>
          </button>

          <button 
            onClick={triggerIrrigation}
            className="px-5 py-2.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold shadow-md hover:bg-[#046a38] transition-all flex items-center gap-2"
          >
            <Droplets className="w-4 h-4 text-emerald-300" />
            <span>{irrigationActive ? 'Irrigation Active 💧' : 'Trigger Drip Irrigation'}</span>
          </button>
        </div>
      </div>

      {/* SECTOR SELECTOR STRIP */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {['Sector A (Wheat)', 'Sector B (Tomato)', 'Sector C (Soybean)'].map((sec) => (
          <button
            key={sec}
            onClick={() => setActiveSector(sec)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all ${
              activeSector === sec 
                ? 'bg-[#006c49] text-white shadow-md' 
                : 'bg-white text-[#00422b] border border-emerald-100 hover:bg-emerald-50'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* 4 SLEEK METRIC HERO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Area */}
        <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#6c7a71] tracking-wider">TOTAL FARM AREA</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#006c49] flex items-center justify-center font-bold">
              <Sprout className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-display font-black text-3xl text-[#002117]">12 <span className="text-xs text-[#6c7a71] font-medium">Acres</span></h3>
            <p className="text-xs text-[#006c49] font-bold mt-1">3 Sectors Mapped</p>
          </div>
        </div>

        {/* Active Crops */}
        <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#6c7a71] tracking-wider">ACTIVE CROP VARIETIES</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#0284c7] flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-display font-black text-3xl text-[#002117]">3 <span className="text-xs text-[#6c7a71] font-medium">Crops</span></h3>
            <p className="text-xs text-[#0284c7] font-bold mt-1">PB-1, Hybrid, Yellow</p>
          </div>
        </div>

        {/* Projected Yield */}
        <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#6c7a71] tracking-wider">PROJECTED YIELD</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h3 className="font-display font-black text-3xl text-[#002117]">+24.5%</h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">vs last season</span>
            </div>
            <p className="text-xs text-emerald-700 font-bold mt-1">Optimal Growth Rate</p>
          </div>
        </div>

        {/* Estimated Profit */}
        <div className="rounded-3xl p-6 bg-[#00422b] text-white shadow-md space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#6ffbbe] tracking-wider">EST. NET REVENUE</span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 text-white flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-display font-black text-3xl text-[#6ffbbe]">₹4,85,000</h3>
            <p className="text-[11px] text-[#bbcabf] font-semibold mt-1">APMC Mandi Arbitrage Active</p>
          </div>
        </div>

      </div>

      {/* MIDDLE SECTION: CROP LIFECYCLE TRACKER & DIGITAL TWIN TELEMETRY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Crop Lifecycle Tracker Card */}
        <div className="lg:col-span-7 rounded-3xl p-7 bg-white border border-emerald-100 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase bg-emerald-100 text-[#006c49] px-2.5 py-1 rounded-full mb-1">
                <span>LIFECYCLE PIPELINE</span>
              </div>
              <h2 className="font-display font-black text-2xl text-[#002117]">Crop Stage Tracker</h2>
              <p className="text-xs text-[#6c7a71] font-semibold">{activeSector}</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full">
              Day 42 of 120
            </span>
          </div>

          {/* Interactive Stepper */}
          <div className="grid grid-cols-4 gap-2 text-center py-4 relative">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#006c49] text-white flex items-center justify-center mx-auto text-xs font-bold shadow-sm">
                <Check className="w-5 h-5" />
              </div>
              <p className="font-extrabold text-xs text-[#002117]">Sowing</p>
              <span className="text-[9px] text-emerald-700 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full">DONE</span>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#006c49] text-white ring-4 ring-emerald-200 flex items-center justify-center mx-auto text-xs font-bold shadow-md animate-pulse">
                <Sprout className="w-5 h-5" />
              </div>
              <p className="font-extrabold text-xs text-[#006c49]">Tillering</p>
              <span className="text-[9px] text-white bg-[#006c49] font-extrabold px-2 py-0.5 rounded-full shadow-sm">ACTIVE STAGE</span>
            </div>

            <div className="space-y-2 opacity-70">
              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-500 flex items-center justify-center mx-auto text-xs font-bold">
                3
              </div>
              <p className="font-bold text-xs text-slate-700">Flowering</p>
              <span className="text-[9px] text-slate-500 font-semibold">EST. 12 DAYS</span>
            </div>

            <div className="space-y-2 opacity-70">
              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-500 flex items-center justify-center mx-auto text-xs font-bold">
                4
              </div>
              <p className="font-bold text-xs text-slate-700">Harvesting</p>
              <span className="text-[9px] text-slate-500 font-semibold">EST. 45 DAYS</span>
            </div>
          </div>

          {/* AI Insight Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1.5">
            <p className="font-bold text-[#006c49] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#006c49]" /> AI Agronomist Guidance
            </p>
            <p className="text-[#3c4a42] leading-relaxed font-medium">
              Current tillering rate is 5% ahead of schedule due to optimal soil moisture (62%). Applying a mild nitrogen top-up in 3 days will maximize tiller survival and increase head count.
            </p>
          </div>
        </div>

        {/* Digital Twin Telemetry Radar */}
        <div className="lg:col-span-5 rounded-3xl p-7 bg-white border border-emerald-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <div>
              <h3 className="font-display font-extrabold text-xl text-[#002117]">Digital Twin Analysis</h3>
              <p className="text-[10px] text-[#6c7a71] font-semibold">Real-time IoT Satellite Telemetry</p>
            </div>
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#006c49] text-white flex items-center justify-center font-bold shadow-sm">
                  <Sprout className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[9px] text-[#6c7a71] uppercase font-extrabold">SOIL VEGETATION (NDVI)</p>
                  <p className="font-extrabold text-[#002117] text-sm">NDVI 0.84 <span className="text-emerald-700 text-xs">(Optimal)</span></p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">Vigorous</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0284c7] text-white flex items-center justify-center font-bold shadow-sm">
                  <Droplets className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[9px] text-[#6c7a71] uppercase font-extrabold">SMART IRRIGATION</p>
                  <p className="font-extrabold text-[#002117] text-sm">{irrigationActive ? 'Running Drip Cycle' : 'Scheduled (2:00 PM)'}</p>
                </div>
              </div>
              <button onClick={triggerIrrigation} className="text-[10px] font-bold bg-blue-600 text-white px-2.5 py-1 rounded-full hover:bg-blue-700">
                {irrigationActive ? 'Running' : 'Start'}
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-sm">
                  <Activity className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[9px] text-[#6c7a71] uppercase font-extrabold">LEAF AREA INDEX</p>
                  <p className="font-extrabold text-[#002117] text-sm">3.2 <span className="text-emerald-700 text-xs">(+0.4)</span></p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">Growing</span>
            </div>
          </div>
        </div>

      </div>

      {/* FIELD HEALTH TELEMETRY GAUGES */}
      <div className="space-y-4">
        <h2 className="font-display font-extrabold text-2xl text-[#002117]">Field Health Gauges</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6c7a71] font-extrabold">SOIL MOISTURE</span>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">Optimal</span>
            </div>
            <p className="font-display font-black text-3xl text-[#002117]">62%</p>
            <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-[#006c49] rounded-full w-[62%]" />
            </div>
          </div>

          <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6c7a71] font-extrabold">NITROGEN (NPK)</span>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">High</span>
            </div>
            <p className="font-display font-black text-3xl text-[#002117]">42 <span className="text-xs text-[#6c7a71] font-medium">ppm</span></p>
            <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-[#006c49] rounded-full w-[80%]" />
            </div>
          </div>

          <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6c7a71] font-extrabold">PEST RISK RADAR</span>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">Low Risk</span>
            </div>
            <p className="font-display font-black text-3xl text-[#002117]">Safe</p>
            <p className="text-[11px] text-[#6c7a71] font-medium">Drone scan completed 2h ago</p>
          </div>
        </div>
      </div>

      {/* BOTTOM GRID: EXPENSE TRACKER & ACTIVITY LOG */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Expense Tracker */}
        <div className="lg:col-span-6 rounded-3xl p-7 bg-white border border-emerald-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-extrabold text-xl text-[#002117]">Expense Tracker</h3>
              <p className="text-xs text-[#6c7a71] font-medium">Total Budget Spent: <strong className="text-[#002117]">₹45,200</strong> / ₹1,00,000</p>
            </div>
            <span className="text-xs font-bold text-[#006c49] bg-emerald-100 px-3 py-1 rounded-full">45% Spent</span>
          </div>

          <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-[#006c49] rounded-full w-[45%]" />
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#002117]">Premium Wheat Seed (PB-1)</p>
                <p className="text-[10px] text-[#6c7a71]">Oct 12, 2025</p>
              </div>
              <span className="font-black text-[#002117] text-sm">₹15,000</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#002117]">NPK Fertilizer Batch</p>
                <p className="text-[10px] text-[#6c7a71]">Oct 28, 2025</p>
              </div>
              <span className="font-black text-[#002117] text-sm">₹12,500</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#002117]">Tractor Leasing & Labor</p>
                <p className="text-[10px] text-[#6c7a71]">Nov 05, 2025</p>
              </div>
              <span className="font-black text-[#002117] text-sm">₹17,700</span>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="lg:col-span-6 rounded-3xl p-7 bg-white border border-emerald-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-extrabold text-xl text-[#002117]">IoT Activity Log</h3>
            <button className="text-xs font-extrabold uppercase text-[#006c49] hover:underline">View All</button>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#006c49] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#006c49]" /> AI Disease Scan
                </span>
                <span className="text-[10px] text-[#6c7a71] font-semibold">Just now</span>
              </div>
              <p className="text-[#3c4a42]">Completed full field drone scan. Status: <strong className="text-emerald-800">Healthy</strong>. No immediate actions required.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-emerald-100 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#002117] flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-600" /> Irrigation Cycle Started
                </span>
                <span className="text-[10px] text-[#6c7a71]">6:00 AM</span>
              </div>
              <p className="text-[#3c4a42]">Sector A automated drip irrigation engaged based on soil moisture drop.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-emerald-100 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#002117] flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-amber-600" /> Fertilizer Applied
                </span>
                <span className="text-[10px] text-[#6c7a71]">2 Days Ago</span>
              </div>
              <p className="text-[#3c4a42]">NPK standard mix applied via fertigation to Sector A and B.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
