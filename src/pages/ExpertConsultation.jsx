import React, { useState } from 'react';
import { 
  Users, 
  Video, 
  FlaskConical, 
  Sprout, 
  Search, 
  Star, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function ExpertConsultation() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExpert, setSelectedExpert] = useState('Dr. Arvind Sharma');
  const [selectedDate, setSelectedDate] = useState('19');
  const [selectedTime, setSelectedTime] = useState('09:00 AM');

  const categories = ['All Experts', 'Soil Science', 'Pest Management', 'Irrigation', 'Agronomy', 'Organic Farming'];

  const experts = [
    {
      id: 1,
      name: 'Dr. Arvind Sharma',
      specialty: 'Soil Science & Agronomy',
      rating: '4.9 (128)',
      experience: '15+ Years',
      img: '/assets/agri_expert_portrait.jpg',
      verified: true
    },
    {
      id: 2,
      name: 'Dr. Sunita Rao',
      specialty: 'Pest Management',
      rating: '4.8 (95)',
      experience: '8+ Years',
      img: '/assets/agri_expert_portrait.jpg',
      verified: true
    },
    {
      id: 3,
      name: 'Mr. Vikram Singh',
      specialty: 'Irrigation Systems',
      rating: '4.7 (54)',
      experience: '22+ Years',
      img: '/assets/agri_expert_portrait.jpg',
      verified: true
    },
    {
      id: 4,
      name: 'Dr. Meera Patel',
      specialty: 'Organic Certification',
      rating: '5.0 (41)',
      experience: '6+ Years',
      img: '/assets/agri_expert_portrait.jpg',
      verified: true
    }
  ];

  return (
    <div className="space-y-8 py-2 w-full">
      
      {/* HERO HEADER CARD (EXACT MATCH TO SCREENSHOT 1) */}
      <div className="rounded-3xl p-8 bg-[#dcfce7] border border-[#006c49]/15 shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-7 space-y-3">
            <h1 className="font-display font-black text-4xl sm:text-5xl text-[#002117]">
              Expert Consultation
            </h1>
            <p className="text-xs sm:text-sm text-[#3c4a42] font-medium leading-relaxed max-w-xl">
              Connect with leading agricultural specialists to optimize your yield, resolve pest issues, and future-proof your farm.
            </p>
          </div>

          {/* 3 Quick Service Cards */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-white text-center space-y-1 border border-[#006c49]/10 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#006c49] flex items-center justify-center mx-auto">
                <Video className="w-4 h-4" />
              </div>
              <p className="text-[9px] font-extrabold uppercase text-[#6c7a71]">1-ON-1</p>
              <p className="text-xs font-bold text-[#002117]">Video Sessions</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white text-center space-y-1 border border-[#006c49]/10 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#0284c7] flex items-center justify-center mx-auto">
                <FlaskConical className="w-4 h-4" />
              </div>
              <p className="text-[9px] font-extrabold uppercase text-[#6c7a71]">ANALYSIS</p>
              <p className="text-xs font-bold text-[#002117]">Soil Reports</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white text-center space-y-1 border border-[#006c49]/10 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <Sprout className="w-4 h-4" />
              </div>
              <p className="text-[9px] font-extrabold uppercase text-[#6c7a71]">CUSTOM</p>
              <p className="text-xs font-bold text-[#002117]">Crop Plans</p>
            </div>
          </div>

        </div>
      </div>

      {/* MAIN CONTENT GRID (2 COLUMNS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: SEARCH, CATEGORIES & EXPERT CARDS */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Search & Category Pills */}
          <div className="rounded-3xl p-5 bg-white border border-[#006c49]/15 shadow-sm space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-[#6c7a71] absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search by expert name, specialty, or crop type..."
                className="w-full pl-10 pr-4 py-3 rounded-full text-xs font-semibold bg-[#dcfce7]/40 text-[#002117] placeholder-[#6c7a71] border border-[#006c49]/20 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c49]"
              />
            </div>

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

          {/* 2-Column Expert Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {experts.map((exp) => (
              <div 
                key={exp.id}
                onClick={() => setSelectedExpert(exp.name)}
                className={`rounded-3xl p-6 bg-white border transition-all cursor-pointer space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md ${
                  selectedExpert === exp.name ? 'border-2 border-[#006c49]' : 'border-[#006c49]/15'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={exp.img} alt={exp.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#006c49]" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-display font-bold text-base text-[#002117]">{exp.name}</h3>
                        {exp.verified && (
                          <span className="text-[9px] font-extrabold uppercase bg-emerald-100 text-[#006c49] px-2 py-0.5 rounded-full">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#6c7a71] font-semibold">{exp.specialty}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#dcfce7]/40 text-xs">
                    <div>
                      <p className="text-[9px] text-[#6c7a71] uppercase font-bold">RATING</p>
                      <p className="font-bold text-[#002117]">⭐ {exp.rating}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-[#6c7a71] uppercase font-bold">EXPERIENCE</p>
                      <p className="font-bold text-[#002117]">{exp.experience}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 rounded-2xl bg-[#bbf7d0] text-[#006c49] text-xs font-extrabold shadow-sm hover:bg-[#86efac] transition-all flex items-center justify-center gap-2">
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: SCHEDULE & BOOKING PANEL (EXACT MATCH TO SCREENSHOT 1) */}
        <div className="lg:col-span-4">
          <div className="rounded-3xl p-7 bg-white border border-[#006c49]/15 shadow-sm space-y-6">
            
            <div className="space-y-1">
              <span className="text-[9px] font-extrabold uppercase text-[#006c49] tracking-wider">
                📍 SCHEDULE A SESSION
              </span>
              <h2 className="font-display font-extrabold text-xl text-[#002117]">{selectedExpert}</h2>
              <p className="text-xs text-[#6c7a71]">Soil Science & Agronomy</p>
            </div>

            {/* Select Date Calendar */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-xs uppercase text-[#002117]">Select Date</h3>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#6c7a71]">
                <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#002117]">
                <span className="p-2">5</span><span className="p-2">6</span><span className="p-2">7</span><span className="p-2">8</span><span className="p-2">9</span><span className="p-2">10</span><span className="p-2">11</span>
                <span className="p-2">12</span><span className="p-2">13</span><span className="p-2">14</span><span className="p-2">15</span><span className="p-2">16</span><span className="p-2">17</span><span className="p-2">18</span>
                {['19', '20', '21', '26', '27', '28'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`p-2 rounded-xl transition-all ${
                      selectedDate === d ? 'bg-[#006c49] text-white shadow' : 'hover:bg-[#dcfce7]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Times */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-xs uppercase text-[#002117]">Available Times</h3>
              <div className="grid grid-cols-2 gap-2">
                {['09:00 AM', '02:00 PM'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                      selectedTime === t ? 'bg-[#006c49] text-white shadow' : 'bg-[#dcfce7]/60 text-[#006c49]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Consultation Type */}
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xs uppercase text-[#002117]">Consultation Type</h3>
              <div className="p-3 rounded-2xl bg-[#dcfce7] border border-[#006c49]/20 flex items-center justify-center gap-2 text-xs font-bold text-[#006c49]">
                <Video className="w-4 h-4" />
                <span>Video Call Session</span>
              </div>
            </div>

            <button 
              onClick={() => alert(`Confirmed booking with ${selectedExpert} for Aug ${selectedDate} at ${selectedTime}!`)}
              className="w-full py-4 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all"
            >
              Confirm Booking →
            </button>

            <p className="text-[10px] text-center text-[#6c7a71] font-semibold">Free cancellation up to 2 hours before session</p>

          </div>
        </div>

      </div>

    </div>
  );
}
