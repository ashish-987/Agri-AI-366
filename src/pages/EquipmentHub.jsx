import React, { useState } from 'react';
import { Tractor, MapPin, Star, Phone, ShieldCheck, Filter, Search, ArrowRight } from 'lucide-react';

export default function EquipmentHub() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All Equipment', 'Tractors', 'Harvesters', 'Drones', 'Land Levelers'];

  const equipmentList = [
    {
      id: 1,
      title: 'Mahindra 575 DI Tractor (45 HP)',
      owner: 'Gurpreet Singh (Khanna, 8 km away)',
      type: 'Tractors',
      rate: '₹600 / hour',
      rating: '4.9 ★ (42 Rents)',
      features: 'Includes Rotavator Attachment & Experienced Driver',
      img: '/assets/modern_tractor_field.jpg'
    },
    {
      id: 2,
      title: 'Claass Crop Tiger 40 Combine Harvester',
      owner: 'Balwinder Dhillon (Samrala, 14 km away)',
      type: 'Harvesters',
      rate: '₹1,800 / acre',
      rating: '5.0 ★ (68 Rents)',
      features: 'High-speed wheat & paddy harvesting with minimal grain loss',
      img: '/assets/modern_tractor_field.jpg'
    },
    {
      id: 3,
      title: 'Precision Agricultural Spraying Drone (16L)',
      owner: 'Kisan Tech Hub (Ludhiana, 12 km away)',
      type: 'Drones',
      rate: '₹450 / acre',
      rating: '4.8 ★ (110 Rents)',
      features: 'Full field spray in 7 minutes with ultra-fine droplet coverage',
      img: '/assets/smart_farm_aerial.jpg'
    },
    {
      id: 4,
      title: 'Heavy Duty Laser Land Leveler',
      owner: 'Jasvir Kaler (Doraha, 10 km away)',
      type: 'Land Levelers',
      rate: '₹750 / hour',
      rating: '4.7 ★ (28 Rents)',
      features: 'Saves up to 30% irrigation water by precision leveling',
      img: '/assets/modern_tractor_field.jpg'
    }
  ];

  return (
    <div className="space-y-8 py-2 w-full">
      
      {/* HEADER BANNER */}
      <div className="rounded-3xl p-8 bg-[#dcfce7] border border-[#006c49]/15 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#006c49] text-xs font-bold shadow-sm">
            <Tractor className="w-4 h-4 text-[#006c49]" />
            <span>P2P Farm Machinery Leasing</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">
            Equipment Leasing Hub
          </h1>
          <p className="text-xs sm:text-sm text-[#3c4a42] font-medium leading-relaxed">
            Rent high-precision tractors, harvesters, laser levelers, and spraying drones from nearby farmers at hourly rates.
          </p>
        </div>

        <button onClick={() => alert("Listing machinery modal...")} className="px-6 py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex-none">
          + List Your Equipment
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="rounded-3xl p-5 bg-white border border-[#006c49]/15 shadow-sm space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#006c49] text-white shadow'
                  : 'bg-[#dcfce7]/60 text-[#006c49] hover:bg-[#006c49]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* EQUIPMENT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {equipmentList.map((item) => (
          <div key={item.id} className="rounded-3xl bg-white border border-[#006c49]/15 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="h-48 overflow-hidden relative">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase bg-white/90 text-[#006c49] px-3 py-1 rounded-full shadow-sm">
                {item.type}
              </span>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white drop-shadow">
                <h3 className="font-display font-bold text-base">{item.title}</h3>
                <p className="font-display font-black text-lg text-[#6ffbbe]">{item.rate}</p>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-xs text-[#6c7a71] flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#006c49]" />
                  <span>{item.owner}</span>
                </p>
                <div className="p-3 rounded-2xl bg-[#dcfce7]/40 border border-[#006c49]/10 text-xs text-[#3c4a42]">
                  <span className="font-bold text-[#00422b]">Specs:</span> {item.features}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#006c49]/10">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#006c49]" /> Verified Operator
                </span>
                <button 
                  onClick={() => alert(`Booking ${item.title}...`)}
                  className="px-5 py-2.5 rounded-2xl bg-[#bbf7d0] text-[#006c49] text-xs font-extrabold shadow-sm hover:bg-[#86efac] transition-all flex items-center gap-1.5"
                >
                  <span>Book Machinery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
