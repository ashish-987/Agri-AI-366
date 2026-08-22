import React from 'react';
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
  Check
} from 'lucide-react';

export default function FarmManagement() {
  return (
    <div className="space-y-8 py-2 w-full">
      
      {/* HEADER & TOP 3 SUMMARY CARDS (EXACT MATCH TO SCREENSHOT 4) */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">
            Farm Management
          </h1>
          <p className="text-xs sm:text-sm text-[#3c4a42] font-medium leading-relaxed">
            Mission Control for your agricultural operations. Monitor lifecycle stages, resources, and growth metrics.
          </p>
        </div>

        {/* 3 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-3xl p-6 bg-[#dcfce7] border border-[#006c49]/15 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase text-[#006c49] tracking-wider">TOTAL AREA</p>
              <p className="font-display font-black text-3xl text-[#002117] mt-1">12 <span className="text-xs text-[#6c7a71] font-medium">Acres</span></p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#006c49]/15 flex items-center justify-center text-[#006c49]">
              <Sprout className="w-5 h-5" />
            </div>
          </div>

          <div className="rounded-3xl p-6 bg-[#e0f2fe] border border-[#0284c7]/15 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase text-[#0284c7] tracking-wider">ACTIVE CROPS</p>
              <p className="font-display font-black text-3xl text-[#002117] mt-1">3 <span className="text-xs text-[#6c7a71] font-medium">Varieties</span></p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#0284c7]/15 flex items-center justify-center text-[#0284c7]">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="rounded-3xl p-6 bg-[#fef3c7] border border-[#d97706]/15 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase text-[#d97706] tracking-wider">PROJECTED YIELD</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-display font-black text-3xl text-[#002117]">+15%</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">📈 vs last season</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#d97706]/15 flex items-center justify-center text-[#d97706]">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE GRID: CROP LIFECYCLE TRACKER & DIGITAL TWIN ANALYSIS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Crop Lifecycle Tracker */}
        <div className="lg:col-span-8 rounded-3xl p-7 bg-[#dcfce7]/40 border border-[#006c49]/15 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-extrabold text-xl text-[#002117]">Crop Lifecycle Tracker</h2>
              <p className="text-xs text-[#6c7a71] font-semibold">Punjab Wheat Farm (Sector A)</p>
            </div>
            <button className="text-xs font-extrabold uppercase text-[#006c49] hover:underline">
              View Details →
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-4 gap-2 text-center relative py-4">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#006c49] text-white flex items-center justify-center mx-auto text-xs font-bold">
                <Check className="w-4 h-4" />
              </div>
              <p className="font-bold text-xs text-[#002117]">Sowing</p>
              <p className="text-[9px] text-emerald-700 font-extrabold uppercase">COMPLETED</p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#006c49] text-white ring-4 ring-[#006c49]/20 flex items-center justify-center mx-auto text-xs font-bold">
                <Sprout className="w-4 h-4" />
              </div>
              <p className="font-bold text-xs text-[#002117]">Tillering</p>
              <p className="text-[9px] text-[#006c49] bg-[#dcfce7] font-extrabold uppercase px-2 py-0.5 rounded-full inline-block">ACTIVE STAGE</p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-[#006c49]/30 text-[#6c7a71] flex items-center justify-center mx-auto text-xs font-bold">
                3
              </div>
              <p className="font-bold text-xs text-[#6c7a71]">Flowering</p>
              <p className="text-[9px] text-[#6c7a71]">EST. 12 DAYS</p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-[#006c49]/30 text-[#6c7a71] flex items-center justify-center mx-auto text-xs font-bold">
                4
              </div>
              <p className="font-bold text-xs text-[#6c7a71]">Harvesting</p>
              <p className="text-[9px] text-[#6c7a71]">EST. 45 DAYS</p>
            </div>
          </div>

          {/* AI Insight Box */}
          <div className="p-4 rounded-2xl bg-white border border-[#006c49]/20 text-xs space-y-1">
            <p className="font-bold text-[#006c49] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#006c49]" /> AI Insight: Tillering Optimization
            </p>
            <p className="text-[#3c4a42] leading-relaxed">
              Current tillering rate is 5% ahead of schedule due to optimal soil moisture. Applying a mild nitrogen top-up in 3 days is recommended to maximize tiller survival.
            </p>
          </div>
        </div>

        {/* Digital Twin Analysis */}
        <div className="lg:col-span-4 rounded-3xl p-7 bg-[#dcfce7]/60 border border-[#006c49]/15 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#006c49]/10 pb-3">
            <h3 className="font-display font-extrabold text-lg text-[#002117]">Digital Twin Analysis</h3>
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-white border border-[#006c49]/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#006c49] flex items-center justify-center font-bold">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[9px] text-[#6c7a71] uppercase font-bold">SOIL HEALTH</p>
                <p className="font-bold text-[#002117]">Optimal condition</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-[#006c49]/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#0284c7] flex items-center justify-center font-bold">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[9px] text-[#6c7a71] uppercase font-bold">IRRIGATION</p>
                <p className="font-bold text-[#002117]">Scheduled (2:00 PM)</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-[#006c49]/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[9px] text-[#6c7a71] uppercase font-bold">LEAF AREA INDEX</p>
                <p className="font-bold text-[#002117]">3.2 <span className="text-emerald-700">(+0.4)</span></p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FIELD HEALTH OVERVIEW */}
      <div className="space-y-4">
        <h2 className="font-display font-extrabold text-xl text-[#002117]">Field Health Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6c7a71] font-bold">Soil Moisture</span>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Optimal</span>
            </div>
            <p className="font-display font-black text-3xl text-[#002117]">62%</p>
            <div className="w-full h-2 bg-[#006c49]/15 rounded-full overflow-hidden">
              <div className="h-full bg-[#006c49] rounded-full w-[62%]" />
            </div>
          </div>

          <div className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6c7a71] font-bold">Nitrogen Levels</span>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">High</span>
            </div>
            <p className="font-display font-black text-3xl text-[#002117]">42 <span className="text-xs text-[#6c7a71] font-medium">ppm</span></p>
            <div className="w-full h-2 bg-[#006c49]/15 rounded-full overflow-hidden">
              <div className="h-full bg-[#006c49] rounded-full w-[80%]" />
            </div>
          </div>

          <div className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6c7a71] font-bold">Pest Activity</span>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Low Risk</span>
            </div>
            <p className="font-display font-black text-3xl text-[#002117]">Safe</p>
            <p className="text-[10px] text-[#6c7a71]">Last scanned 2h ago</p>
          </div>
        </div>
      </div>

      {/* BOTTOM GRID: EXPENSE TRACKER & ACTIVITY LOG (EXACT MATCH TO SCREENSHOT 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Expense Tracker */}
        <div className="lg:col-span-6 rounded-3xl p-7 bg-white border border-[#006c49]/15 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-extrabold text-lg text-[#002117]">Expense Tracker</h3>
              <p className="text-xs text-[#6c7a71]">Total Budget Spent: <strong>₹45,200</strong> / ₹1,00,000</p>
            </div>
            <span className="text-xs font-bold text-[#006c49] bg-[#dcfce7] px-2.5 py-1 rounded-full">45%</span>
          </div>

          <div className="w-full h-2.5 bg-[#006c49]/15 rounded-full overflow-hidden">
            <div className="h-full bg-[#006c49] rounded-full w-[45%]" />
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-[#dcfce7]/30 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#002117]">Premium Wheat Seed</p>
                <p className="text-[10px] text-[#6c7a71]">Oct 12, 2023</p>
              </div>
              <span className="font-extrabold text-[#002117]">₹15,000</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#dcfce7]/30 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#002117]">NPK Fertilizer Batch</p>
                <p className="text-[10px] text-[#6c7a71]">Oct 28, 2023</p>
              </div>
              <span className="font-extrabold text-[#002117]">₹12,500</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#dcfce7]/30 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#002117]">Tractor Leasing & Labor</p>
                <p className="text-[10px] text-[#6c7a71]">Nov 05, 2023</p>
              </div>
              <span className="font-extrabold text-[#002117]">₹17,700</span>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="lg:col-span-6 rounded-3xl p-7 bg-white border border-[#006c49]/15 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-extrabold text-lg text-[#002117]">Activity Log</h3>
            <button className="text-xs font-extrabold uppercase text-[#006c49] hover:underline">View All</button>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#dcfce7]/50 border border-[#006c49]/15 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#006c49]">AI Disease Scan</span>
                <span className="text-[10px] text-[#6c7a71]">Just now</span>
              </div>
              <p className="text-[#3c4a42]">Completed full field drone scan. Status: <strong>Healthy</strong>. No immediate actions required.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#006c49]/10 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#002117]">Irrigation Cycle Started</span>
                <span className="text-[10px] text-[#6c7a71]">6:00 AM</span>
              </div>
              <p className="text-[#3c4a42]">Sector A automated drip irrigation engaged based on soil moisture drop.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#006c49]/10 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#002117]">Fertilizer Applied</span>
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
