import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  PlusCircle, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Truck, 
  Phone, 
  DollarSign,
  ArrowUpRight,
  ChevronRight,
  Info,
  Calendar,
  Layers,
  BarChart3,
  RefreshCw,
  Bell,
  Mail,
  Award,
  Calculator
} from 'lucide-react';

export default function Marketplace() {
  const [activeMarketTab, setActiveMarketTab] = useState('snapshot');
  
  // Best Market Calculator State
  const [commodity, setCommodity] = useState('Tomato (Hybrid)');
  const [quantity, setQuantity] = useState('50');
  const [qualityGrade, setQualityGrade] = useState('Grade A');
  const [origin, setOrigin] = useState('Ludhiana, Punjab');
  const [calcResult, setCalcResult] = useState({
    bestMandi: 'Kanpur Mandi',
    score: 92,
    distance: '68 km from origin',
    transportTime: '1.5 hrs transport',
    expectedPrice: '₹2,420 / qtl',
    grossRevenue: '₹1,21,000',
    transportCost: '-₹6,500',
    netRevenue: '₹1,14,500'
  });

  // Farmer ROI Calculator State
  const [roiAcreage, setRoiAcreage] = useState(10);
  const [roiCrop, setRoiCrop] = useState('Wheat (PB-1)');

  const handleRecalculate = (e) => {
    e.preventDefault();
    alert("Recalculating AI market transport & price trajectory...");
  };

  const buyersList = [
    {
      id: 1,
      name: 'ABC Foods & Agros',
      type: 'PROCESSOR',
      verified: true,
      distance: '45 km away',
      requiredCrop: 'Tomato (Hybrid)',
      targetPrice: '₹2,480 / qtl',
      neededQty: '15,000 Quintals',
      img: '/assets/fresh_mandi_produce.jpg'
    },
    {
      id: 2,
      name: 'Z Green Exports India',
      type: 'WHOLESALER',
      verified: true,
      distance: '120 km away',
      requiredCrop: 'Beefsteak & Sharbati Wheat',
      targetPrice: '₹3,200 / qtl',
      neededQty: '5,000 Quintals',
      img: '/assets/fresh_mandi_produce.jpg'
    },
    {
      id: 3,
      name: 'National Grocers Direct',
      type: 'DISTRIBUTOR',
      verified: true,
      distance: '25 km away',
      requiredCrop: 'Organic Pulses & Tomato',
      targetPrice: '₹3,820 / qtl',
      neededQty: '50,000 Quintals',
      img: '/assets/fresh_mandi_produce.jpg'
    }
  ];

  return (
    <div className="space-y-8 py-2 w-full">
      
      {/* SUB-NAVIGATION TAB STRIP */}
      <div className="flex items-center gap-2 border-b border-[#006c49]/15 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'snapshot', label: 'Market Snapshot', icon: BarChart3 },
          { id: 'bestMarket', label: 'Best Market Optimizer', icon: Sparkles },
          { id: 'explorer', label: 'Market Price Explorer', icon: MapPin },
          { id: 'buyers', label: 'Find Buyers & Sell', icon: Building2 },
          { id: 'roi', label: 'Farmer ROI Calculator', icon: Calculator }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMarketTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMarketTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#006c49] text-white shadow-md'
                  : 'bg-white text-[#00422b] hover:bg-[#dcfce7] border border-[#006c49]/15'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: MARKET SNAPSHOT */}
      {activeMarketTab === 'snapshot' && (
        <div className="space-y-8">
          
          <div className="space-y-1">
            <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">Market Snapshot</h1>
            <p className="text-xs sm:text-sm text-[#3c4a42] font-medium">
              Real-time agricultural intelligence and commodity pricing across regional mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="rounded-3xl p-6 bg-white border border-[#006c49]/20 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase text-[#6c7a71]">HERO COMMODITY</span>
                <div className="w-8 h-8 rounded-xl bg-[#dcfce7] text-[#006c49] flex items-center justify-center font-bold">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl text-[#002117]">Tomato</h3>
                <p className="text-xs text-[#6c7a71] font-semibold">Lucknow Mandi</p>
              </div>

              <div className="flex items-baseline gap-2 pt-2 border-t border-[#006c49]/10">
                <span className="text-xs text-[#6c7a71]">Current</span>
                <span className="font-display font-black text-xl text-[#002117]">₹2,450/q</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">↑ 4.2%</span>
              </div>
            </div>

            <div className="rounded-3xl p-6 bg-white border border-[#006c49]/20 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase text-[#6c7a71]">MARKET AVERAGE</span>
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#0284c7] flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl text-[#002117]">₹2,180/q</h3>
                <p className="text-xs text-[#6c7a71] font-semibold">Across all regions <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">- 0.0%</span></p>
              </div>

              <div className="flex items-end gap-1.5 h-6 pt-1">
                <div className="w-full bg-[#006c49]/20 h-3 rounded-t" />
                <div className="w-full bg-[#006c49]/30 h-5 rounded-t" />
                <div className="w-full bg-[#006c49]/20 h-4 rounded-t" />
                <div className="w-full bg-[#006c49] h-6 rounded-t" />
                <div className="w-full bg-[#006c49]/20 h-5 rounded-t" />
              </div>
            </div>

            <div className="rounded-3xl p-6 bg-white border border-[#006c49]/20 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase text-[#6c7a71]">LOWEST RECORDED</span>
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                  <TrendingDown className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl text-[#002117]">₹1,920/q</h3>
                <p className="text-xs text-[#6c7a71] font-semibold">Kanpur Dehat <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded">↓ 1.8%</span></p>
              </div>
            </div>

            <div className="rounded-3xl p-6 bg-[#00422b] text-white shadow-md space-y-3 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase text-[#6ffbbe] tracking-wider">ACTIVE MARKETS</span>
                <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="font-display font-black text-3xl text-white">18 <span className="text-xs font-normal">Available</span></h3>
                <p className="text-[11px] text-[#bbcabf] font-medium">Updating in real-time from state APMC feeds.</p>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-3">
                <h3 className="font-display font-bold text-xs text-[#002117]">Recent Searches</h3>
                <div className="flex flex-wrap gap-2 text-xs font-bold text-[#006c49]">
                  <span className="px-3 py-1.5 rounded-xl bg-[#dcfce7]">🍅 Tomato - UP</span>
                  <span className="px-3 py-1.5 rounded-xl bg-[#dcfce7]">🧅 Onion - Nashik</span>
                  <span className="px-3 py-1.5 rounded-xl bg-[#dcfce7]">🥔 Potato</span>
                </div>
              </div>

              <div className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-xs text-[#002117]">Saved Markets</h3>
                  <button className="text-[10px] font-bold text-[#006c49] uppercase">View All</button>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-[#dcfce7]/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#006c49]" />
                      <div>
                        <p className="font-bold text-[#002117]">Lucknow Mandi</p>
                        <p className="text-[10px] text-[#6c7a71]">Uttar Pradesh</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#006c49]" />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#dcfce7]/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#006c49]" />
                      <div>
                        <p className="font-bold text-[#002117]">Azadpur Mandi</p>
                        <p className="text-[10px] text-[#6c7a71]">Delhi APMC</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#006c49]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 rounded-3xl p-7 bg-white border border-[#006c49]/15 shadow-sm space-y-6">
              <div>
                <h2 className="font-display font-extrabold text-2xl text-[#002117]">Recommended Markets</h2>
                <p className="text-xs text-[#6c7a71] font-medium">AI-driven recommendations based on current location and logistics overhead.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-semibold text-[#002117]">
                  <thead>
                    <tr className="border-b border-[#006c49]/10 text-[10px] text-[#6c7a71] uppercase tracking-wider">
                      <th className="py-3 px-2">MARKET / LOCATION</th>
                      <th className="py-3 px-2">EST. DISTANCE</th>
                      <th className="py-3 px-2">CURRENT PRICE (₹/Q)</th>
                      <th className="py-3 px-2">NET PROFIT MARGIN</th>
                      <th className="py-3 px-2 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#006c49]/10">
                    <tr>
                      <td className="py-4 px-2 font-bold">Lucknow Central (UP)</td>
                      <td className="py-4 px-2 text-[#6c7a71]">45 km</td>
                      <td className="py-4 px-2 font-bold text-[#006c49]">₹2,450</td>
                      <td className="py-4 px-2"><span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">High Margin</span></td>
                      <td className="py-4 px-2 text-right"><button className="px-3 py-1.5 rounded-xl bg-[#006c49] text-white text-[11px] font-bold">View Mandi</button></td>
                    </tr>
                    <tr>
                      <td className="py-4 px-2 font-bold">Kanpur Nagar (UP)</td>
                      <td className="py-4 px-2 text-[#6c7a71]">82 km</td>
                      <td className="py-4 px-2 font-bold text-[#0284c7]">₹2,310</td>
                      <td className="py-4 px-2"><span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">Med Margin</span></td>
                      <td className="py-4 px-2 text-right"><button className="px-3 py-1.5 rounded-xl bg-[#006c49] text-white text-[11px] font-bold">View Mandi</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: BEST MARKET OPTIMIZER */}
      {activeMarketTab === 'bestMarket' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">Find My Best Market</h1>
              <p className="text-xs sm:text-sm text-[#3c4a42] font-medium">
                AI-driven market recommendation based on real-time pricing, transport costs, and localized demand forecasts.
              </p>
            </div>
            <span className="text-xs font-bold text-[#006c49] bg-[#dcfce7] px-3.5 py-1.5 rounded-full border border-[#006c49]/20">
              ✨ AI Optimizer Active
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 rounded-3xl p-7 bg-white border border-[#006c49]/15 shadow-sm space-y-4">
              <h2 className="font-display font-bold text-base text-[#002117] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#006c49]" /> Input Parameters
              </h2>

              <form onSubmit={handleRecalculate} className="space-y-4 text-xs font-bold text-[#00422b]">
                <div>
                  <label className="block mb-1.5 text-[#6c7a71]">COMMODITY</label>
                  <select 
                    value={commodity} 
                    onChange={(e) => setCommodity(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#dcfce7]/50 border border-[#006c49]/20 text-[#002117] font-semibold focus:outline-none"
                  >
                    <option>Tomato (Hybrid)</option>
                    <option>Sharbati Wheat</option>
                    <option>Yellow Soybean</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1.5 text-[#6c7a71]">QUANTITY (QTL)</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[#dcfce7]/50 border border-[#006c49]/20 text-[#002117] font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-[#6c7a71]">QUALITY GRADE</label>
                    <input
                      type="text"
                      value={qualityGrade}
                      onChange={(e) => setQualityGrade(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[#dcfce7]/50 border border-[#006c49]/20 text-[#002117] font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>RECALCULATE</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl p-8 bg-white border-2 border-[#006c49] shadow-md space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                      🏆 TOP RECOMMENDATION
                    </span>
                    <h2 className="font-display font-black text-3xl text-[#002117]">{calcResult.bestMandi}</h2>
                    <p className="text-xs text-[#6c7a71] font-semibold">{calcResult.distance} • {calcResult.transportTime}</p>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-[#006c49] text-white flex flex-col items-center justify-center font-bold shadow-md flex-none">
                    <span className="font-display font-black text-2xl">{calcResult.score}</span>
                    <span className="text-[8px] uppercase tracking-widest text-[#6ffbbe]">SCORE</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-2xl bg-[#dcfce7]/40 text-center">
                    <p className="text-[9px] text-[#6c7a71] uppercase font-bold">EXPECTED PRICE</p>
                    <p className="font-bold text-xs text-[#002117]">{calcResult.expectedPrice}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#dcfce7]/40 text-center">
                    <p className="text-[9px] text-[#6c7a71] uppercase font-bold">GROSS REVENUE</p>
                    <p className="font-bold text-xs text-[#002117]">{calcResult.grossRevenue}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-rose-50 text-center">
                    <p className="text-[9px] text-rose-700 uppercase font-bold">TRANSPORT EST.</p>
                    <p className="font-bold text-xs text-rose-700">{calcResult.transportCost}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#00422b] text-white text-center shadow-md">
                    <p className="text-[9px] text-[#6ffbbe] uppercase font-bold">NET EST. REVENUE</p>
                    <p className="font-display font-bold text-xs">{calcResult.netRevenue}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FARMER ROI CALCULATOR */}
      {activeMarketTab === 'roi' && (
        <div className="rounded-3xl p-8 bg-white border border-[#006c49]/20 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#006c49] text-white flex items-center justify-center font-bold">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-black text-2xl text-[#002117]">Farmer ROI & Yield Boost Calculator</h2>
              <p className="text-xs text-[#6c7a71]">Calculate net profit increase, pesticide cost savings, and APMC arbitrage gains.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#00422b] mb-1">Enter Farm Size (Acres):</label>
                <input
                  type="number"
                  value={roiAcreage}
                  onChange={(e) => setRoiAcreage(Number(e.target.value))}
                  className="w-full p-3 rounded-2xl bg-[#dcfce7] border border-[#006c49]/30 text-base font-black text-[#002117]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#00422b] mb-1">Crop Type:</label>
                <select
                  value={roiCrop}
                  onChange={(e) => setRoiCrop(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-[#dcfce7] border border-[#006c49]/30 text-xs font-bold text-[#002117]"
                >
                  <option>Wheat (PB-1)</option>
                  <option>Tomato (Hybrid)</option>
                  <option>Soybean (Yellow)</option>
                </select>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#00422b] text-white space-y-4 shadow-xl">
              <span className="text-[10px] font-extrabold uppercase bg-[#6ffbbe] text-[#002117] px-3 py-1 rounded-full">
                PROJECTED FINANCIAL GAIN
              </span>

              <div>
                <p className="text-xs text-[#bbcabf]">Estimated Net Profit Boost:</p>
                <p className="font-display font-black text-4xl text-[#6ffbbe]">₹{(roiAcreage * 18500).toLocaleString('en-IN')}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs border-t border-white/20 pt-3">
                <div>
                  <p className="text-[#bbcabf]">Pesticide Cost Reduction:</p>
                  <p className="font-bold text-white">-32% (₹{(roiAcreage * 1240).toLocaleString('en-IN')} saved)</p>
                </div>
                <div>
                  <p className="text-[#bbcabf]">Mandi Arbitrage Premium:</p>
                  <p className="font-bold text-[#6ffbbe]">+₹{(roiAcreage * 2450).toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FIND BUYERS & SELL PRODUCE */}
      {activeMarketTab === 'buyers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-black text-3xl text-[#002117]">Find Buyers</h1>
              <p className="text-xs text-[#6c7a71]">Connect with verified processors, wholesalers, and distributors seeking agricultural produce.</p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-[#006c49] text-white text-xs font-bold">
              + List Produce to Sell
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {buyersList.map((b) => (
              <div key={b.id} className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-[#006c49] px-2.5 py-1 rounded-full">
                      {b.type}
                    </span>
                    <span className="text-xs text-[#6c7a71] font-semibold">{b.distance}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display font-bold text-lg text-[#002117]">{b.name}</h3>
                      {b.verified && <ShieldCheck className="w-4 h-4 text-[#006c49]" />}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#dcfce7]/40 text-xs space-y-1">
                    <p className="text-[#6c7a71]">Required Crop: <strong className="text-[#002117]">{b.requiredCrop}</strong></p>
                    <p className="text-[#6c7a71]">Target Offer: <strong className="text-[#006c49]">{b.targetPrice}</strong></p>
                    <p className="text-[#6c7a71]">Monthly Volume: <strong className="text-[#002117]">{b.neededQty}</strong></p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#006c49]/10">
                  <button className="flex-1 py-2.5 rounded-xl bg-[#dcfce7] text-[#006c49] text-xs font-bold hover:bg-[#006c49] hover:text-white transition-all">
                    View Profile
                  </button>
                  <button className="flex-1 py-2.5 rounded-xl bg-[#006c49] text-white text-xs font-bold shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
