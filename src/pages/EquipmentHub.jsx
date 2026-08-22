import React, { useState } from 'react';
import { Tractor, MapPin, Star, Phone, ShieldCheck, Filter, Search, ArrowRight, CheckCircle2, Calendar, Clock, Sparkles, Plus, Upload } from 'lucide-react';

export default function EquipmentHub() {
  const [selectedCategory, setSelectedCategory] = useState('All Equipment');
  const [bookingItem, setBookingItem] = useState(null);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState('');

  const [newEquip, setNewEquip] = useState({
    title: '',
    category: 'Tractors',
    rate: '',
    specs: '',
    location: ''
  });

  const categories = ['All Equipment', 'Tractors', 'Harvesters', 'Drones', 'Land Levelers'];

  const [equipmentList, setEquipmentList] = useState([
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
  ]);

  const filteredEquipment = equipmentList.filter((item) => {
    return selectedCategory === 'All Equipment' || item.type === selectedCategory;
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(`✅ Booking confirmed for ${bookingItem.title}! The equipment operator will contact you shortly to confirm delivery.`);
    setBookingItem(null);
    setTimeout(() => setBookingSuccess(''), 6000);
  };

  const handleCreateListing = (e) => {
    e.preventDefault();
    if (!newEquip.title) return;

    const created = {
      id: Date.now(),
      title: newEquip.title,
      owner: `You (${newEquip.location || 'Ludhiana'}, 0 km away)`,
      type: newEquip.category,
      rate: `${newEquip.rate || '₹650'} / hour`,
      rating: '5.0 ★ (New Listing)',
      features: newEquip.specs || 'Includes verified operator & fuel',
      img: '/assets/modern_tractor_field.jpg'
    };

    setEquipmentList([created, ...equipmentList]);
    setIsListingModalOpen(false);
    setBookingSuccess(`✅ Your machinery "${newEquip.title}" has been listed live on AgriAI 366! Nearby farmers can now book it.`);
    setNewEquip({ title: '', category: 'Tractors', rate: '', specs: '', location: '' });
    setTimeout(() => setBookingSuccess(''), 6000);
  };

  return (
    <div className="space-y-8 py-2 w-full px-4 sm:px-6 animate-in fade-in">
      
      {/* Toast Notification */}
      {bookingSuccess && (
        <div className="p-4 rounded-2xl bg-[#006c49] text-white font-bold text-xs flex items-center justify-between shadow-xl animate-in fade-in">
          <span>{bookingSuccess}</span>
          <button onClick={() => setBookingSuccess('')} className="p-1 text-emerald-200 hover:text-white">✕</button>
        </div>
      )}

      {/* HEADER BANNER */}
      <div className="rounded-3xl p-8 bg-white border border-emerald-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#006c49] text-xs font-bold border border-emerald-200">
            <Tractor className="w-4 h-4 text-[#006c49]" />
            <span>P2P FARM MACHINERY LEASING HUB</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">
            Equipment Leasing Hub
          </h1>
          <p className="text-xs sm:text-sm text-[#3c4a42] font-medium leading-relaxed">
            Rent high-precision tractors, harvesters, laser levelers, and spraying drones from verified nearby farmers at hourly rates.
          </p>
        </div>

        <button 
          onClick={() => setIsListingModalOpen(true)} 
          className="px-6 py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex-none flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ List Your Equipment</span>
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="rounded-3xl p-4 bg-white border border-emerald-100 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#006c49] text-white shadow-md'
                  : 'bg-emerald-50/70 text-[#006c49] border border-emerald-200/60 hover:bg-emerald-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* EQUIPMENT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEquipment.map((item) => (
          <div key={item.id} className="rounded-3xl bg-white border border-emerald-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="h-52 overflow-hidden relative">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase bg-white text-[#006c49] px-3 py-1 rounded-full shadow-md border border-emerald-100">
                {item.type}
              </span>
              <span className="absolute top-3 right-3 text-[10px] font-extrabold bg-[#00422b] text-white px-3 py-1 rounded-full shadow-md">
                {item.rating}
              </span>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white drop-shadow">
                <h3 className="font-display font-black text-lg text-white">{item.title}</h3>
                <p className="font-display font-black text-xl text-[#6ffbbe]">{item.rate}</p>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-xs text-[#6c7a71] flex items-center gap-1.5 font-extrabold">
                  <MapPin className="w-4 h-4 text-[#006c49]" />
                  <span>{item.owner}</span>
                </p>
                <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs text-[#3c4a42]">
                  <span className="font-bold text-[#006c49]">Specs &amp; Operator:</span> {item.features}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-emerald-100">
                <span className="text-xs font-extrabold text-[#006c49] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#006c49]" /> Verified Equipment Owner
                </span>
                <button 
                  onClick={() => setBookingItem(item)}
                  className="px-6 py-2.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold shadow-md hover:bg-[#046a38] transition-all flex items-center gap-2"
                >
                  <span>Book Machinery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BOOKING MODAL DIALOG */}
      {bookingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-emerald-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div>
                <span className="text-[9px] font-extrabold uppercase bg-emerald-100 text-[#006c49] px-2.5 py-1 rounded-full">
                  {bookingItem.type}
                </span>
                <h3 className="font-display font-black text-xl text-[#002117] mt-1">{bookingItem.title}</h3>
              </div>
              <button onClick={() => setBookingItem(null)} className="text-gray-400 hover:text-red-500 text-lg font-bold">✕</button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs font-bold text-[#00422b]">
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 space-y-1">
                <p className="text-[#6c7a71]">Owner: <strong className="text-[#002117]">{bookingItem.owner}</strong></p>
                <p className="text-[#6c7a71]">Rental Rate: <strong className="text-[#006c49]">{bookingItem.rate}</strong></p>
              </div>

              <div>
                <label className="block text-[#6c7a71] mb-1">SELECT BOOKING DATE</label>
                <input 
                  type="date" 
                  defaultValue="2026-08-25" 
                  className="w-full p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117]"
                  required 
                />
              </div>

              <div>
                <label className="block text-[#6c7a71] mb-1">RENTAL DURATION (HOURS / ACRES)</label>
                <input 
                  type="number" 
                  defaultValue={4} 
                  className="w-full p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117]"
                  required 
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>CONFIRM LEASE BOOKING</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CREATE MACHINERY LISTING MODAL DIALOG */}
      {isListingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-emerald-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div>
                <span className="text-[9px] font-extrabold uppercase bg-emerald-100 text-[#006c49] px-2.5 py-1 rounded-full">
                  FARM MACHINERY P2P
                </span>
                <h3 className="font-display font-black text-2xl text-[#002117] mt-1">List Your Equipment for Rent</h3>
              </div>
              <button onClick={() => setIsListingModalOpen(false)} className="text-gray-400 hover:text-red-500 text-lg font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4 text-xs font-bold text-[#00422b]">
              <div>
                <label className="block text-[#6c7a71] mb-1">EQUIPMENT NAME / MODEL</label>
                <input 
                  type="text"
                  placeholder="e.g. Sonalika 60 RX Tractor (60 HP)"
                  value={newEquip.title}
                  onChange={(e) => setNewEquip({ ...newEquip, title: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117]"
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#6c7a71] mb-1">CATEGORY</label>
                  <select
                    value={newEquip.category}
                    onChange={(e) => setNewEquip({ ...newEquip, category: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117]"
                  >
                    <option value="Tractors">Tractors</option>
                    <option value="Harvesters">Harvesters</option>
                    <option value="Drones">Drones</option>
                    <option value="Land Levelers">Land Levelers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#6c7a71] mb-1">RENTAL RATE (₹)</label>
                  <input 
                    type="text"
                    placeholder="e.g. ₹650 / hour"
                    value={newEquip.rate}
                    onChange={(e) => setNewEquip({ ...newEquip, rate: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117]"
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#6c7a71] mb-1">LOCATION / DISTRICT</label>
                <input 
                  type="text"
                  placeholder="e.g. Ludhiana, Punjab"
                  value={newEquip.location}
                  onChange={(e) => setNewEquip({ ...newEquip, location: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117]"
                  required 
                />
              </div>

              <div>
                <label className="block text-[#6c7a71] mb-1">SPECIFICATIONS &amp; INCLUDED ATTACHMENTS</label>
                <textarea 
                  placeholder="Describe HP, rotavator attachments, operator experience..."
                  value={newEquip.specs}
                  onChange={(e) => setNewEquip({ ...newEquip, specs: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-[#002117] h-20 resize-none"
                  required 
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>PUBLISH MACHINERY LISTING LIVE</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
