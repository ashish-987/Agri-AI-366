import React, { useEffect, useState } from 'react';
import { 
  Sprout, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Calendar,
  RotateCcw,
  Tag,
  TrendingUp
} from 'lucide-react';
import {
  getCrops,
  createCrop,
  deleteCrop
} from '../services/api';

export default function CropManagement() {
  const FIELD_ID = "YOUR-FIELD-UUID";

  const [crops, setCrops] = useState([]);
  const [cropName, setCropName] = useState("Wheat");
  const [variety, setVariety] = useState("");
  const [stage, setStage] = useState("Sowing");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadCrops = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await getCrops(FIELD_ID);
      setCrops(result.crops || []);
    } catch (err) {
      console.error('Failed to load crops:', err);
      setError(err.message || 'Unable to fetch crops');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCrops();
  }, []);

  const handleCreate = async (e) => {
    if (e) e.preventDefault();

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await createCrop({
        field_id: FIELD_ID,
        crop_name: cropName,
        variety: variety || null,
        growth_stage: stage,
        season: "Rabi"
      });

      setVariety("");
      setSuccess('Crop created successfully!');

      await loadCrops();
    } catch (err) {
      console.error('Failed to create crop:', err);
      setError(err.message || 'Unable to create crop');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this crop?")) return;

    try {
      setError('');
      await deleteCrop(id);
      setSuccess('Crop deleted successfully!');
      await loadCrops();
    } catch (err) {
      console.error('Failed to delete crop:', err);
      setError(err.message || 'Unable to delete crop');
    }
  };

  return (
    <div className="space-y-8 py-2 w-full px-4 sm:px-6 animate-in fade-in">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#006c49] text-[11px] font-extrabold uppercase tracking-wider border border-emerald-200">
            <Sprout className="w-3.5 h-3.5 text-[#006c49]" />
            <span>CROP CYCLE &amp; CULTIVATION ENGINE</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">
            🌱 Crop Management &amp; Growth Tracking
          </h1>
          <p className="text-xs sm:text-sm text-[#3c4a42] font-medium">
            Register crop varieties, sowing dates, &amp; growth stage milestones synced with FastAPI &amp; Supabase.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3.5 py-2 rounded-2xl border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>FastAPI Crops API Synced</span>
          </span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-none" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-none" />
          <span>{success}</span>
        </div>
      )}

      {/* CROP ADD FORM */}
      <form onSubmit={handleCreate} className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
        <h2 className="font-display font-black text-xl text-[#002117]">Register New Crop</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
          <div>
            <label className="block text-slate-700 mb-1">Crop Type *</label>
            <select
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[#002117] focus:outline-none focus:border-[#006c49]"
            >
              <option>Wheat</option>
              <option>Rice</option>
              <option>Maize</option>
              <option>Tomato</option>
              <option>Potato</option>
              <option>Soybean</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Crop Variety</label>
            <input
              type="text"
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              placeholder="e.g. PBW 550 / Hybrid"
              className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[#002117] focus:outline-none focus:border-[#006c49]"
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Growth Stage</label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[#002117] focus:outline-none focus:border-[#006c49]"
            >
              <option>Sowing</option>
              <option>Vegetative</option>
              <option>Flowering</option>
              <option>Fruiting</option>
              <option>Harvesting</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          <span>ADD CROP RECORD</span>
        </button>
      </form>

      {/* CROPS LIST */}
      <div className="space-y-4">
        <h2 className="font-display font-black text-2xl text-[#002117]">Active Field Crops</h2>

        {loading ? (
          <p className="text-xs font-bold text-slate-500">Loading crops...</p>
        ) : crops.length === 0 ? (
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center text-xs font-bold text-slate-500">
            No crops registered for this field plot yet. Add your first crop above!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all"
              >
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-[#006c49]" />
                    <h3 className="font-display font-black text-lg text-[#002117]">
                      {crop.crop_name}
                    </h3>
                  </div>
                  
                  <p className="text-slate-600 font-semibold flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-slate-400" />
                    Variety: <span className="font-extrabold text-[#002117]">{crop.variety || "Not specified"}</span>
                  </p>
                  
                  <p className="text-slate-600 font-semibold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    Stage: <span className="font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">{crop.growth_stage || "Not specified"}</span>
                  </p>
                  
                  <p className="text-slate-600 font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Season: <span className="font-extrabold text-[#002117]">{crop.season || "Not specified"}</span>
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(crop.id)}
                  className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                  title="Delete Crop"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
