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
  Calculator,
  AlertCircle
} from 'lucide-react';

export default function Marketplace() {
  const [activeMarketTab, setActiveMarketTab] = useState('explorer');
  
  // Market Explorer Filters State
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [searchQuery, setSearchQuery] = useState('');
  const [alertSuccess, setAlertSuccess] = useState('');

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

  // List Produce Modal State
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [newProduce, setNewProduce] = useState({
    cropName: 'Tomato (Hybrid)',
    quantity: '100',
    askingPrice: '2450',
    harvestDate: '2026-08-25',
    location: 'Lucknow, UP'
  });
  const [userListings, setUserListings] = useState([]);
  const [listingSuccess, setListingSuccess] = useState('');

  // Contact Buyer Modal State
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [contactMessageSent, setContactMessageSent] = useState(false);

  // Recalculate Best Market
  const handleRecalculate = (e) => {
    e.preventDefault();
    const qtyNum = Number(quantity) || 50;
    let basePrice = 2450;
    if (commodity.includes('Wheat')) basePrice = 2250;
    if (commodity.includes('Soybean')) basePrice = 4850;

    const gross = qtyNum * basePrice;
    const trans = Math.round(qtyNum * 120);
    const net = gross - trans;

    setCalcResult({
      bestMandi: `${selectedState !== 'All States' ? selectedState : 'Lucknow Regional'} Mandi`,
      score: Math.floor(Math.random() * 8) + 91,
      distance: '42 km away',
      transportTime: '1.1 hrs transport',
      expectedPrice: `₹${basePrice.toLocaleString('en-IN')} / qtl`,
      grossRevenue: `₹${gross.toLocaleString('en-IN')}`,
      transportCost: `-₹${trans.toLocaleString('en-IN')}`,
      netRevenue: `₹${net.toLocaleString('en-IN')}`
    });
  };

  // Mock Live Mandi Explorer Data across 366 Districts
  const mandiExplorerData = [
    {
      id: 1,
      mandiName: 'Lucknow Central Mandi',
      district: 'Lucknow',
      state: 'Uttar Pradesh',
      crop: 'Tomato (Hybrid)',
      minPrice: 2200,
      maxPrice: 2600,
      modalPrice: 2450,
      arrivals: '4,850 Quintals',
      trend: '+4.2%',
      trendType: 'up',
      aiAdvice: 'SELL TODAY',
      adviceBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      lastUpdated: '10 mins ago'
    },
    {
      id: 2,
      mandiName: 'Azadpur APMC Mandi',
      district: 'North Delhi',
      state: 'Delhi',
      crop: 'Tomato (Hybrid)',
      minPrice: 2400,
      maxPrice: 2850,
      modalPrice: 2680,
      arrivals: '12,400 Quintals',
      trend: '+6.8%',
      trendType: 'up',
      aiAdvice: 'HIGHEST PRICE',
      adviceBg: 'bg-blue-100 text-blue-800 border-blue-300',
      lastUpdated: '5 mins ago'
    },
    {
      id: 3,
      mandiName: 'Kanpur Grain Mandi',
      district: 'Kanpur Nagar',
      state: 'Uttar Pradesh',
      crop: 'Sharbati Wheat',
      minPrice: 2150,
      maxPrice: 2380,
      modalPrice: 2310,
      arrivals: '8,200 Quintals',
      trend: '+2.1%',
      trendType: 'up',
      aiAdvice: 'HOLD 3 DAYS',
      adviceBg: 'bg-amber-100 text-amber-800 border-amber-300',
      lastUpdated: '15 mins ago'
    },
    {
      id: 4,
      mandiName: 'Nashik APMC Market',
      district: 'Nashik',
      state: 'Maharashtra',
      crop: 'Red Onion (Grade A)',
      minPrice: 1800,
      maxPrice: 2100,
      modalPrice: 1980,
      arrivals: '15,600 Quintals',
      trend: '-1.2%',
      trendType: 'down',
      aiAdvice: 'STABLE DEMAND',
      adviceBg: 'bg-gray-100 text-gray-800 border-gray-300',
      lastUpdated: '22 mins ago'
    },
    {
      id: 5,
      mandiName: 'Ludhiana Grain Hub',
      district: 'Ludhiana',
      state: 'Punjab',
      crop: 'Sharbati Wheat',
      minPrice: 2280,
      maxPrice: 2520,
      modalPrice: 2420,
      arrivals: '9,100 Quintals',
      trend: '+3.5%',
      trendType: 'up',
      aiAdvice: 'SELL TODAY',
      adviceBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      lastUpdated: '8 mins ago'
    },
    {
      id: 6,
      mandiName: 'Indore APMC Yard',
      district: 'Indore',
      state: 'Madhya Pradesh',
      crop: 'Yellow Soybean',
      minPrice: 4600,
      maxPrice: 5100,
      modalPrice: 4890,
      arrivals: '6,400 Quintals',
      trend: '-1.1%',
      trendType: 'down',
      aiAdvice: 'HOLD FOR RALLY',
      adviceBg: 'bg-purple-100 text-purple-800 border-purple-300',
      lastUpdated: '12 mins ago'
    }
  ];

  // Filtered Mandi List
  const filteredMandis = mandiExplorerData.filter((mandi) => {
    const matchState = selectedState === 'All States' || mandi.state === selectedState;
    const matchDistrict = selectedDistrict === 'All Districts' || mandi.district === selectedDistrict;
    const matchCrop = selectedCrop === 'All Crops' || mandi.crop.toLowerCase().includes(selectedCrop.toLowerCase().split(' ')[0]);
    const matchSearch = searchQuery === '' || 
      mandi.mandiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mandi.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mandi.crop.toLowerCase().includes(searchQuery.toLowerCase());
    return matchState && matchDistrict && matchCrop && matchSearch;
  });

  const handleSetAlert = (mandiName) => {
    setAlertSuccess(`🔔 AI Price Alert activated for ${mandiName}! You will receive SMS & WhatsApp notifications when prices fluctuate.`);
    setTimeout(() => setAlertSuccess(''), 5000);
  };

  const handleAddProduceSubmit = (e) => {
    e.preventDefault();
    setUserListings([
      ...userListings,
      {
        id: Date.now(),
        ...newProduce,
        status: 'ACTIVE'
      }
    ]);
    setListingSuccess('✅ Crop produce successfully listed on AI Mandi Marketplace! Verified corporate buyers have been notified.');
    setIsListModalOpen(false);
    setTimeout(() => setListingSuccess(''), 6000);
  };

  const buyersList = [
    {
      id: 1,
      name: 'ABC Foods & Agros India',
      type: 'PROCESSOR',
      verified: true,
      distance: '45 km away',
      requiredCrop: 'Tomato (Hybrid)',
      targetPrice: '₹2,480 / qtl',
      neededQty: '15,000 Quintals',
      contactPhone: '+91 98765 43210',
      email: 'procurement@abcfoods.in',
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
      contactPhone: '+91 98111 22233',
      email: 'export@zgreenagros.com',
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
      contactPhone: '+91 99887 76655',
      email: 'buyer@nationalgrocers.in',
      img: '/assets/fresh_mandi_produce.jpg'
    }
  ];

  return (
    <div className="space-y-8 py-2 w-full px-4 sm:px-6">
      
      {/* Toast Notification */}
      {alertSuccess && (
        <div className="p-4 rounded-2xl bg-[#00422b] text-white font-bold text-xs flex items-center justify-between shadow-xl animate-in fade-in">
          <span>{alertSuccess}</span>
          <button onClick={() => setAlertSuccess('')} className="p-1 text-emerald-300 hover:text-white">✕</button>
        </div>
      )}

      {listingSuccess && (
        <div className="p-4 rounded-2xl bg-[#006c49] text-white font-bold text-xs flex items-center justify-between shadow-xl animate-in fade-in">
          <span>{listingSuccess}</span>
          <button onClick={() => setListingSuccess('')} className="p-1 text-emerald-200 hover:text-white">✕</button>
        </div>
      )}

      {/* SUB-NAVIGATION TAB STRIP */}
      <div className="p-2 rounded-3xl bg-white border border-emerald-100 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
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
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-[#006c49] to-[#046a38] text-white shadow-md ring-2 ring-[#006c49]/20 scale-[1.02]'
                  : 'bg-emerald-50/60 text-[#00422b] hover:bg-emerald-100/80 border border-emerald-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-[#006c49]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: MARKET SNAPSHOT */}
      {activeMarketTab === 'snapshot' && (
        <div className="space-y-8 animate-in fade-in">
          
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
                <h3 className="font-display font-black text-3xl text-white">366 <span className="text-xs font-normal">Districts Synced</span></h3>
                <p className="text-[11px] text-[#bbcabf] font-medium">Updating in real-time from state APMC feeds.</p>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-3">
                <h3 className="font-display font-bold text-xs text-[#002117]">Popular Commodity Tags</h3>
                <div className="flex flex-wrap gap-2 text-xs font-bold text-[#006c49]">
                  <button onClick={() => { setSelectedCrop('Tomato (Hybrid)'); setActiveMarketTab('explorer'); }} className="px-3 py-1.5 rounded-xl bg-[#dcfce7] hover:bg-[#006c49] hover:text-white transition-all">🍅 Tomato - UP</button>
                  <button onClick={() => { setSelectedCrop('Sharbati Wheat'); setActiveMarketTab('explorer'); }} className="px-3 py-1.5 rounded-xl bg-[#dcfce7] hover:bg-[#006c49] hover:text-white transition-all">🌾 Wheat - Punjab</button>
                  <button onClick={() => { setSelectedCrop('Red Onion'); setActiveMarketTab('explorer'); }} className="px-3 py-1.5 rounded-xl bg-[#dcfce7] hover:bg-[#006c49] hover:text-white transition-all">🧅 Onion - Nashik</button>
                </div>
              </div>

              <div className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-xs text-[#002117]">Saved Regional Mandis</h3>
                  <button onClick={() => setActiveMarketTab('explorer')} className="text-[10px] font-bold text-[#006c49] uppercase hover:underline">View All</button>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-[#dcfce7]/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#006c49]" />
                      <div>
                        <p className="font-bold text-[#002117]">Lucknow Central Mandi</p>
                        <p className="text-[10px] text-[#6c7a71]">Uttar Pradesh APMC</p>
                      </div>
                    </div>
                    <button onClick={() => setActiveMarketTab('explorer')}><ArrowUpRight className="w-4 h-4 text-[#006c49]" /></button>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#dcfce7]/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#006c49]" />
                      <div>
                        <p className="font-bold text-[#002117]">Azadpur Mandi</p>
                        <p className="text-[10px] text-[#6c7a71]">North Delhi APMC</p>
                      </div>
                    </div>
                    <button onClick={() => setActiveMarketTab('explorer')}><ArrowUpRight className="w-4 h-4 text-[#006c49]" /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 rounded-3xl p-7 bg-white border border-[#006c49]/15 shadow-sm space-y-6">
              <div>
                <h2 className="font-display font-extrabold text-2xl text-[#002117]">Recommended Regional Mandis</h2>
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
                      <td className="py-4 px-2 text-right"><button onClick={() => setActiveMarketTab('explorer')} className="px-3 py-1.5 rounded-xl bg-[#006c49] text-white text-[11px] font-bold">Explore Mandi</button></td>
                    </tr>
                    <tr>
                      <td className="py-4 px-2 font-bold">Kanpur Nagar (UP)</td>
                      <td className="py-4 px-2 text-[#6c7a71]">82 km</td>
                      <td className="py-4 px-2 font-bold text-[#0284c7]">₹2,310</td>
                      <td className="py-4 px-2"><span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">Med Margin</span></td>
                      <td className="py-4 px-2 text-right"><button onClick={() => setActiveMarketTab('explorer')} className="px-3 py-1.5 rounded-xl bg-[#006c49] text-white text-[11px] font-bold">Explore Mandi</button></td>
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
        <div className="space-y-8 animate-in fade-in">
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
                  <span>RECALCULATE OPTIMAL MANDI</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl p-8 bg-white border-2 border-[#006c49] shadow-md space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                      🏆 TOP AI MANDI RECOMMENDATION
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

      {/* TAB 3: MARKET PRICE EXPLORER (FULLY IMPLEMENTED & INTERACTIVE) */}
      {activeMarketTab === 'explorer' && (
        <div className="space-y-8 animate-in fade-in">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006c49]/15 text-[#006c49] text-[11px] font-extrabold uppercase">
                <MapPin className="w-3.5 h-3.5" />
                <span>366 DISTRICT MANDI NETWORK</span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">
                Market Price Explorer
              </h1>
              <p className="text-xs sm:text-sm text-[#3c4a42] font-medium">
                Live mandi rates, arrival volumes, and 14-day AI price trajectory forecasts across 366 districts in India.
              </p>
            </div>

            <button 
              onClick={() => setIsListModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold shadow-md hover:bg-[#046a38] transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>SELL PRODUCE AT TOP MANDI PRICE</span>
            </button>
          </div>

          {/* INTERACTIVE FILTERS STRIP */}
          <div className="p-6 rounded-3xl bg-white border border-[#006c49]/20 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-[#006c49] flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filter APMC Mandis by Region & Crop
              </span>
              <button 
                onClick={() => {
                  setSelectedState('All States');
                  setSelectedDistrict('All Districts');
                  setSelectedCrop('All Crops');
                  setSearchQuery('');
                }}
                className="text-[11px] font-bold text-red-600 hover:underline"
              >
                Reset Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold text-[#00422b]">
              <div>
                <label className="block text-[10px] text-[#6c7a71] uppercase mb-1">SELECT STATE</label>
                <select 
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-[#dcfce7]/60 border border-[#006c49]/20 text-[#002117] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                >
                  <option>All States</option>
                  <option>Uttar Pradesh</option>
                  <option>Delhi</option>
                  <option>Punjab</option>
                  <option>Maharashtra</option>
                  <option>Madhya Pradesh</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-[#6c7a71] uppercase mb-1">SELECT DISTRICT</label>
                <select 
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-[#dcfce7]/60 border border-[#006c49]/20 text-[#002117] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                >
                  <option>All Districts</option>
                  <option>Lucknow</option>
                  <option>Kanpur Nagar</option>
                  <option>North Delhi</option>
                  <option>Ludhiana</option>
                  <option>Nashik</option>
                  <option>Indore</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-[#6c7a71] uppercase mb-1">SELECT CROP</label>
                <select 
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-[#dcfce7]/60 border border-[#006c49]/20 text-[#002117] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                >
                  <option>All Crops</option>
                  <option>Tomato (Hybrid)</option>
                  <option>Sharbati Wheat</option>
                  <option>Red Onion (Grade A)</option>
                  <option>Yellow Soybean</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-[#6c7a71] uppercase mb-1">SEARCH MANDI NAME</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-[#006c49]/60 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search mandi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 rounded-2xl bg-[#dcfce7]/60 border border-[#006c49]/20 text-[#002117] placeholder-[#6c7a71] focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI PRICE FORECAST TRAJECTORY CARD */}
          <div className="p-7 rounded-3xl bg-[#002117] text-white border border-[#10b981]/30 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/20 text-[#6ffbbe] text-[10px] font-extrabold uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>94.2% AI ACCURACY MODEL</span>
                </div>
                <h3 className="font-display font-black text-2xl text-white">
                  14-Day AI Mandi Price Trajectory Forecast
                </h3>
                <p className="text-xs text-[#bbcabf]">
                  Predictive machine-learning trend based on historical arrivals, weather radar, and regional processor demand.
                </p>
              </div>

              <div className="px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-center flex-none">
                <p className="text-[10px] text-[#bbcabf] font-bold uppercase">PREDICTED PEAK PRICE</p>
                <p className="font-display font-black text-2xl text-[#6ffbbe]">₹2,680 / qtl</p>
                <p className="text-[9px] text-emerald-400 font-bold">Expected in 6 Days (+9.4%)</p>
              </div>
            </div>

            {/* Price Timeline Visualization */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
              {[
                { day: 'Today', price: '₹2,450', change: 'Current', color: 'bg-emerald-500/20 border-emerald-400 text-emerald-300' },
                { day: 'Day 2', price: '₹2,490', change: '+1.6%', color: 'bg-emerald-500/20 border-emerald-400 text-emerald-300' },
                { day: 'Day 4', price: '₹2,560', change: '+4.4%', color: 'bg-emerald-500/20 border-emerald-400 text-emerald-300' },
                { day: 'Day 6 (PEAK)', price: '₹2,680', change: '+9.4%', color: 'bg-[#10b981] border-white text-white font-extrabold scale-105 shadow-md' },
                { day: 'Day 8', price: '₹2,610', change: '+6.5%', color: 'bg-emerald-500/20 border-emerald-400 text-emerald-300' },
                { day: 'Day 11', price: '₹2,520', change: '+2.8%', color: 'bg-amber-500/20 border-amber-400 text-amber-300' },
                { day: 'Day 14', price: '₹2,440', change: '-0.4%', color: 'bg-rose-500/20 border-rose-400 text-rose-300' }
              ].map((item, idx) => (
                <div key={idx} className={`p-3.5 rounded-2xl border text-center transition-transform ${item.color}`}>
                  <p className="text-[10px] font-extrabold uppercase opacity-90">{item.day}</p>
                  <p className="font-display font-black text-sm my-1">{item.price}</p>
                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-black/20">
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* LIVE MANDI EXPLORER CARDS GRID */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-black text-2xl text-[#002117]">
                Live APMC Mandi Rates ({filteredMandis.length} Mandis Found)
              </h2>
              <span className="text-xs font-semibold text-[#6c7a71]">
                Synced with Agmarknet & Kisan Suvidha APIs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMandis.map((mandi) => (
                <div 
                  key={mandi.id}
                  className="rounded-3xl p-6 bg-white border border-[#006c49]/20 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase bg-[#dcfce7] text-[#006c49] px-3 py-1 rounded-full border border-[#006c49]/20">
                        📍 {mandi.district}, {mandi.state}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${mandi.adviceBg}`}>
                        {mandi.aiAdvice}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-xl text-[#002117] group-hover:text-[#006c49] transition-colors">
                        {mandi.mandiName}
                      </h3>
                      <p className="text-xs text-[#6c7a71] font-semibold">Crop: <strong>{mandi.crop}</strong></p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#dcfce7]/30 border border-[#006c49]/10 space-y-2">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-[#6c7a71]">Modal Rate:</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-display font-black text-2xl text-[#006c49]">₹{mandi.modalPrice.toLocaleString('en-IN')}</span>
                          <span className="text-xs text-[#6c7a71]">/qtl</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#3c4a42] border-t border-[#006c49]/10 pt-2 font-medium">
                        <span>Min: <strong>₹{mandi.minPrice}</strong></span>
                        <span>Max: <strong>₹{mandi.maxPrice}</strong></span>
                        <span className="text-emerald-700 font-bold">{mandi.trend}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#6c7a71] font-semibold">
                      <span>Daily Arrival: {mandi.arrivals}</span>
                      <span>Updated: {mandi.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#006c49]/10">
                    <button 
                      onClick={() => handleSetAlert(mandi.mandiName)}
                      className="flex-1 py-2.5 rounded-xl bg-[#dcfce7] text-[#006c49] text-xs font-bold hover:bg-[#006c49] hover:text-white transition-all flex items-center justify-center gap-1.5"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>Set Alert</span>
                    </button>

                    <button 
                      onClick={() => {
                        setCommodity(mandi.crop);
                        setActiveMarketTab('bestMarket');
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-[#006c49] text-white text-xs font-bold shadow-sm hover:bg-[#046a38] transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Optimize</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: FIND BUYERS & SELL PRODUCE */}
      {activeMarketTab === 'buyers' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-black text-3xl text-[#002117]">Find Corporate Buyers & Sell</h1>
              <p className="text-xs text-[#6c7a71]">Connect with verified processors, wholesalers, and distributors seeking agricultural produce.</p>
            </div>
            <button 
              onClick={() => setIsListModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold shadow-md hover:bg-[#046a38] transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ List Produce to Sell</span>
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
                  <button 
                    onClick={() => setSelectedBuyer(b)}
                    className="flex-1 py-2.5 rounded-xl bg-[#dcfce7] text-[#006c49] text-xs font-bold hover:bg-[#006c49] hover:text-white transition-all"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => setSelectedBuyer(b)}
                    className="flex-1 py-2.5 rounded-xl bg-[#006c49] text-white text-xs font-bold shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FARMER ROI CALCULATOR */}
      {activeMarketTab === 'roi' && (
        <div className="rounded-3xl p-8 bg-white border border-[#006c49]/20 shadow-xl space-y-6 animate-in fade-in">
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
                  <p className="text-[#bbcabf]">Pesticide Cost Savings:</p>
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

      {/* LIST PRODUCE MODAL DIALOG */}
      {isListModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#006c49]/30 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#006c49]/15 pb-4">
              <div className="flex items-center gap-2 text-[#006c49]">
                <PlusCircle className="w-6 h-6" />
                <h3 className="font-display font-black text-xl text-[#002117]">List Produce for Buyers</h3>
              </div>
              <button onClick={() => setIsListModalOpen(false)} className="text-gray-400 hover:text-red-500 text-lg font-bold">✕</button>
            </div>

            <form onSubmit={handleAddProduceSubmit} className="space-y-4 text-xs font-bold text-[#00422b]">
              <div>
                <label className="block mb-1 text-[#6c7a71]">CROP NAME</label>
                <input 
                  type="text" 
                  value={newProduce.cropName} 
                  onChange={(e) => setNewProduce({ ...newProduce, cropName: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-[#dcfce7]/60 border border-[#006c49]/20 text-[#002117]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-[#6c7a71]">QUANTITY (QUINTALS)</label>
                  <input 
                    type="number" 
                    value={newProduce.quantity} 
                    onChange={(e) => setNewProduce({ ...newProduce, quantity: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-[#dcfce7]/60 border border-[#006c49]/20 text-[#002117]"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-[#6c7a71]">ASKING PRICE (₹/QTL)</label>
                  <input 
                    type="number" 
                    value={newProduce.askingPrice} 
                    onChange={(e) => setNewProduce({ ...newProduce, askingPrice: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-[#dcfce7]/60 border border-[#006c49]/20 text-[#002117]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-[#6c7a71]">FARM LOCATION / MANDI NEARBY</label>
                <input 
                  type="text" 
                  value={newProduce.location} 
                  onChange={(e) => setNewProduce({ ...newProduce, location: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-[#dcfce7]/60 border border-[#006c49]/20 text-[#002117]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>CONFIRM & POST LISTING</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CONTACT BUYER MODAL DIALOG */}
      {selectedBuyer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#006c49]/30 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#006c49]/15 pb-3">
              <div>
                <span className="text-[9px] font-extrabold uppercase bg-emerald-100 text-[#006c49] px-2 py-0.5 rounded-full">
                  {selectedBuyer.type}
                </span>
                <h3 className="font-display font-black text-xl text-[#002117] mt-1">{selectedBuyer.name}</h3>
              </div>
              <button onClick={() => { setSelectedBuyer(null); setContactMessageSent(false); }} className="text-gray-400 hover:text-red-500 text-lg font-bold">✕</button>
            </div>

            {!contactMessageSent ? (
              <div className="space-y-4 text-xs font-semibold text-[#00422b]">
                <div className="p-4 rounded-2xl bg-[#dcfce7]/40 space-y-2">
                  <p className="text-[#6c7a71]">Verified Phone: <strong className="text-[#002117]">{selectedBuyer.contactPhone}</strong></p>
                  <p className="text-[#6c7a71]">Email: <strong className="text-[#006c49]">{selectedBuyer.email}</strong></p>
                  <p className="text-[#6c7a71]">Target Offer: <strong className="text-[#006c49]">{selectedBuyer.targetPrice}</strong></p>
                </div>

                <div>
                  <label className="block text-[#6c7a71] font-bold mb-1">Your Message / Offer Details:</label>
                  <textarea
                    rows={3}
                    defaultValue={`Hello ${selectedBuyer.name}, I have harvested ${selectedBuyer.requiredCrop} available for immediate sale.`}
                    className="w-full p-3 rounded-2xl bg-[#dcfce7]/40 border border-[#006c49]/20 text-[#002117] focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => setContactMessageSent(true)}
                  className="w-full py-3 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Offer Directly</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#006c49] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg text-[#002117]">Offer Message Sent!</h4>
                <p className="text-xs text-[#6c7a71]">
                  The corporate buyer team has received your offer details and will reach out via phone ({selectedBuyer.contactPhone}) shortly.
                </p>
                <button
                  onClick={() => { setSelectedBuyer(null); setContactMessageSent(false); }}
                  className="px-6 py-2 rounded-xl bg-[#006c49] text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
