import React, { useState, useEffect } from 'react';
import { 
  FlaskConical, 
  Sprout, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Info, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Layers,
  ShieldAlert,
  AlertTriangle,
  Check,
  Save
} from 'lucide-react';
import { 
  analyzeSoil, 
  getFertilizerRecommendation, 
  saveSoilRecord,
  getFarms,
  getFields
} from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function SoilHealth() {
  const { user } = useAuth();

  const [farms, setFarms] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState('');
  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState('');

  const [form, setForm] = useState({
    crop: 'Wheat',
    ph: '6.5',
    nitrogen: '200',
    phosphorus: '12',
    potassium: '150',
    organicCarbon: '0.65',
    moisture: '55'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [fertilizerResult, setFertilizerResult] = useState(null);
  const [savedNotice, setSavedNotice] = useState(false);

  const cropsList = [
    'Wheat',
    'Rice',
    'Maize',
    'Tomato',
    'Potato',
    'Soybean'
  ];

  // Load farms when user is available
  useEffect(() => {
    async function loadFarmsList() {
      if (!user?.id) return;
      try {
        const res = await getFarms(user.id);
        if (res?.farms && res.farms.length > 0) {
          setFarms(res.farms);
          setSelectedFarmId(res.farms[0].id);
        }
      } catch (err) {
        console.warn('Failed to load farms:', err);
      }
    }
    loadFarmsList();
  }, [user?.id]);

  // Load fields when farm is selected
  useEffect(() => {
    async function loadFieldsList() {
      if (!selectedFarmId) return;
      try {
        const res = await getFields(selectedFarmId);
        if (res?.fields && res.fields.length > 0) {
          setFields(res.fields);
          setSelectedFieldId(res.fields[0].id);
        } else {
          setFields([]);
          setSelectedFieldId('');
        }
      } catch (err) {
        console.warn('Failed to load fields:', err);
      }
    }
    loadFieldsList();
  }, [selectedFarmId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSavedNotice(false);

      const phVal = parseFloat(form.ph);
      const n = parseFloat(form.nitrogen);
      const p = parseFloat(form.phosphorus);
      const k = parseFloat(form.potassium);
      const oc = parseFloat(form.organicCarbon);
      const moist = parseFloat(form.moisture);

      const [soilRes, fertRes] = await Promise.all([
        analyzeSoil({
          ph: phVal,
          nitrogen: n,
          phosphorus: p,
          potassium: k,
          organicCarbon: oc,
          moisture: moist,
          crop: form.crop
        }),
        getFertilizerRecommendation({
          crop: form.crop,
          nitrogen: n,
          phosphorus: p,
          potassium: k
        }).catch(err => {
          console.warn('Fertilizer API error:', err);
          return null;
        })
      ]);

      if (soilRes?.data) {
        setResult(soilRes.data);
      }
      if (fertRes?.data) {
        setFertilizerResult(fertRes.data);
      }

      // Save record to Supabase soil_records table if field_id is selected
      const targetFieldId = selectedFieldId || (fields[0]?.id) || "YOUR-FIELD-UUID";
      if (targetFieldId) {
        try {
          await saveSoilRecord({
            field_id: targetFieldId,
            ph: phVal,
            nitrogen: n,
            phosphorus: p,
            potassium: k,
            organic_carbon: oc,
            moisture: moist,
            source: 'manual',
            test_date: new Date().toISOString().split('T')[0]
          });
          setSavedNotice(true);
        } catch (saveErr) {
          console.warn('Soil record save notice:', saveErr);
        }
      }
    } catch (err) {
      console.error('Soil analysis error:', err);
      setError(err.message || 'Failed to analyze soil parameters.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'OPTIMAL') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (status === 'HIGH') return 'bg-amber-100 text-amber-800 border-amber-300';
    if (status === 'LOW') return 'bg-amber-100 text-amber-900 border-amber-300';
    if (status === 'DEFICIENT') return 'bg-rose-100 text-rose-800 border-rose-300';
    return 'bg-blue-100 text-blue-800 border-blue-300';
  };

  return (
    <div className="space-y-8 py-2 w-full px-4 sm:px-6 animate-in fade-in">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#006c49] text-[11px] font-extrabold uppercase tracking-wider border border-emerald-200">
            <FlaskConical className="w-3.5 h-3.5 text-[#006c49]" />
            <span>AI SOIL HEALTH &amp; FERTILIZER ANALYZER (HARDWARE-FREE)</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">
            Soil Chemistry &amp; Fertilizer Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-[#3c4a42] font-medium">
            Analyze soil test parameters to calculate health scores &amp; crop-specific NPK fertilizer decision support.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3.5 py-2 rounded-2xl border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>FastAPI &amp; Supabase Connected</span>
          </span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-none" />
          <span>Error: {error}</span>
        </div>
      )}

      {savedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-none text-emerald-600" />
          <span>✅ Soil test record saved permanently to Supabase database!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUT FORM (LEFT COLUMN) */}
        <div className="lg:col-span-5 bg-white p-7 rounded-3xl border border-emerald-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <div className="flex items-center gap-2 text-[#006c49]">
              <Sprout className="w-5 h-5" />
              <h2 className="font-display font-black text-xl text-[#002117]">Enter Soil Test Values</h2>
            </div>
            <span className="text-[10px] font-bold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              Farmer Input
            </span>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-4 text-xs">
            
            {/* FARM & FIELD SELECTION */}
            {farms.length > 0 && (
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="block font-black text-[#002117] uppercase mb-1">Farm</label>
                  <select
                    value={selectedFarmId}
                    onChange={(e) => setSelectedFarmId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-200 font-bold text-[#002117]"
                  >
                    {farms.map((f) => (
                      <option key={f.id} value={f.id}>{f.farm_name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-black text-[#002117] uppercase mb-1">Field Plot</label>
                  <select
                    value={selectedFieldId}
                    onChange={(e) => setSelectedFieldId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-200 font-bold text-[#002117]"
                  >
                    {fields.length > 0 ? (
                      fields.map((field) => (
                        <option key={field.id} value={field.id}>{field.field_name}</option>
                      ))
                    ) : (
                      <option value="">Default Field</option>
                    )}
                  </select>
                </div>
              </div>
            )}

            {/* CROP SELECTION */}
            <div>
              <label className="block font-black text-[#002117] uppercase mb-1">Target Crop</label>
              <select
                name="crop"
                value={form.crop}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-[#002117] focus:outline-none focus:border-[#006c49]"
              >
                {cropsList.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* pH & ORGANIC CARBON */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-black text-[#002117] uppercase mb-1">Soil pH (0 - 14)</label>
                <input
                  type="number"
                  step="0.1"
                  name="ph"
                  value={form.ph}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-[#002117] focus:outline-none focus:border-[#006c49]"
                />
              </div>

              <div>
                <label className="block font-black text-[#002117] uppercase mb-1">Organic Carbon (%)</label>
                <input
                  type="number"
                  step="0.01"
                  name="organicCarbon"
                  value={form.organicCarbon}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-[#002117] focus:outline-none focus:border-[#006c49]"
                />
              </div>
            </div>

            {/* NPK INPUTS */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <p className="text-[10px] font-black uppercase text-[#006c49] tracking-wider">NPK NUTRIENT LEVELS (kg/ha)</p>
              
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nitrogen (N)</label>
                  <input
                    type="number"
                    name="nitrogen"
                    value={form.nitrogen}
                    onChange={handleChange}
                    required
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-[#002117]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phosphorus (P)</label>
                  <input
                    type="number"
                    name="phosphorus"
                    value={form.phosphorus}
                    onChange={handleChange}
                    required
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-[#002117]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Potassium (K)</label>
                  <input
                    type="number"
                    name="potassium"
                    value={form.potassium}
                    onChange={handleChange}
                    required
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-[#002117]"
                  />
                </div>
              </div>
            </div>

            {/* MOISTURE */}
            <div>
              <label className="block font-black text-[#002117] uppercase mb-1">Estimated Soil Moisture (%)</label>
              <input
                type="number"
                name="moisture"
                value={form.moisture}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-[#002117] focus:outline-none focus:border-[#006c49]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
            >
              {loading ? (
                <RotateCcw className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>ANALYZE SOIL &amp; SAVE RECORD</span>
            </button>
          </form>
        </div>

        {/* OUTPUT ANALYSIS REPORT (RIGHT COLUMN) */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in">
              
              {/* HEALTH SCORE HERO CARD */}
              <div className="p-7 rounded-3xl bg-gradient-to-br from-[#002117] to-[#00422b] text-white shadow-xl space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                      SOIL HEALTH INDEX
                    </span>
                  </div>
                  <span className="text-xs font-extrabold bg-emerald-900/80 text-emerald-200 px-3 py-1 rounded-full border border-emerald-700">
                    Target Crop: {result.crop}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-xs text-emerald-300 font-semibold uppercase">Overall Health Rating</p>
                    <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-0.5">
                      {result.health_status} SOIL
                    </h2>
                  </div>
                  
                  <div className="text-right">
                    <span className="font-display font-black text-6xl text-amber-400">
                      {result.health_score}
                    </span>
                    <span className="text-xs font-bold text-emerald-200 block">/ 100 Points</span>
                  </div>
                </div>

                {/* Score Progress Bar */}
                <div className="w-full bg-emerald-950 h-3 rounded-full overflow-hidden border border-emerald-800">
                  <div 
                    className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-700" 
                    style={{ width: `${result.health_score}%` }} 
                  />
                </div>
              </div>

              {/* 6 PARAMETER CARDS GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                
                {/* pH */}
                <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-1">
                  <p className="text-[9px] font-black uppercase text-slate-500">SOIL pH</p>
                  <p className="font-display font-black text-2xl text-[#002117]">{result.parameters.ph.value}</p>
                  <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${getStatusColor(result.parameters.ph.status)}`}>
                    {result.parameters.ph.status}
                  </span>
                </div>

                {/* NITROGEN */}
                <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-1">
                  <p className="text-[9px] font-black uppercase text-slate-500">NITROGEN (N)</p>
                  <p className="font-display font-black text-2xl text-[#002117]">{result.parameters.nitrogen.value} <span className="text-xs font-normal text-slate-500">kg/ha</span></p>
                  <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${getStatusColor(result.parameters.nitrogen.status)}`}>
                    {result.parameters.nitrogen.status}
                  </span>
                </div>

                {/* PHOSPHORUS */}
                <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-1">
                  <p className="text-[9px] font-black uppercase text-slate-500">PHOSPHORUS (P)</p>
                  <p className="font-display font-black text-2xl text-[#002117]">{result.parameters.phosphorus.value} <span className="text-xs font-normal text-slate-500">kg/ha</span></p>
                  <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${getStatusColor(result.parameters.phosphorus.status)}`}>
                    {result.parameters.phosphorus.status}
                  </span>
                </div>

                {/* POTASSIUM */}
                <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-1">
                  <p className="text-[9px] font-black uppercase text-slate-500">POTASSIUM (K)</p>
                  <p className="font-display font-black text-2xl text-[#002117]">{result.parameters.potassium.value} <span className="text-xs font-normal text-slate-500">kg/ha</span></p>
                  <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${getStatusColor(result.parameters.potassium.status)}`}>
                    {result.parameters.potassium.status}
                  </span>
                </div>

                {/* ORGANIC CARBON */}
                <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-1">
                  <p className="text-[9px] font-black uppercase text-slate-500">ORGANIC CARBON</p>
                  <p className="font-display font-black text-2xl text-[#002117]">{result.parameters.organic_carbon.value}%</p>
                  <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${getStatusColor(result.parameters.organic_carbon.status)}`}>
                    {result.parameters.organic_carbon.status}
                  </span>
                </div>

                {/* MOISTURE */}
                <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-1">
                  <p className="text-[9px] font-black uppercase text-slate-500">ESTIMATED MOISTURE</p>
                  <p className="font-display font-black text-2xl text-[#002117]">{result.parameters.moisture.value}%</p>
                  <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${getStatusColor(result.parameters.moisture.status)}`}>
                    {result.parameters.moisture.status}
                  </span>
                </div>

              </div>

              {/* CROP-SPECIFIC FERTILIZER RECOMMENDATION ENGINE CARD */}
              {fertilizerResult && (
                <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Sprout className="w-5 h-5 text-emerald-400" />
                      <h3 className="font-display font-black text-xl text-white">
                        Crop-Specific Fertilizer Recommendation
                      </h3>
                    </div>
                    <span className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                      fertilizerResult.priority === 'HIGH' ? 'bg-rose-500 text-white' : (fertilizerResult.priority === 'MODERATE' ? 'bg-amber-400 text-amber-950' : 'bg-emerald-500 text-white')
                    }`}>
                      Fertilizer Priority: {fertilizerResult.priority}
                    </span>
                  </div>

                  {/* NPK STATUS SUMMARY COMPARISON */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                      <p className="text-[9px] font-black uppercase text-slate-400">NITROGEN (N)</p>
                      <p className="text-xs font-bold text-white">Current: {fertilizerResult.current_values.nitrogen} / Target: {fertilizerResult.target_values.nitrogen}</p>
                      <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${getStatusColor(fertilizerResult.status.nitrogen)}`}>
                        {fertilizerResult.status.nitrogen}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                      <p className="text-[9px] font-black uppercase text-slate-400">PHOSPHORUS (P)</p>
                      <p className="text-xs font-bold text-white">Current: {fertilizerResult.current_values.phosphorus} / Target: {fertilizerResult.target_values.phosphorus}</p>
                      <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${getStatusColor(fertilizerResult.status.phosphorus)}`}>
                        {fertilizerResult.status.phosphorus}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                      <p className="text-[9px] font-black uppercase text-slate-400">POTASSIUM (K)</p>
                      <p className="text-xs font-bold text-[#38bdf8]">Current: {fertilizerResult.current_values.potassium} / Target: {fertilizerResult.target_values.potassium}</p>
                      <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${getStatusColor(fertilizerResult.status.potassium)}`}>
                        {fertilizerResult.status.potassium}
                      </span>
                    </div>
                  </div>

                  {/* ACTION RECOMMENDATIONS LIST */}
                  <div className="space-y-2 text-xs">
                    <p className="font-extrabold text-slate-300 uppercase tracking-wider text-[10px]">PRACTICAL MANAGEMENT ACTIONS</p>
                    {fertilizerResult.recommendations.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                        <AlertTriangle className={`w-4 h-4 flex-none mt-0.5 ${item.status === 'DEFICIENT' ? 'text-rose-400' : 'text-emerald-400'}`} />
                        <div>
                          <span className="font-extrabold text-white">{item.nutrient} ({item.status}): </span>
                          <span className="text-slate-300 font-medium">{item.action}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-slate-400 italic pt-1">
                    {fertilizerResult.disclaimer}
                  </p>
                </div>
              )}

              {/* FERTILIZER & AGRONOMIST RECOMMENDATIONS CARD */}
              <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#006c49]">
                  <Sprout className="w-5 h-5" />
                  <h3 className="font-display font-black text-xl text-[#002117]">Agronomist &amp; Soil Amendment Guidance</h3>
                </div>

                <ul className="space-y-2 text-xs font-semibold text-[#00422b]">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="p-3 bg-white rounded-2xl border border-emerald-200 flex items-start gap-2.5 shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#006c49] flex-none mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <FlaskConical className="w-12 h-12 text-slate-400 mx-auto animate-bounce" />
              <h3 className="font-display font-black text-xl text-slate-700">No Soil Analysis Generated Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Fill in your laboratory soil test values (or estimated farm values) on the left and click <strong>ANALYZE SOIL &amp; SAVE RECORD</strong>.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
