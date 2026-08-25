import React, { useEffect, useState } from 'react';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Sprout, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import {
  getFields,
  createField,
  deleteField,
  getFarms
} from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function FieldManagement() {
  const { user } = useAuth();
  
  const [farms, setFarms] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState('');
  
  const [fields, setFields] = useState([]);
  const [fieldName, setFieldName] = useState('');
  const [area, setArea] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load farms first to pick active farm ID
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
        console.warn('Failed to load user farms:', err);
      }
    }
    loadFarmsList();
  }, [user?.id]);

  const loadFields = async (farmId) => {
    const targetFarmId = farmId || selectedFarmId || 'YOUR-FARM-UUID';
    if (!targetFarmId) return;

    try {
      setLoading(true);
      setError('');
      const result = await getFields(targetFarmId);
      setFields(result.fields || []);
    } catch (err) {
      console.error('Failed to load fields:', err);
      setError(err.message || 'Unable to fetch fields');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedFarmId) {
      loadFields(selectedFarmId);
    }
  }, [selectedFarmId]);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!fieldName) {
      setError('Please enter a field name');
      return;
    }

    const targetFarmId = selectedFarmId || 'YOUR-FARM-UUID';

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await createField({
        farm_id: targetFarmId,
        field_name: fieldName,
        area_acres: Number(area) || null
      });

      setFieldName('');
      setArea('');
      setSuccess('Field created successfully!');

      await loadFields(targetFarmId);
    } catch (err) {
      console.error('Failed to create field:', err);
      setError(err.message || 'Unable to create field');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this field?')) {
      return;
    }

    try {
      setError('');
      await deleteField(id);
      setSuccess('Field deleted successfully!');
      await loadFields(selectedFarmId);
    } catch (err) {
      console.error('Failed to delete field:', err);
      setError(err.message || 'Unable to delete field');
    }
  };

  return (
    <div className="space-y-8 py-2 w-full px-4 sm:px-6 animate-in fade-in">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#006c49] text-[11px] font-extrabold uppercase tracking-wider border border-emerald-200">
            <Layers className="w-3.5 h-3.5 text-[#006c49]" />
            <span>FIELD SECTOR MANAGEMENT ENGINE</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">
            🌾 Field Management &amp; Sectors
          </h1>
          <p className="text-xs sm:text-sm text-[#3c4a42] font-medium">
            Define farm field plots, acreage dimensions, &amp; sector subdivisions synced with FastAPI &amp; Supabase.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3.5 py-2 rounded-2xl border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>FastAPI Fields API Synced</span>
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

      {/* FARM SELECTOR (IF MULTIPLE FARMS EXIST) */}
      {farms.length > 1 && (
        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm">
          <label className="text-xs font-black uppercase text-[#002117]">Select Farm:</label>
          <select
            value={selectedFarmId}
            onChange={(e) => setSelectedFarmId(e.target.value)}
            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-xs text-[#002117]"
          >
            {farms.map((f) => (
              <option key={f.id} value={f.id}>{f.farm_name}</option>
            ))}
          </select>
        </div>
      )}

      {/* FIELD ADD FORM */}
      <form onSubmit={handleCreate} className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
        <h2 className="font-display font-black text-xl text-[#002117]">Add New Field Plot</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
          <div>
            <label className="block text-slate-700 mb-1">Field Name *</label>
            <input
              type="text"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              placeholder="e.g. Field A (North Sector)"
              required
              className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[#002117] focus:outline-none focus:border-[#006c49]"
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Area (Acres)</label>
            <input
              type="number"
              step="0.1"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. 2.5"
              className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[#002117] focus:outline-none focus:border-[#006c49]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          <span>ADD FIELD PLOT</span>
        </button>
      </form>

      {/* FIELD PLOTS LIST */}
      <div className="space-y-4">
        <h2 className="font-display font-black text-2xl text-[#002117]">Existing Field Plots</h2>

        {loading ? (
          <p className="text-xs font-bold text-slate-500">Loading fields...</p>
        ) : fields.length === 0 ? (
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center text-xs font-bold text-slate-500">
            No fields created for this farm yet. Add your first field plot above!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-[#006c49]" />
                    <h3 className="font-display font-black text-lg text-[#002117]">
                      {field.field_name}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-slate-600">
                    Acreage: <span className="font-extrabold text-[#002117]">{field.area_acres || 0} acres</span>
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(field.id)}
                  className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                  title="Delete Field"
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
