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
  CheckCircle2,
  PhoneCall,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  FileText,
  Sparkles
} from 'lucide-react';

export default function ExpertConsultation() {
  const [selectedCategory, setSelectedCategory] = useState('All Experts');
  const [selectedExpert, setSelectedExpert] = useState('Dr. Arvind Sharma');
  const [selectedDate, setSelectedDate] = useState('25');
  const [selectedTime, setSelectedTime] = useState('09:00 AM');
  const [bookingConfirmed, setBookingConfirmed] = useState('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const categories = ['All Experts', 'Soil Science', 'Pest Management', 'Irrigation Systems', 'Agronomy', 'Organic Farming'];

  const experts = [
    {
      id: 1,
      name: 'Dr. Arvind Sharma',
      specialty: 'Soil Science & Agronomy',
      rating: '4.9 ★ (128 Reviews)',
      experience: '15+ Years Exp',
      img: '/assets/agri_expert_portrait.jpg',
      verified: true
    },
    {
      id: 2,
      name: 'Dr. Sunita Rao',
      specialty: 'Pest Management',
      rating: '4.8 ★ (95 Reviews)',
      experience: '8+ Years Exp',
      img: '/assets/agri_expert_portrait.jpg',
      verified: true
    },
    {
      id: 3,
      name: 'Mr. Vikram Singh',
      specialty: 'Irrigation Systems',
      rating: '4.7 ★ (54 Reviews)',
      experience: '22+ Years Exp',
      img: '/assets/agri_expert_portrait.jpg',
      verified: true
    },
    {
      id: 4,
      name: 'Dr. Meera Patel',
      specialty: 'Organic Certification',
      rating: '5.0 ★ (41 Reviews)',
      experience: '6+ Years Exp',
      img: '/assets/agri_expert_portrait.jpg',
      verified: true
    }
  ];

  const handleBooking = () => {
    setBookingConfirmed(`✅ Video consultation booked with ${selectedExpert} for Aug ${selectedDate} at ${selectedTime}! Joining live session preview now...`);
    setIsVideoModalOpen(true);
  };

  return (
    <div className="space-y-8 py-2 w-full px-4 sm:px-6 animate-in fade-in">
      
      {/* Toast Notification */}
      {bookingConfirmed && (
        <div className="p-4 rounded-2xl bg-[#006c49] text-white font-bold text-xs flex items-center justify-between shadow-xl animate-in fade-in">
          <span>{bookingConfirmed}</span>
          <button onClick={() => setBookingConfirmed('')} className="p-1 text-emerald-200 hover:text-white">✕</button>
        </div>
      )}

      {/* HERO HEADER CARD */}
      <div className="rounded-3xl p-8 bg-white border border-emerald-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#006c49] text-xs font-bold border border-emerald-200">
              <PhoneCall className="w-3.5 h-3.5 text-[#006c49]" />
              <span>1-ON-1 EXPERT CONSULTATION HUB</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">
              Agricultural Expert Consultations
            </h1>
            <p className="text-xs sm:text-sm text-[#3c4a42] font-medium leading-relaxed max-w-xl">
              Connect via 1-on-1 HD video call with top ICAR &amp; PAU certified soil agronomists, pest control experts, and irrigation specialists.
            </p>
          </div>

          {/* 3 Quick Service Cards */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-3">
            <div 
              onClick={() => setIsVideoModalOpen(true)}
              className="p-3.5 rounded-2xl bg-emerald-50/60 text-center space-y-1 border border-emerald-100 shadow-sm cursor-pointer hover:bg-emerald-100 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-white text-[#006c49] flex items-center justify-center mx-auto shadow-sm">
                <Video className="w-4 h-4" />
              </div>
              <p className="text-[9px] font-extrabold uppercase text-[#6c7a71]">1-ON-1</p>
              <p className="text-xs font-bold text-[#002117]">HD Video Calls</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/60 text-center space-y-1 border border-blue-100 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-white text-[#0284c7] flex items-center justify-center mx-auto shadow-sm">
                <FlaskConical className="w-4 h-4" />
              </div>
              <p className="text-[9px] font-extrabold uppercase text-[#6c7a71]">ANALYSIS</p>
              <p className="text-xs font-bold text-[#002117]">Soil Reports</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 text-center space-y-1 border border-amber-100 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-white text-amber-700 flex items-center justify-center mx-auto shadow-sm">
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
          <div className="rounded-3xl p-5 bg-white border border-emerald-100 shadow-sm space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-[#6c7a71] absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search by expert name, specialty, or crop issue..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl text-xs font-semibold bg-emerald-50/40 text-[#002117] placeholder-[#6c7a71] border border-emerald-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006c49]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#006c49] text-white shadow-md'
                      : 'bg-emerald-50/60 text-[#006c49] border border-emerald-200/60 hover:bg-emerald-100'
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
                  selectedExpert === exp.name ? 'border-2 border-[#006c49] ring-2 ring-[#006c49]/10' : 'border-emerald-100'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={exp.img} alt={exp.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-[#006c49] shadow-sm" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-display font-black text-base text-[#002117]">{exp.name}</h3>
                        {exp.verified && (
                          <span className="text-[9px] font-extrabold uppercase bg-emerald-100 text-[#006c49] px-2 py-0.5 rounded-full border border-emerald-200">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#6c7a71] font-semibold">{exp.specialty}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-emerald-50/60 text-xs">
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

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedExpert(exp.name)}
                    className="flex-1 py-3 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Select Expert</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedExpert(exp.name);
                      setIsVideoModalOpen(true);
                    }}
                    className="p-3 rounded-2xl bg-emerald-100 text-[#006c49] border border-emerald-200 hover:bg-[#006c49] hover:text-white transition-all shadow-sm"
                    title="Start Instant Video Call"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: SCHEDULE & BOOKING PANEL */}
        <div className="lg:col-span-4">
          <div className="rounded-3xl p-7 bg-white border border-emerald-100 shadow-sm space-y-6">
            
            <div className="space-y-1 border-b border-emerald-100 pb-4">
              <span className="text-[9px] font-extrabold uppercase text-[#006c49] tracking-wider">
                📍 SCHEDULE A VIDEO SESSION
              </span>
              <h2 className="font-display font-black text-xl text-[#002117]">{selectedExpert}</h2>
              <p className="text-xs text-[#6c7a71] font-medium">Certified Soil &amp; Crop Agronomist</p>
            </div>

            {/* Select Date Calendar */}
            <div className="space-y-3">
              <h3 className="font-display font-extrabold text-xs uppercase text-[#002117]">Select Consultation Date</h3>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-extrabold text-[#6c7a71]">
                <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#002117]">
                {['24', '25', '26', '27', '28', '29', '30'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`p-2.5 rounded-xl transition-all ${
                      selectedDate === d ? 'bg-[#006c49] text-white shadow-md' : 'hover:bg-emerald-50 text-[#002117]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Times */}
            <div className="space-y-3">
              <h3 className="font-display font-extrabold text-xs uppercase text-[#002117]">Available Time Slots</h3>
              <div className="grid grid-cols-2 gap-2">
                {['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                      selectedTime === t ? 'bg-[#006c49] text-white shadow-md' : 'bg-emerald-50/70 text-[#006c49] border border-emerald-200/60'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Consultation Type */}
            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-xs uppercase text-[#002117]">Consultation Medium</h3>
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center gap-2 text-xs font-extrabold text-[#006c49]">
                <Video className="w-4 h-4 text-[#006c49]" />
                <span>HD Video Call Session (30 Mins)</span>
              </div>
            </div>

            <button 
              onClick={handleBooking}
              className="w-full py-4 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-2"
            >
              <span>CONFIRM BOOKING &amp; JOIN CALL →</span>
            </button>

            <p className="text-[10px] text-center text-[#6c7a71] font-semibold">Free cancellation up to 2 hours before session</p>

          </div>
        </div>

      </div>

      {/* LIVE HD VIDEO CALL SIMULATION MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#002117] rounded-3xl max-w-3xl w-full p-6 space-y-6 shadow-2xl border border-emerald-500/30 text-white animate-in fade-in relative overflow-hidden">
            
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3 relative z-10">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <h3 className="font-display font-black text-lg text-white">Live Video Consultation</h3>
                  <p className="text-xs text-emerald-300 font-semibold">{selectedExpert} • ICAR Soil Specialist</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold bg-emerald-950 px-3 py-1 rounded-full border border-emerald-700">
                00:04:12 HD 1080p
              </span>
            </div>

            {/* Main Video Stream Container */}
            <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-emerald-800 bg-black flex items-center justify-center">
              <img src="/assets/agri_expert_portrait.jpg" alt="Agronomist Video" className="w-full h-full object-cover opacity-90" />
              
              {/* Picture-in-Picture Farmer Camera */}
              <div className="absolute bottom-4 right-4 w-32 h-24 rounded-xl overflow-hidden border-2 border-emerald-400 bg-emerald-950 shadow-xl">
                {!isVideoOff ? (
                  <img src="/assets/smart_farm_aerial.jpg" alt="Farmer Camera" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 font-bold">Cam Off</div>
                )}
              </div>

              {/* Live Subtitle Transcript Banner */}
              <div className="absolute inset-x-4 bottom-4 p-3 rounded-2xl bg-black/70 backdrop-blur-sm border border-white/20 text-xs font-semibold text-emerald-200">
                <span className="font-black text-white">{selectedExpert}:</span> "Applying 25kg Urea now following the rain will maximize your tiller survival rate."
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full font-bold transition-all shadow-md ${
                  isMuted ? 'bg-rose-600 text-white' : 'bg-emerald-900 text-emerald-200 hover:bg-emerald-800'
                }`}
                title="Mute Microphone"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-4 rounded-full font-bold transition-all shadow-md ${
                  isVideoOff ? 'bg-rose-600 text-white' : 'bg-emerald-900 text-emerald-200 hover:bg-emerald-800'
                }`}
                title="Toggle Camera"
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>

              <button
                onClick={() => alert("Sharing Soil Test NPK Report with Dr. Arvind Sharma...")}
                className="px-5 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-emerald-500 transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Share Soil Report</span>
              </button>

              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-4 rounded-full bg-rose-600 text-white font-bold hover:bg-rose-700 transition-all shadow-md"
                title="End Consultation Call"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
