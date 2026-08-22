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
  Sprout,
  CloudRain,
  ShieldAlert,
  Thermometer,
  Zap,
  Calendar,
  Clock,
  Eye,
  Check
} from 'lucide-react';

export default function WeatherIntel() {
  const [activeForecastTab, setActiveForecastTab] = useState('temp');
  const [isActionPlanOpen, setIsActionPlanOpen] = useState(false);
  const [actionPlanDone, setActionPlanDone] = useState(false);

  const forecastData = [
    { day: 'Mon (Today)', icon: CloudRain, maxTemp: '28°', minTemp: '21°', rainProb: '85%', wind: '12 km/h', sprayStatus: 'POOR', sprayBg: 'bg-rose-100 text-rose-800' },
    { day: 'Tue', icon: CloudRain, maxTemp: '26°', minTemp: '20°', rainProb: '90%', wind: '18 km/h', sprayStatus: 'RISK', sprayBg: 'bg-rose-100 text-rose-800' },
    { day: 'Wed', icon: CloudSun, maxTemp: '30°', minTemp: '22°', rainProb: '35%', wind: '10 km/h', sprayStatus: 'MODERATE', sprayBg: 'bg-amber-100 text-amber-800' },
    { day: 'Thu', icon: Sun, maxTemp: '32°', minTemp: '23°', rainProb: '10%', wind: '6 km/h', sprayStatus: 'IDEAL', sprayBg: 'bg-emerald-100 text-emerald-800' },
    { day: 'Fri', icon: Sun, maxTemp: '33°', minTemp: '24°', rainProb: '5%', wind: '8 km/h', sprayStatus: 'IDEAL', sprayBg: 'bg-emerald-100 text-emerald-800' },
    { day: 'Sat', icon: CloudSun, maxTemp: '31°', minTemp: '23°', rainProb: '20%', wind: '9 km/h', sprayStatus: 'GOOD', sprayBg: 'bg-emerald-100 text-emerald-800' },
    { day: 'Sun', icon: CloudRain, maxTemp: '29°', minTemp: '22°', rainProb: '60%', wind: '14 km/h', sprayStatus: 'POOR', sprayBg: 'bg-rose-100 text-rose-800' }
  ];

  return (
    <div className="space-y-8 py-2 w-full px-4 sm:px-6 animate-in fade-in">
      
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#006c49] text-[11px] font-extrabold uppercase tracking-wider border border-emerald-200">
            <Compass className="w-3.5 h-3.5 text-[#006c49]" />
            <span>HYPERLOCAL MICROCLIMATE RADAR</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">
            Weather Intelligence & Spraying Radar
          </h1>
          <p className="text-xs sm:text-sm text-[#3c4a42] font-medium">
            AI-powered microclimate forecasts, evapotranspiration loss telemetry, and optimal pesticide spraying windows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3.5 py-2 rounded-2xl border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Live Doppler Radar Synced</span>
          </span>
        </div>
      </div>

      {/* TOP METRIC SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT WEATHER CARD: Temperature & Conditions */}
        <div className="lg:col-span-5 rounded-3xl p-7 bg-white border border-emerald-100 shadow-sm space-y-6 flex flex-col justify-between hover:shadow-md transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#006c49] uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#006c49]" />
                <span>NORTH FARM SECTOR • PUNJAB</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500">GPS: 30.733° N</span>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <span className="font-display font-black text-6xl sm:text-7xl text-[#002117]">24°C</span>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-lg font-extrabold text-[#00422b]">
                  <CloudRain className="w-6 h-6 text-[#0284c7] animate-bounce" />
                  <span>Light Monsoon Rain</span>
                </div>
                <p className="text-xs text-[#6c7a71] font-semibold">Feels like 26°C • High 28° / Low 21°</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs font-bold text-[#3c4a42] pt-4 border-t border-emerald-100">
            <div className="p-2.5 rounded-2xl bg-emerald-50/50 text-center">
              <p className="text-[9px] text-[#6c7a71] uppercase">WIND SPEED</p>
              <p className="font-extrabold text-[#002117] mt-0.5">12 km/h SE</p>
            </div>
            <div className="p-2.5 rounded-2xl bg-blue-50/50 text-center">
              <p className="text-[9px] text-[#6c7a71] uppercase">HUMIDITY</p>
              <p className="font-extrabold text-[#0284c7] mt-0.5">85%</p>
            </div>
            <div className="p-2.5 rounded-2xl bg-amber-50/50 text-center">
              <p className="text-[9px] text-[#6c7a71] uppercase">UV INDEX</p>
              <p className="font-extrabold text-amber-800 mt-0.5">3 (Low)</p>
            </div>
          </div>
        </div>

        {/* RIGHT WARNING CARD: Critical Action Required */}
        <div className="lg:col-span-7 rounded-3xl p-7 bg-rose-50 border-2 border-rose-200 shadow-sm space-y-4 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold shadow-md">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-extrabold uppercase bg-rose-200 text-rose-900 px-2.5 py-0.5 rounded-full">
                    HIGH PRIORITY WEATHER ALERT
                  </span>
                  <h2 className="font-display font-black text-2xl text-rose-950 mt-0.5">
                    Heavy Monsoon Rainfall Advisory
                  </h2>
                </div>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-white px-3 py-1 rounded-full border border-rose-200">
                Countdown: 14 Hours
              </span>
            </div>

            <p className="text-xs sm:text-sm text-rose-900 font-medium leading-relaxed pt-1">
              Heavy rainfall (&gt;45mm) is forecasted tomorrow morning. <strong className="text-rose-950 font-black">Postpone urea top-dressing</strong> immediately and inspect drainage outlets in Sector C to prevent root rot in tomato crops.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 relative z-10">
            <button 
              onClick={() => setIsActionPlanOpen(true)}
              className="px-5 py-2.5 rounded-2xl bg-rose-600 text-white text-xs font-extrabold shadow-md hover:bg-rose-700 transition-all flex items-center gap-2 uppercase tracking-wider"
            >
              <span>VIEW AGRONOMIST ACTION PLAN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-rose-800">Sector C Impact: Medium</span>
          </div>
        </div>

      </div>

      {/* 4 SENSOR GRID CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* CARD 1: SOIL MOISTURE */}
        <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#006c49] tracking-wider">SOIL MOISTURE SENSOR</span>
            <Sprout className="w-4.5 h-4.5 text-[#006c49]" />
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="font-display font-black text-4xl text-[#002117]">62%</span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Optimal Range</span>
            </div>
            <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-[#006c49] rounded-full w-[62%]" />
            </div>
          </div>

          <p className="text-[10px] font-bold text-[#6c7a71]">Target Range: 55% - 75% Moisture</p>
        </div>

        {/* CARD 2: SPRAYING WINDOW */}
        <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#006c49] tracking-wider">SPRAYING SUITABILITY</span>
            <Wind className="w-4.5 h-4.5 text-[#006c49]" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-none">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-black text-xl text-rose-900">POOR</span>
                <p className="text-[10px] font-semibold text-[#6c7a71]">High winds &amp; rain risk</p>
              </div>
            </div>
          </div>

          <p className="text-[10px] font-extrabold text-[#006c49] uppercase bg-emerald-50 px-2.5 py-1 rounded-xl">
            NEXT SAFE WINDOW: THU 06:00 AM
          </p>
        </div>

        {/* CARD 3: EVAPOTRANSPIRATION */}
        <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#006c49] tracking-wider">EVAPOTRANSPIRATION (ET0)</span>
            <Sun className="w-4.5 h-4.5 text-amber-500" />
          </div>

          <div className="space-y-2">
            <span className="font-display font-black text-3xl text-[#002117]">4.2 <span className="text-xs text-[#6c7a71] font-medium">mm/day</span></span>
            <div className="flex items-end gap-1.5 h-8 pt-1">
              <div className="w-full bg-emerald-100 h-4 rounded-t" />
              <div className="w-full bg-emerald-200 h-6 rounded-t" />
              <div className="w-full bg-emerald-100 h-3 rounded-t" />
              <div className="w-full bg-[#006c49] h-8 rounded-t" />
              <div className="w-full bg-emerald-200 h-5 rounded-t" />
            </div>
          </div>

          <p className="text-[10px] font-bold text-[#6c7a71]">Water Loss Rate: Normal</p>
        </div>

        {/* CARD 4: SOLAR RAD. WITH GIS SATELLITE MAP */}
        <div className="rounded-3xl overflow-hidden shadow-sm border border-emerald-100 relative bg-[#002117] min-h-[140px] flex flex-col justify-end p-5 text-white group cursor-pointer">
          <img src="/assets/smart_farm_aerial.jpg" alt="GIS Satellite Map" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          
          <div className="relative z-10 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#6ffbbe]">SOLAR IRRADIANCE</p>
              <Eye className="w-4 h-4 text-emerald-300" />
            </div>
            <p className="font-display font-black text-2xl text-white">18.5 <span className="text-xs font-normal">MJ/m²</span></p>
          </div>
        </div>

      </div>

      {/* 7-DAY MICROCLIMATE FORECAST CARDS */}
      <div className="rounded-3xl p-8 bg-white border border-emerald-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
          <div>
            <h2 className="font-display font-black text-2xl text-[#002117]">
              7-Day Microclimate & Spraying Forecast
            </h2>
            <p className="text-xs text-[#6c7a71] font-medium">
              Precision farm weather recommendations updated hourly by Doppler Radar.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 p-1.5 rounded-2xl border border-emerald-200">
            <button
              onClick={() => setActiveForecastTab('temp')}
              className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeForecastTab === 'temp' ? 'bg-[#006c49] text-white shadow' : 'text-[#006c49]'
              }`}
            >
              Temperature
            </button>
            <button
              onClick={() => setActiveForecastTab('rain')}
              className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeForecastTab === 'rain' ? 'bg-[#006c49] text-white shadow' : 'text-[#006c49]'
              }`}
            >
              Rainfall Risk
            </button>
            <button
              onClick={() => setActiveForecastTab('wind')}
              className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeForecastTab === 'wind' ? 'bg-[#006c49] text-white shadow' : 'text-[#006c49]'
              }`}
            >
              Wind Speed
            </button>
          </div>
        </div>

        {/* 7-Day Forecast Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 pt-2">
          {forecastData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  idx === 0 
                    ? 'bg-emerald-50/80 border-emerald-300 shadow-sm' 
                    : 'bg-white border-emerald-100 hover:border-emerald-300'
                } space-y-3 text-center`}
              >
                <p className="text-xs font-extrabold text-[#002117]">{item.day}</p>
                
                <div className="w-10 h-10 rounded-2xl bg-white text-[#006c49] border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <p className="font-display font-black text-lg text-[#002117]">{item.maxTemp} <span className="text-xs text-[#6c7a71] font-normal">{item.minTemp}</span></p>
                  <p className="text-[10px] text-[#0284c7] font-bold">🌧️ {item.rainProb}</p>
                </div>

                <div className="pt-1">
                  <span className={`text-[9px] font-extrabold uppercase px-2 py-1 rounded-full border ${item.sprayBg}`}>
                    {item.sprayStatus}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACTION PLAN MODAL DIALOG */}
      {isActionPlanOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-emerald-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
              <div className="flex items-center gap-2 text-rose-700">
                <ShieldAlert className="w-6 h-6" />
                <h3 className="font-display font-black text-xl text-[#002117]">Agronomist Action Plan</h3>
              </div>
              <button onClick={() => setIsActionPlanOpen(false)} className="text-gray-400 hover:text-red-500 text-lg font-bold">✕</button>
            </div>

            <div className="space-y-4 text-xs font-semibold text-[#00422b]">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <p className="font-extrabold text-rose-950">Immediate Farm Tasks Before Rainfall (&gt;45mm):</p>
                <ul className="space-y-1.5 text-rose-900 text-[11px] list-disc pl-4">
                  <li><strong>Clear Sector C Field Drainage:</strong> Open main outlet channels to prevent standing water accumulation.</li>
                  <li><strong>Postpone Fertilizer Top-Dressing:</strong> Avoid applying Urea or NPK granules until Friday morning to prevent nutrient runoff loss.</li>
                  <li><strong>Cover Harvested Storage:</strong> Secure harvested produce sacks under waterproof tarpaulins.</li>
                </ul>
              </div>

              {actionPlanDone ? (
                <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-center">
                  ✅ Action plan marked as executed for North Farm Sector!
                </div>
              ) : (
                <button
                  onClick={() => setActionPlanDone(true)}
                  className="w-full py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>MARK ALL ACTION TASKS AS EXECUTED</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
