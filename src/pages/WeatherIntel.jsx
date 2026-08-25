import React, { useState, useEffect } from 'react';
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
  Check,
  RefreshCw,
  Navigation,
  Activity,
  CheckSquare
} from 'lucide-react';
import { getWeather, getWeatherAdvisory, getForecastAdvisory } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function WeatherIntel() {
  const { user } = useAuth();
  const [activeForecastTab, setActiveForecastTab] = useState('temp');
  const [isActionPlanOpen, setIsActionPlanOpen] = useState(false);
  const [actionPlanDone, setActionPlanDone] = useState(false);

  // Live weather & advisory state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: 26.8449, lon: 80.9070, name: 'LUCKNOW DISTRICT' });
  const [weatherData, setWeatherData] = useState(null);
  const [advisoryData, setAdvisoryData] = useState(null);
  const [forecastAdvisory, setForecastAdvisory] = useState([]);

  // Reverse geocoding helper to convert GPS coordinates (lat, lon) to Village & District details
  const fetchCityName = async (lat, lon) => {
    try {
      const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
      if (res.ok) {
        const data = await res.json();
        
        // Extract village / locality / neighborhood
        const village = data.locality || data.localityInfo?.administrative?.[3]?.name || data.localityInfo?.administrative?.[2]?.name;
        
        // Extract district / city
        const district = data.city || data.localityInfo?.administrative?.[1]?.name || data.principalSubdivision;

        if (village && district && village.toLowerCase() !== district.toLowerCase()) {
          return `${village.toUpperCase()} VILLAGE, ${district.toUpperCase()} DISTRICT`;
        } else if (district) {
          return `${district.toUpperCase()} DISTRICT`;
        } else if (village) {
          return `${village.toUpperCase()} VILLAGE`;
        }
      }
    } catch (e) {
      console.warn('Reverse geocode error:', e);
    }
    return null;
  };

  const fetchLiveWeather = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);

      // Resolve human-readable Village & District location details
      const villageDistrictName = await fetchCityName(lat, lon);
      const fallbackName = user?.district 
        ? `${user.village ? user.village.toUpperCase() + ' VILLAGE, ' : ''}${user.district.toUpperCase()} DISTRICT` 
        : 'LUCKNOW DISTRICT';

      setLocation({
        lat,
        lon,
        name: villageDistrictName || fallbackName
      });

      // Fetch weather telemetry, current advisory, & 7-day forecast advisory concurrently
      const [res, advRes, fcastRes] = await Promise.all([
        getWeather(lat, lon),
        getWeatherAdvisory(lat, lon).catch(err => {
          console.warn('Advisory API fetch error:', err);
          return null;
        }),
        getForecastAdvisory(lat, lon).catch(err => {
          console.warn('Forecast Advisory API fetch error:', err);
          return null;
        })
      ]);

      if (res?.data) {
        setWeatherData(res.data);
      }
      if (advRes) {
        console.log("AGRI ADVISORY:", advRes);
        setAdvisoryData(advRes.advisory);
      }
      if (fcastRes?.forecast) {
        setForecastAdvisory(fcastRes.forecast);
      }
    } catch (err) {
      console.error('Failed to load weather:', err);
      setError(err.message || 'Failed to fetch weather data from backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = parseFloat(pos.coords.latitude.toFixed(4));
          const lon = parseFloat(pos.coords.longitude.toFixed(4));
          await fetchLiveWeather(lat, lon);
        },
        (err) => {
          console.warn('Geolocation access fallback:', err.message);
          fetchLiveWeather(location.lat, location.lon);
        },
        { timeout: 8000 }
      );
    } else {
      fetchLiveWeather(location.lat, location.lon);
    }
  }, []);

  const handleRefresh = () => {
    fetchLiveWeather(location.lat, location.lon);
  };

  // Helper for WMO weather codes
  const parseWeatherCode = (code) => {
    if (code === 0) return { label: 'Clear Sky', icon: Sun, spray: 'IDEAL', sprayBg: 'bg-emerald-100 text-emerald-800' };
    if (code <= 3) return { label: 'Partly Cloudy', icon: CloudSun, spray: 'GOOD', sprayBg: 'bg-emerald-100 text-emerald-800' };
    if (code <= 48) return { label: 'Foggy / Hazy', icon: CloudSun, spray: 'MODERATE', sprayBg: 'bg-amber-100 text-amber-800' };
    if (code <= 67) return { label: 'Rain / Drizzle', icon: CloudRain, spray: 'POOR', sprayBg: 'bg-rose-100 text-rose-800' };
    if (code <= 82) return { label: 'Rain Showers', icon: CloudRain, spray: 'RISK', sprayBg: 'bg-rose-100 text-rose-800' };
    return { label: 'Thunderstorm', icon: Zap, spray: 'POOR', sprayBg: 'bg-rose-100 text-rose-800' };
  };

  // Current weather variables extracted from Open-Meteo backend response
  const current = weatherData?.current || {};
  const temp = current.temperature_2m != null ? Math.round(current.temperature_2m) : 27;
  const feelsLike = current.apparent_temperature != null ? Math.round(current.apparent_temperature) : 34;
  const humidity = current.relative_humidity_2m != null ? current.relative_humidity_2m : 95;
  const rain = current.rain != null ? current.rain : 0;
  const windSpeed = current.wind_speed_10m != null ? current.wind_speed_10m : 3.8;
  const weatherCode = current.weather_code != null ? current.weather_code : 3;
  const weatherInfo = parseWeatherCode(weatherCode);
  const CurrentIcon = weatherInfo.icon;

  // DYNAMIC COMPUTATIONS & BACKEND ADVISORY INTEGRATION
  const estimatedSoilMoisture = Math.min(
    Math.max(
      Math.round(humidity * 0.65 + (rain > 0 ? 22 : 0) - (temp > 30 ? (temp - 30) * 1.2 : 0)), 
      25
    ), 
    92
  );

  const estimatedET0 = (
    Math.max(
      1.2,
      0.0023 * (temp + 17.8) * Math.sqrt(Math.max(temp - 10, 4)) * (1 + windSpeed * 0.03) * (1 - humidity / 220) * 10
    )
  ).toFixed(1);

  const estimatedSolarRad = (weatherCode <= 1 ? 22.4 : (weatherCode <= 3 ? 17.2 : 10.8)).toFixed(1);

  const calculateSpraySuitability = (wSpeed, rainVol, hum, tVal) => {
    if (wSpeed > 16 || rainVol > 0.5) return { text: 'NOT RECOMMENDED', risk: 'High wind or rain wash-off risk', bg: 'bg-rose-100 text-rose-800 border-rose-200' };
    if (wSpeed > 11 || rainVol > 0.1 || hum > 88 || tVal > 35) return { text: 'CAUTION', risk: 'Moderate drift, humidity, or heat', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
    return { text: 'SUITABLE', risk: 'Low drift & optimal absorption', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
  };

  const sprayingAdv = advisoryData?.spraying || {
    status: (windSpeed > 15 || rain > 0.5) ? "NOT RECOMMENDED" : (humidity > 90 ? "CAUTION" : "SUITABLE"),
    message: rain > 0 ? "Avoid spraying during rainfall." : (windSpeed > 15 ? "High wind may cause spray drift." : (humidity > 90 ? "Very high humidity detected. Check crop disease conditions before spraying." : "Weather conditions are generally suitable for spraying."))
  };

  const diseaseAdv = advisoryData?.disease || {
    risk: (humidity >= 90 && temp >= 20) ? "HIGH" : (humidity >= 80 ? "MODERATE" : "LOW"),
    message: (humidity >= 90 && temp >= 20) ? "Very high humidity and suitable temperature may increase fungal disease risk. Monitor crops closely." : "Current weather conditions indicate relatively low fungal disease risk."
  };

  const irrigationAdv = advisoryData?.irrigation || {
    status: (rain > 0) ? "LOW" : (temp >= 35 && humidity < 50 ? "HIGH" : "MODERATE"),
    message: (rain > 0) ? "Rainfall is occurring. Delay irrigation to reduce water wastage." : "Normal conditions. Check crop and soil condition before irrigation."
  };

  const isSprayCautionOrPoor = sprayingAdv.status === 'NOT RECOMMENDED' || sprayingAdv.status === 'CAUTION';

  // FIND BEST SPRAYING WINDOW & IRRIGATION WARNING FROM 7-DAY FORECAST ADVISORY
  const bestSprayingDay = forecastAdvisory.find(day => day.spraying === "SUITABLE");
  const irrigationWarning = forecastAdvisory.find(day => day.irrigation === "HIGH" || day.irrigation === "LOW");

  // DYNAMIC 7-DAY FORECAST MAP FROM OPEN-METEO DAILY TELEMETRY
  const daily = weatherData?.daily;
  const forecastData = (daily?.time && daily.time.length > 0) 
    ? daily.time.map((dateStr, idx) => {
        const d = new Date(dateStr);
        const dayName = idx === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' });
        const dateFormatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const maxT = daily.temperature_2m_max?.[idx] != null ? Math.round(daily.temperature_2m_max[idx]) : temp;
        const minT = daily.temperature_2m_min?.[idx] != null ? Math.round(daily.temperature_2m_min[idx]) : Math.max(temp - 5, 14);
        const rainProb = daily.precipitation_probability_max?.[idx] != null ? daily.precipitation_probability_max[idx] : 15;
        const rainSum = daily.precipitation_sum?.[idx] != null ? daily.precipitation_sum[idx] : 0;
        const wSpeedMax = daily.wind_speed_10m_max?.[idx] != null ? Math.round(daily.wind_speed_10m_max[idx]) : windSpeed;
        const wCode = daily.weather_code?.[idx] != null ? daily.weather_code[idx] : 0;
        
        const wInfo = parseWeatherCode(wCode);
        const IconComponent = wInfo.icon;
        const daySprayEval = calculateSpraySuitability(wSpeedMax, rainSum, 75, maxT);

        // Cross reference with backend forecast advisory if available
        const fcastAdvItem = forecastAdvisory.find(f => f.date === dateStr);

        return {
          day: `${dayName}${idx === 0 ? ' (Today)' : ''}`,
          date: dateFormatted,
          icon: IconComponent,
          maxTemp: maxT,
          minTemp: minT,
          heatLevel: maxT > 33 ? 'High Heat' : (maxT < 24 ? 'Cool / Wet' : 'Comfortable'),
          rainProb: rainProb,
          rainAmount: `${rainSum} mm`,
          rainRiskText: rainProb > 60 ? 'Heavy Monsoon' : (rainProb > 30 ? 'Passing Showers' : 'Low Risk'),
          windSpeed: wSpeedMax,
          windDir: 'SE',
          windDrift: wSpeedMax > 15 ? 'High Drift' : 'Low Drift',
          sprayStatus: fcastAdvItem?.spraying || daySprayEval.text,
          sprayBg: (fcastAdvItem?.spraying || daySprayEval.text) === 'NOT RECOMMENDED' ? 'bg-rose-100 text-rose-800 border-rose-200' : ((fcastAdvItem?.spraying || daySprayEval.text) === 'CAUTION' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200')
        };
      })
    : [];

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
            Weather Intelligence &amp; Spraying Radar
          </h1>
          <p className="text-xs sm:text-sm text-[#3c4a42] font-medium">
            AI-calculated 7-day microclimate telemetry &amp; live agricultural advisory engine synced with FastAPI.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#006c49] bg-white border border-emerald-200 rounded-2xl shadow-sm hover:bg-emerald-50 transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Telemetry</span>
          </button>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3.5 py-2 rounded-2xl border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>FastAPI 7-Day Open-Meteo Synced</span>
          </span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-none" />
          <span>API Notice: {error}. Showing estimated microclimate telemetry.</span>
        </div>
      )}

      {/* TOP METRIC SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT WEATHER CARD: Temperature & Conditions */}
        <div className="lg:col-span-5 rounded-3xl p-7 bg-white border border-emerald-100 shadow-sm space-y-6 flex flex-col justify-between hover:shadow-md transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#006c49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200/60">
                <MapPin className="w-4 h-4 text-[#006c49] animate-bounce flex-none" />
                <span className="truncate max-w-[280px]">{location.name}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 flex-none">GPS: {location.lat}° N, {location.lon}° E</span>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <span className="font-display font-black text-6xl sm:text-7xl text-[#002117]">
                {loading ? '...' : `${temp}°C`}
              </span>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-lg font-extrabold text-[#00422b]">
                  <CurrentIcon className="w-6 h-6 text-[#0284c7] animate-bounce" />
                  <span>{weatherInfo.label}</span>
                </div>
                <p className="text-xs text-[#6c7a71] font-semibold">
                  Feels like {feelsLike}°C • Rain {rain}mm
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs font-bold text-[#3c4a42] pt-4 border-t border-emerald-100">
            <div className="p-2.5 rounded-2xl bg-emerald-50/50 text-center">
              <p className="text-[9px] text-[#6c7a71] uppercase">WIND SPEED</p>
              <p className="font-extrabold text-[#002117] mt-0.5">{windSpeed} km/h</p>
            </div>
            <div className="p-2.5 rounded-2xl bg-blue-50/50 text-center">
              <p className="text-[9px] text-[#6c7a71] uppercase">HUMIDITY</p>
              <p className="font-extrabold text-[#0284c7] mt-0.5">{humidity}%</p>
            </div>
            <div className="p-2.5 rounded-2xl bg-amber-50/50 text-center">
              <p className="text-[9px] text-[#6c7a71] uppercase">PRECIPITATION</p>
              <p className="font-extrabold text-amber-800 mt-0.5">{rain} mm</p>
            </div>
          </div>
        </div>

        {/* RIGHT WARNING CARD: Live AI Weather Advisory Engine */}
        <div className={`lg:col-span-7 rounded-3xl p-7 shadow-sm space-y-4 flex flex-col justify-between relative overflow-hidden border-2 ${isSprayCautionOrPoor ? 'bg-amber-50 border-amber-300' : 'bg-emerald-50 border-emerald-300'}`}>
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold shadow-md text-white ${isSprayCautionOrPoor ? 'bg-amber-600' : 'bg-emerald-600'}`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${isSprayCautionOrPoor ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'}`}>
                    LIVE AGRICULTURAL AI ADVISORY
                  </span>
                  <h2 className="font-display font-black text-2xl text-slate-900 mt-0.5">
                    Disease Risk: {diseaseAdv.risk} • Spraying: {sprayingAdv.status}
                  </h2>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200">
                FastAPI Advisory Engine
              </span>
            </div>

            {/* ADVISORY DETAILED RECOMMENDATIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-800">
              <div className="p-3 bg-white/80 rounded-2xl border border-slate-200 space-y-1">
                <p className="text-[10px] font-black uppercase text-amber-800 flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5" /> SPRAYING SUITABILITY
                </p>
                <p className="text-slate-900 font-extrabold">{sprayingAdv.status}</p>
                <p className="text-[11px] text-slate-600 leading-tight">{sprayingAdv.message}</p>
              </div>

              <div className="p-3 bg-white/80 rounded-2xl border border-slate-200 space-y-1">
                <p className="text-[10px] font-black uppercase text-rose-800 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> FUNGAL DISEASE RISK
                </p>
                <p className="text-slate-900 font-extrabold">{diseaseAdv.risk} RISK</p>
                <p className="text-[11px] text-slate-600 leading-tight">{diseaseAdv.message}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 relative z-10">
            <button 
              onClick={() => setIsActionPlanOpen(true)}
              className="px-5 py-2.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold shadow-md hover:bg-[#046a38] transition-all flex items-center gap-2 uppercase tracking-wider cursor-pointer"
            >
              <span>VIEW AGRONOMIST ACTION PLAN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-700">Irrigation: {irrigationAdv.status} Status</span>
          </div>
        </div>

      </div>

      {/* 2 FORECAST DECISION INTEL CARDS: BEST SPRAYING WINDOW & IRRIGATION WARNING */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CARD 1: BEST SPRAYING WINDOW */}
        <div className="rounded-3xl p-6 bg-emerald-900 text-white border border-emerald-800 shadow-md space-y-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              BEST SPRAYING WINDOW (7-DAY FORECAST)
            </span>
            <span className="text-[10px] font-extrabold bg-emerald-800 text-emerald-200 px-2.5 py-0.5 rounded-full">
              AI Forecast Engine
            </span>
          </div>

          {bestSprayingDay ? (
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display font-black text-2xl text-white">
                  {new Date(bestSprayingDay.date).toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" })}
                </h3>
                <span className="text-xs font-extrabold text-emerald-900 bg-emerald-300 px-3 py-1 rounded-full uppercase">
                  ✓ SUITABLE WINDOW
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-emerald-100 bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800">
                <div>
                  <p className="text-[9px] uppercase text-emerald-400">MAX TEMP</p>
                  <p className="font-extrabold text-white mt-0.5">{bestSprayingDay.temperature_max}°C</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase text-emerald-400">RAIN CHANCE</p>
                  <p className="font-extrabold text-white mt-0.5">{bestSprayingDay.rain_probability}%</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase text-emerald-400">MAX WIND</p>
                  <p className="font-extrabold text-white mt-0.5">{bestSprayingDay.max_wind_kmh} km/h</p>
                </div>
              </div>

              <p className="text-xs text-emerald-200 font-medium pt-1">
                Optimal conditions projected: low wind drift risk & zero rain wash-off expected.
              </p>
            </div>
          ) : (
            <div className="space-y-1 py-2">
              <p className="font-extrabold text-amber-300 text-sm">No Ideal Spraying Window Next 7 Days</p>
              <p className="text-xs text-emerald-200">Monsoon rainfall or high wind velocity predicted across all 7 forecast days.</p>
            </div>
          )}
        </div>

        {/* CARD 2: IRRIGATION ADVISORY WARNING */}
        <div className="rounded-3xl p-6 bg-slate-900 text-white border border-slate-800 shadow-md space-y-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-blue-400" />
              7-DAY IRRIGATION DEMAND PLANNER
            </span>
            <span className="text-[10px] font-extrabold bg-slate-800 text-blue-200 px-2.5 py-0.5 rounded-full">
              Water Management
            </span>
          </div>

          {irrigationWarning ? (
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display font-black text-2xl text-white">
                  {new Date(irrigationWarning.date).toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" })}
                </h3>
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase ${
                  irrigationWarning.irrigation === 'HIGH' ? 'bg-amber-400 text-amber-950' : 'bg-blue-300 text-blue-950'
                }`}>
                  {irrigationWarning.irrigation === 'HIGH' ? '⚡ HIGH IRRIGATION DEMAND' : '🌧️ IRRIGATION NOT REQUIRED'}
                </span>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-1 text-xs">
                <p className="font-extrabold text-slate-200">
                  {irrigationWarning.irrigation === 'HIGH' 
                    ? 'Hot and dry conditions expected. Check soil moisture and plan irrigation.' 
                    : 'Heavy rainfall expected. Consider delaying irrigation to prevent root rot & water wastage.'}
                </p>
                <p className="text-[11px] text-slate-400">
                  Rain Probability: {irrigationWarning.rain_probability}% • Expected Volume: {irrigationWarning.rainfall_mm} mm
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-1 py-2">
              <p className="font-extrabold text-emerald-300 text-sm">Moderate Irrigation Demand</p>
              <p className="text-xs text-slate-300">Normal crop transpiration rate projected for the upcoming week.</p>
            </div>
          )}
        </div>

      </div>

      {/* 4 ESTIMATED METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* CARD 1: ESTIMATED SOIL MOISTURE */}
        <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#006c49] tracking-wider">ESTIMATED SOIL MOISTURE</span>
            <Sprout className="w-4.5 h-4.5 text-[#006c49]" />
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="font-display font-black text-4xl text-[#002117]">{estimatedSoilMoisture}%</span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Calculated Range</span>
            </div>
            <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-[#006c49] rounded-full transition-all duration-500" style={{ width: `${estimatedSoilMoisture}%` }} />
            </div>
          </div>

          <p className="text-[10px] font-bold text-[#6c7a71]">Irrigation: {irrigationAdv.status} ({irrigationAdv.message})</p>
        </div>

        {/* CARD 2: SPRAYING SUITABILITY */}
        <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#006c49] tracking-wider">SPRAYING SUITABILITY</span>
            <Wind className="w-4.5 h-4.5 text-[#006c49]" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-none ${isSprayCautionOrPoor ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {isSprayCautionOrPoor ? <XCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
              </div>
              <div>
                <span className={`font-display font-black text-xl ${isSprayCautionOrPoor ? 'text-amber-900' : 'text-emerald-900'}`}>{sprayingAdv.status}</span>
                <p className="text-[10px] font-semibold text-[#6c7a71]">{sprayingAdv.message}</p>
              </div>
            </div>
          </div>

          <p className="text-[10px] font-extrabold text-[#006c49] uppercase bg-emerald-50 px-2.5 py-1 rounded-xl">
            {isSprayCautionOrPoor ? 'CAUTION: CHECK WIND DRIFT & DISEASE' : 'SAFE FOR SPRAYING NOW'}
          </p>
        </div>

        {/* CARD 3: ESTIMATED ET0 */}
        <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#006c49] tracking-wider">ESTIMATED ET₀ (EVAPOTRANSPIRATION)</span>
            <Sun className="w-4.5 h-4.5 text-amber-500" />
          </div>

          <div className="space-y-2">
            <span className="font-display font-black text-3xl text-[#002117]">{estimatedET0} <span className="text-xs text-[#6c7a71] font-medium">mm/day</span></span>
            <div className="flex items-end gap-1.5 h-8 pt-1">
              <div className="w-full bg-emerald-100 h-4 rounded-t" />
              <div className="w-full bg-emerald-200 h-6 rounded-t" />
              <div className="w-full bg-emerald-100 h-3 rounded-t" />
              <div className="w-full bg-[#006c49] h-8 rounded-t" />
              <div className="w-full bg-emerald-200 h-5 rounded-t" />
            </div>
          </div>

          <p className="text-[10px] font-bold text-[#6c7a71]">Calculated water loss rate ({temp}°C / {windSpeed}km/h)</p>
        </div>

        {/* CARD 4: ESTIMATED SOLAR IRRADIANCE */}
        <div className="rounded-3xl overflow-hidden shadow-sm border border-emerald-100 relative bg-[#002117] min-h-[140px] flex flex-col justify-end p-5 text-white group cursor-pointer">
          <img src="/assets/smart_farm_aerial.jpg" alt="GIS Aerial View" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          
          <div className="relative z-10 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#6ffbbe]">ESTIMATED SOLAR IRRADIANCE</p>
              <Eye className="w-4 h-4 text-emerald-300" />
            </div>
            <p className="font-display font-black text-2xl text-white">{estimatedSolarRad} <span className="text-xs font-normal">MJ/m²</span></p>
          </div>
        </div>

      </div>

      {/* 7-DAY MICROCLIMATE FORECAST CARDS WITH DYNAMIC TAB VIEWS */}
      <div className="rounded-3xl p-8 bg-white border border-emerald-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-black text-2xl text-[#002117]">
                7-Day Microclimate &amp; Spraying Forecast
              </h2>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-[#006c49] px-2.5 py-1 rounded-full border border-emerald-200">
                {activeForecastTab === 'temp' && '🌡️ Temperature Mode'}
                {activeForecastTab === 'rain' && '🌧️ Rainfall Risk Mode'}
                {activeForecastTab === 'wind' && '💨 Wind Speed Mode'}
              </span>
            </div>
            <p className="text-xs text-[#6c7a71] font-medium mt-0.5">
              {activeForecastTab === 'temp' && 'Displays 7-day high/low thermal trends & crop heat stress categories.'}
              {activeForecastTab === 'rain' && 'Monitors 7-day precipitation probability, expected volume (mm) & monsoon risk.'}
              {activeForecastTab === 'wind' && 'Evaluates wind velocity, direction compass & pesticide droplet drift window.'}
            </p>
          </div>

          {/* TOGGLE TAB BUTTONS */}
          <div className="flex items-center gap-2 bg-emerald-50 p-1.5 rounded-2xl border border-emerald-200">
            <button
              onClick={() => setActiveForecastTab('temp')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeForecastTab === 'temp' ? 'bg-[#006c49] text-white shadow-md' : 'text-[#006c49] hover:bg-emerald-100/60'
              }`}
            >
              <Thermometer className="w-3.5 h-3.5" />
              <span>Temperature</span>
            </button>

            <button
              onClick={() => setActiveForecastTab('rain')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeForecastTab === 'rain' ? 'bg-[#006c49] text-white shadow-md' : 'text-[#006c49] hover:bg-emerald-100/60'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>Rainfall Risk</span>
            </button>

            <button
              onClick={() => setActiveForecastTab('wind')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeForecastTab === 'wind' ? 'bg-[#006c49] text-white shadow-md' : 'text-[#006c49] hover:bg-emerald-100/60'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Wind Speed</span>
            </button>
          </div>
        </div>

        {/* DYNAMIC 7-DAY FORECAST GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 pt-2">
          {forecastData.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div 
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  idx === 0 
                    ? 'bg-emerald-50/80 border-emerald-300 shadow-md ring-2 ring-emerald-400/30' 
                    : 'bg-white border-emerald-100 hover:border-emerald-300 hover:shadow-sm'
                } space-y-3 text-center flex flex-col justify-between`}
              >
                <div>
                  <p className="text-xs font-black text-[#002117]">{item.day}</p>
                  <p className="text-[10px] text-[#6c7a71] font-semibold">{item.date}</p>
                </div>
                
                <div className="w-10 h-10 rounded-2xl bg-white text-[#006c49] border border-emerald-100 flex items-center justify-center mx-auto shadow-sm my-1">
                  <Icon className="w-5 h-5" />
                </div>

                {/* TAB VIEW 1: TEMPERATURE FOCUS */}
                {activeForecastTab === 'temp' && (
                  <div className="space-y-2">
                    <div>
                      <p className="font-display font-black text-xl text-[#002117]">
                        {item.maxTemp}° <span className="text-xs text-[#6c7a71] font-normal">/ {item.minTemp}°C</span>
                      </p>
                    </div>

                    {/* Temp visual bar */}
                    <div className="w-full bg-emerald-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-amber-400 to-rose-500 h-full rounded-full" 
                        style={{ width: `${Math.min(item.maxTemp * 2.5, 100)}%` }} 
                      />
                    </div>

                    <span className="inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {item.heatLevel}
                    </span>
                  </div>
                )}

                {/* TAB VIEW 2: RAINFALL RISK FOCUS */}
                {activeForecastTab === 'rain' && (
                  <div className="space-y-2">
                    <div>
                      <p className="font-display font-black text-xl text-[#0284c7]">
                        {item.rainProb}%
                      </p>
                      <p className="text-[10px] font-bold text-slate-600">Vol: {item.rainAmount}</p>
                    </div>

                    {/* Rain probability visual bar */}
                    <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full rounded-full" 
                        style={{ width: `${item.rainProb}%` }} 
                      />
                    </div>

                    <span className={`inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      item.rainProb > 50 ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {item.rainRiskText}
                    </span>
                  </div>
                )}

                {/* TAB VIEW 3: WIND SPEED FOCUS */}
                {activeForecastTab === 'wind' && (
                  <div className="space-y-2">
                    <div>
                      <p className="font-display font-black text-xl text-[#002117]">
                        {item.windSpeed} <span className="text-xs text-[#6c7a71] font-normal">km/h</span>
                      </p>
                      <p className="text-[10px] font-bold text-emerald-800">Dir: {item.windDir}</p>
                    </div>

                    {/* Wind visual bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.windSpeed > 15 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${Math.min(item.windSpeed * 4, 100)}%` }} 
                      />
                    </div>

                    <span className={`inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${item.sprayBg}`}>
                      {item.sprayStatus}
                    </span>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* ACTION PLAN MODAL DIALOG */}
      {isActionPlanOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fff8f6] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-rose-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-rose-100 pb-4">
              <div className="flex items-center gap-2 text-rose-800">
                <ShieldAlert className="w-6 h-6" />
                <h3 className="font-display font-black text-xl text-rose-950">Agronomist Action Plan</h3>
              </div>
              <button onClick={() => setIsActionPlanOpen(false)} className="text-gray-400 hover:text-red-500 text-lg font-bold">✕</button>
            </div>

            <div className="space-y-4 text-xs font-semibold text-slate-800">
              <div className="p-4 rounded-2xl bg-white border border-rose-200 space-y-3">
                <p className="font-extrabold text-rose-950 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-rose-600" />
                  Real-time Advisory Recommendations:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                    <p className="font-black text-amber-900">🚜 Spraying: {sprayingAdv.status}</p>
                    <p className="text-amber-800 text-[11px]">{sprayingAdv.message}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                    <p className="font-black text-rose-900">🦠 Disease Risk: {diseaseAdv.risk}</p>
                    <p className="text-rose-800 text-[11px]">{diseaseAdv.message}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                    <p className="font-black text-blue-900">💧 Irrigation Status: {irrigationAdv.status}</p>
                    <p className="text-blue-800 text-[11px]">{irrigationAdv.message}</p>
                  </div>
                </div>
              </div>

              {actionPlanDone ? (
                <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-center">
                  ✅ Action plan marked as executed for North Farm Sector!
                </div>
              ) : (
                <button
                  onClick={() => setActionPlanDone(true)}
                  className="w-full py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-2 cursor-pointer"
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
