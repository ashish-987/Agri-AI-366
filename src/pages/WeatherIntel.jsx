import React, { useState } from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  ArrowRight,
  Sun,
  XCircle,
  BarChart3,
  Compass,
  Sprout
} from 'lucide-react';

export default function WeatherIntel({ activePreset }) {
  const [activeForecastTab, setActiveForecastTab] = useState('temp');

  return (
    <div className="space-y-8 py-2 w-full">
      
      {/* TOP METRIC SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT WEATHER CARD: Temperature & Conditions */}
        <div className="lg:col-span-5 rounded-3xl p-7 bg-white border border-[#006c49]/15 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#006c49] uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#006c49]" />
              <span>NORTH FARM SECTOR</span>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-display font-black text-6xl text-[#002117]">24°</span>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-lg font-bold text-[#00422b]">
                  <Droplets className="w-5 h-5 text-[#38bdf8]" />
                  <span>Light Rain</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold text-[#3c4a42] pt-4 border-t border-[#006c49]/10">
            <div className="flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-[#006c49]" />
              <span>12 km/h</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-[#38bdf8]" />
              <span>85% Humidity</span>
            </div>
          </div>
        </div>

        {/* RIGHT WARNING CARD: Critical Action Required */}
        <div className="lg:col-span-7 rounded-3xl p-7 bg-[#fff1f2] border border-red-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold flex-none shadow-md">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="font-display font-extrabold text-2xl text-red-900">
                Critical Action Required
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-red-950 font-medium leading-relaxed">
              Heavy rainfall expected tomorrow. <strong className="text-red-900 font-extrabold">Postpone urea application</strong> and ensure immediate drainage clearance for tomato crops in Sector C.
            </p>
          </div>

          <button className="text-xs font-extrabold text-red-700 uppercase tracking-wider flex items-center gap-1.5 hover:underline pt-2">
            <span>VIEW ACTION PLAN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 4 SENSOR GRID CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* CARD 1: SOIL MOISTURE */}
        <div className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#006c49] tracking-wider">SOIL MOISTURE</span>
            <Sprout className="w-4 h-4 text-[#006c49]" />
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="font-display font-black text-4xl text-[#002117]">62%</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">-3%</span>
            </div>
            <div className="w-full h-2 bg-[#006c49]/15 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#006c49] rounded-full w-[62%]" />
            </div>
          </div>

          <p className="text-[10px] font-bold text-[#6c7a71]">Optimal Range: 55-75%</p>
        </div>

        {/* CARD 2: SPRAYING WINDOW */}
        <div className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#006c49] tracking-wider">SPRAYING WINDOW</span>
            <Wind className="w-4 h-4 text-[#006c49]" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-none">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-black text-xl text-red-900">Poor</span>
                <p className="text-[10px] font-semibold text-[#6c7a71]">High winds & impending rain</p>
              </div>
            </div>
          </div>

          <p className="text-[9px] font-extrabold text-[#006c49] uppercase">NEXT WINDOW: THURSDAY 06:00 AM</p>
        </div>

        {/* CARD 3: EVAPOTRANSPIRATION */}
        <div className="rounded-3xl p-6 bg-white border border-[#006c49]/15 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#006c49] tracking-wider">EVAPOTRANSPIRATION</span>
            <Sun className="w-4 h-4 text-amber-500" />
          </div>

          <div className="space-y-2">
            <span className="font-display font-black text-3xl text-[#002117]">4.2 <span className="text-xs text-[#6c7a71] font-medium">mm/day</span></span>
            <div className="flex items-end gap-1.5 h-8 pt-1">
              <div className="w-full bg-[#006c49]/20 h-4 rounded-t" />
              <div className="w-full bg-[#006c49]/30 h-6 rounded-t" />
              <div className="w-full bg-[#006c49]/20 h-3 rounded-t" />
              <div className="w-full bg-[#006c49] h-8 rounded-t" />
              <div className="w-full bg-[#006c49]/20 h-5 rounded-t" />
            </div>
          </div>

          <div className="h-1" />
        </div>

        {/* CARD 4: SOLAR RAD. WITH GIS SATELLITE MAP */}
        <div className="rounded-3xl overflow-hidden shadow-sm border border-[#006c49]/15 relative bg-[#002117] min-h-[140px] flex flex-col justify-end p-5 text-white">
          <img src="/assets/smart_farm_aerial.jpg" alt="GIS Satellite Map" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="relative z-10 space-y-1">
            <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#6ffbbe]">SOLAR RAD.</p>
            <p className="font-display font-black text-2xl text-white">18.5 <span className="text-xs font-normal">MJ/m²</span></p>
          </div>
        </div>

      </div>

      {/* 7-DAY MICROCLIMATE FORECAST */}
      <div className="rounded-3xl p-8 bg-white border border-[#006c49]/15 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-extrabold text-2xl text-[#002117]">
              7-Day Microclimate Forecast
            </h2>
            <p className="text-xs text-[#6c7a71] font-medium">
              Hyper-local predictions for precision farming
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#006c49]/10 p-1.5 rounded-full">
            <button
              onClick={() => setActiveForecastTab('temp')}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                activeForecastTab === 'temp' ? 'bg-[#006c49] text-white shadow' : 'text-[#006c49]'
              }`}
            >
              Temperature
            </button>
            <button
              onClick={() => setActiveForecastTab('rain')}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                activeForecastTab === 'rain' ? 'bg-[#006c49] text-white shadow' : 'text-[#006c49]'
              }`}
            >
              Rainfall
            </button>
            <button
              onClick={() => setActiveForecastTab('wind')}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                activeForecastTab === 'wind' ? 'bg-[#006c49] text-white shadow' : 'text-[#006c49]'
              }`}
            >
              Wind
            </button>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex justify-between text-xs text-[#6c7a71] font-extrabold px-2">
            <span>40°</span>
            <span>30°</span>
            <span>20°</span>
            <span>10°</span>
          </div>

          <div className="h-44 w-full bg-gradient-to-b from-[#fef3c7]/60 to-white rounded-2xl border border-[#006c49]/10 p-4 relative flex items-center justify-between px-6">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={day} className="flex flex-col items-center justify-between h-full z-10">
                <div className="w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#0284c7] border-2 border-white" />
                <span className="text-xs font-bold text-[#002117]">{day}</span>
              </div>
            ))}

            <div className="absolute inset-x-8 top-12 h-1 bg-amber-400 rounded-full opacity-80" />
            <div className="absolute inset-x-8 bottom-12 h-0.5 bg-[#0284c7] border-t-2 border-dashed border-[#0284c7]" />
          </div>
        </div>
      </div>

    </div>
  );
}
