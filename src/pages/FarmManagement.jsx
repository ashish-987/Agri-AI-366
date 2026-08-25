import React, { useEffect, useState } from 'react';
import { 
  Layers, 
  Sprout, 
  TrendingUp, 
  Droplets, 
  Activity, 
  DollarSign, 
  Sparkles, 
  Check, 
  Globe, 
  ShieldCheck, 
  Plus, 
  RefreshCw, 
  Trash2, 
  Edit3,
  MapPin, 
  AlertCircle,
  CheckCircle2,
  Calendar,
  FlaskConical,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getMyFarms,
  createFarm,
  updateFarm,
  deleteFarm
} from '../services/farmService';
import {
  getFields,
  createField,
  updateField,
  deleteField
} from '../services/fieldService';
import {
  getCrops,
  createCrop,
  updateCrop,
  deleteCrop
} from '../services/cropService';
import {
  getSoilRecords,
  createSoilRecord,
  updateSoilRecord,
  deleteSoilRecord
} from '../services/soilService';

export default function FarmManagement() {
  const { user, isLoggedIn } = useAuth();

  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [activeFarmId, setActiveFarmId] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);

  const [irrigationActive, setIrrigationActive] = useState(false);
  const [actionNotice, setActionNotice] = useState('');

  // Farm Form State
  const [farmForm, setFarmForm] = useState({
    farmName: '',
    state: '',
    district: '',
    village: '',
    areaAcres: '',
    latitude: '',
    longitude: ''
  });
  const [savingFarm, setSavingFarm] = useState(false);

  // Edit Farm State
  const [editingFarm, setEditingFarm] = useState(null);
  const [editFarmForm, setEditFarmForm] = useState({
    farmName: '',
    state: '',
    district: '',
    village: '',
    areaAcres: ''
  });

  // Field Form & Fields State
  const [fieldForm, setFieldForm] = useState({
    fieldName: '',
    areaAcres: '',
    latitude: '',
    longitude: ''
  });
  const [savingField, setSavingField] = useState(false);
  const [fields, setFields] = useState([]);
  const [loadingFields, setLoadingFields] = useState(false);

  // Field Edit State (STEP 2.21.11)
  const [editingField, setEditingField] = useState(null);
  const [editFieldForm, setEditFieldForm] = useState({
    fieldName: '',
    areaAcres: '',
    latitude: '',
    longitude: ''
  });

  // Crop Form & Crops State
  const [crops, setCrops] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [loadingCrops, setLoadingCrops] = useState(false);
  const [savingCrop, setSavingCrop] = useState(false);

  const [cropForm, setCropForm] = useState({
    cropName: '',
    variety: '',
    sowingDate: '',
    expectedHarvestDate: '',
    growthStage: '',
    season: ''
  });

  // Crop Edit State (STEP 2.21.16)
  const [editingCrop, setEditingCrop] = useState(null);
  const [editCropForm, setEditCropForm] = useState({
    cropName: '',
    variety: '',
    sowingDate: '',
    expectedHarvestDate: '',
    growthStage: '',
    season: ''
  });

  // Soil Form & Soil Records State
  const [soilRecords, setSoilRecords] = useState([]);
  const [loadingSoil, setLoadingSoil] = useState(false);
  const [savingSoil, setSavingSoil] = useState(false);

  const [soilForm, setSoilForm] = useState({
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicCarbon: '',
    moisture: '',
    source: 'user_input',
    testDate: ''
  });

  // Soil Edit State (STEP 2.21.21)
  const [editingSoil, setEditingSoil] = useState(null);
  const [editSoilForm, setEditSoilForm] = useState({
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicCarbon: '',
    moisture: '',
    source: '',
    testDate: ''
  });

  // Load farms
  useEffect(() => {
    fetchFarms();
  }, [user?.id]);

  // Load fields when selectedFarm changes
  useEffect(() => {
    if (!selectedFarm?.id) {
      setFields([]);
      setSelectedField(null);
      return;
    }

    loadFields(selectedFarm.id);
  }, [selectedFarm?.id]);

  // Load crops when selectedField changes
  useEffect(() => {
    if (!selectedField?.id) {
      setCrops([]);
      return;
    }

    loadCrops(selectedField.id);
  }, [selectedField?.id]);

  // Load soil records when selectedField changes
  useEffect(() => {
    if (!selectedField?.id) {
      setSoilRecords([]);
      return;
    }

    loadSoilRecords(selectedField.id);
  }, [selectedField?.id]);

  const fetchFarms = async () => {
    try {
      setLoading(true);
      setError('');

      const USER_ID = user?.id || "YOUR-AUTH-USER-UUID";

      const response = await fetch(
        `http://127.0.0.1:8000/farms/${USER_ID}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to fetch farms");
      }

      const farmList = data.farms || [];
      setFarms(farmList);

      if (farmList.length > 0) {
        const initial = farmList[0];
        setActiveFarmId((prev) => (farmList.some((f) => f.id === prev) ? prev : initial.id));
        setSelectedFarm((prev) => (farmList.find((f) => f.id === prev?.id) || initial));
      } else {
        setActiveFarmId(null);
        setSelectedFarm(null);
      }
    } catch (error) {
      console.error("Farm fetch error:", error);
      setError(error.message || "Failed to fetch farms");
    } finally {
      setLoading(false);
    }
  };

  const loadFields = async (farmId) => {
    try {
      setLoadingFields(true);
      setError('');

      const data = await getFields(farmId);
      setFields(data);
      if (data && data.length > 0) {
        setSelectedField(data[0]);
      } else {
        setSelectedField(null);
      }
    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Unable to load fields.'
      );
    } finally {
      setLoadingFields(false);
    }
  };

  const loadCrops = async (fieldId) => {
    try {
      setLoadingCrops(true);
      setError('');

      const data = await getCrops(fieldId);
      setCrops(data);
    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Unable to load crops.'
      );
    } finally {
      setLoadingCrops(false);
    }
  };

  const loadSoilRecords = async (fieldId) => {
    try {
      setLoadingSoil(true);
      setError('');

      const data = await getSoilRecords(fieldId);
      setSoilRecords(data);
    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Unable to load soil records.'
      );
    } finally {
      setLoadingSoil(false);
    }
  };

  const handleCreateFarm = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      setError('Please login first.');
      return;
    }

    try {
      setSavingFarm(true);
      setError('');
      setSuccess('');

      const farmPayload = {
        user_id: user.id,
        farm_name: farmForm.farmName,
        state: farmForm.state || null,
        district: farmForm.district || null,
        village: farmForm.village || null,
        area_acres: farmForm.areaAcres ? parseFloat(farmForm.areaAcres) : null,
        latitude: farmForm.latitude ? parseFloat(farmForm.latitude) : null,
        longitude: farmForm.longitude ? parseFloat(farmForm.longitude) : null
      };

      // Create farm via FastAPI endpoint
      const response = await fetch('http://127.0.0.1:8000/farms/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(farmPayload)
      });

      const resData = await response.json();

      let createdFarmObj = null;
      if (resData?.success && resData?.farm) {
        createdFarmObj = Array.isArray(resData.farm) ? resData.farm[0] : resData.farm;
      }

      if (!createdFarmObj) {
        // Fallback to Supabase farm service
        createdFarmObj = await createFarm({
          userId: user.id,
          farmName: farmForm.farmName,
          state: farmForm.state,
          district: farmForm.district,
          village: farmForm.village,
          areaAcres: farmForm.areaAcres,
          latitude: farmForm.latitude,
          longitude: farmForm.longitude
        });
      }

      setFarms((previous) => [
        createdFarmObj,
        ...previous
      ]);

      setFarmForm({
        farmName: '',
        state: '',
        district: '',
        village: '',
        areaAcres: '',
        latitude: '',
        longitude: ''
      });

      setActiveFarmId(createdFarmObj.id || createdFarmObj.farm_name);
      setSelectedFarm(createdFarmObj);
      setSuccess('Farm added successfully.');
      setActionNotice(`✅ Added farm "${createdFarmObj.farm_name}" successfully!`);
      setTimeout(() => setActionNotice(''), 5000);

    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Unable to create farm.'
      );
    } finally {
      setSavingFarm(false);
    }
  };

  const handleCreateTestFarm = async () => {
    if (!user?.id) {
      setError('Please login first.');
      return;
    }
    try {
      setSavingFarm(true);
      setError('');
      setSuccess('');
      const count = farms.length + 1;
      const testFarm = await createFarm({
        userId: user.id,
        farmName: `Green Valley Farm #${count}`,
        state: user?.state || 'Punjab',
        district: user?.district || 'Ludhiana',
        village: user?.village || 'Samrala',
        areaAcres: 12.5,
        latitude: 30.901,
        longitude: 75.857
      });

      setFarms((previous) => [testFarm, ...previous]);
      setActionNotice(`🌱 Added test farm "${testFarm.farm_name}"!`);
      setTimeout(() => setActionNotice(''), 5000);
      setActiveFarmId(testFarm.id);
      setSelectedFarm(testFarm);
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Failed to create test farm.');
    } finally {
      setSavingFarm(false);
    }
  };

  // Start editing a farm
  const handleEditFarm = (farm) => {
    setEditingFarm(farm);

    setEditFarmForm({
      farmName: farm.farm_name || '',
      state: farm.state || '',
      district: farm.district || '',
      village: farm.village || '',
      areaAcres: farm.area_acres || ''
    });
  };

  // Save edited farm
  const handleUpdateFarm = async (e) => {
    e.preventDefault();

    if (!editingFarm?.id) {
      return;
    }

    try {
      setSavingFarm(true);
      setError('');
      setSuccess('');

      const updatedFarm = await updateFarm(
        editingFarm.id,
        {
          farm_name: editFarmForm.farmName.trim(),
          state: editFarmForm.state.trim() || null,
          district: editFarmForm.district.trim() || null,
          village: editFarmForm.village.trim() || null,
          area_acres:
            editFarmForm.areaAcres === ''
              ? null
              : Number(editFarmForm.areaAcres)
        }
      );

      setFarms((previous) =>
        previous.map((farm) =>
          farm.id === updatedFarm.id
            ? updatedFarm
            : farm
        )
      );

      if (selectedFarm?.id === updatedFarm.id) {
        setSelectedFarm(updatedFarm);
      }

      setEditingFarm(null);

      setSuccess('Farm updated successfully.');
      setActionNotice(`✏️ Updated farm "${updatedFarm.farm_name}"!`);
      setTimeout(() => setActionNotice(''), 5000);

    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Unable to update farm.'
      );
    } finally {
      setSavingFarm(false);
    }
  };

  // Delete Farm
  const handleDeleteFarm = async (farm) => {
    const confirmed = window.confirm(
      `Delete "${farm.farm_name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');
      setSuccess('');

      await deleteFarm(farm.id);

      setFarms((previous) =>
        previous.filter(
          (item) => item.id !== farm.id
        )
      );

      if (selectedFarm?.id === farm.id) {
        setSelectedFarm(null);
      }

      setSuccess('Farm deleted successfully.');
      setActionNotice(`🗑️ Deleted farm "${farm.farm_name}".`);
      setTimeout(() => setActionNotice(''), 5000);

    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Unable to delete farm.'
      );
    }
  };

  const handleCreateField = async (e) => {
    e.preventDefault();

    if (!selectedFarm?.id) {
      setError('Please select a farm first.');
      return;
    }

    try {
      setSavingField(true);
      setError('');
      setSuccess('');

      const newField = await createField({
        farmId: selectedFarm.id,
        fieldName: fieldForm.fieldName,
        areaAcres: fieldForm.areaAcres,
        latitude: fieldForm.latitude,
        longitude: fieldForm.longitude
      });

      setFields((previous) => [
        newField,
        ...previous
      ]);

      setFieldForm({
        fieldName: '',
        areaAcres: '',
        latitude: '',
        longitude: ''
      });

      setSelectedField(newField);
      setSuccess('Field added successfully.');
      setActionNotice(`🌱 Created field "${newField.field_name}" under ${selectedFarm.farm_name}!`);
      setTimeout(() => setActionNotice(''), 5000);

    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Unable to create field.'
      );
    } finally {
      setSavingField(false);
    }
  };

  // STEP 2.21.12 — Start editing field
  const handleEditField = (field) => {
    setEditingField(field);

    setEditFieldForm({
      fieldName: field.field_name || '',
      areaAcres: field.area_acres || '',
      latitude: field.latitude || '',
      longitude: field.longitude || ''
    });
  };

  // STEP 2.21.13 — Update field
  const handleUpdateField = async (e) => {
    e.preventDefault();

    if (!editingField?.id) {
      return;
    }

    try {
      setSavingField(true);
      setError('');
      setSuccess('');

      const updatedField = await updateField(
        editingField.id,
        {
          field_name: editFieldForm.fieldName.trim(),
          area_acres:
            editFieldForm.areaAcres === ''
              ? null
              : Number(editFieldForm.areaAcres),
          latitude:
            editFieldForm.latitude === ''
              ? null
              : Number(editFieldForm.latitude),
          longitude:
            editFieldForm.longitude === ''
              ? null
              : Number(editFieldForm.longitude)
        }
      );

      setFields((previous) =>
        previous.map((field) =>
          field.id === updatedField.id
            ? updatedField
            : field
        )
      );

      if (selectedField?.id === updatedField.id) {
        setSelectedField(updatedField);
      }

      setEditingField(null);

      setSuccess('Field updated successfully.');
      setActionNotice(`✏️ Updated field "${updatedField.field_name}"!`);
      setTimeout(() => setActionNotice(''), 5000);

    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Unable to update field.'
      );
    } finally {
      setSavingField(false);
    }
  };

  // STEP 2.21.14 — Field Delete
  const handleDeleteField = async (field) => {
    const confirmed = window.confirm(
      `Delete "${field.field_name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');
      setSuccess('');

      await deleteField(field.id);

      setFields((previous) =>
        previous.filter(
          (item) => item.id !== field.id
        )
      );

      if (selectedField?.id === field.id) {
        setSelectedField(null);
      }

      setSuccess('Field deleted successfully.');
      setActionNotice(`🗑️ Deleted field "${field.field_name}".`);
      setTimeout(() => setActionNotice(''), 5000);

    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Unable to delete field.'
      );
    }
  };

  const handleCreateCrop = async (e) => {
    e.preventDefault();

    if (!selectedField?.id) {
      setError('Please select a field first.');
      return;
    }

    try {
      setSavingCrop(true);
      setError('');
      setSuccess('');

      const newCrop = await createCrop({
        fieldId: selectedField.id,
        cropName: cropForm.cropName,
        variety: cropForm.variety,
        sowingDate: cropForm.sowingDate,
        expectedHarvestDate: cropForm.expectedHarvestDate,
        growthStage: cropForm.growthStage,
        season: cropForm.season
      });

      setCrops((previous) => [
        newCrop,
        ...previous
      ]);

      setCropForm({
        cropName: '',
        variety: '',
        sowingDate: '',
        expectedHarvestDate: '',
        growthStage: '',
        season: ''
      });

      setSuccess('Crop added successfully.');
      setActionNotice(`🌾 Created crop "${newCrop.crop_name}" under ${selectedField.field_name}!`);
      setTimeout(() => setActionNotice(''), 5000);

    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Unable to add crop.'
      );
    } finally {
      setSavingCrop(false);
    }
  };

  // STEP 2.21.17 — Edit crop
  const handleEditCrop = (crop) => {
    setEditingCrop(crop);

    setEditCropForm({
      cropName: crop.crop_name || '',
      variety: crop.variety || '',
      sowingDate: crop.sowing_date || '',
      expectedHarvestDate: crop.expected_harvest_date || '',
      growthStage: crop.growth_stage || '',
      season: crop.season || ''
    });
  };

  // STEP 2.21.18 — Save crop
  const handleUpdateCrop = async (e) => {
    e.preventDefault();

    if (!editingCrop?.id) {
      return;
    }

    try {
      setSavingCrop(true);
      setError('');
      setSuccess('');

      const updatedCrop = await updateCrop(
        editingCrop.id,
        {
          crop_name: editCropForm.cropName.trim(),
          variety: editCropForm.variety.trim() || null,
          sowing_date: editCropForm.sowingDate || null,
          expected_harvest_date: editCropForm.expectedHarvestDate || null,
          growth_stage: editCropForm.growthStage || null,
          season: editCropForm.season || null
        }
      );

      setCrops((previous) =>
        previous.map((crop) =>
          crop.id === updatedCrop.id
            ? updatedCrop
            : crop
        )
      );

      setEditingCrop(null);

      setSuccess('Crop updated successfully.');
      setActionNotice(`✏️ Updated crop "${updatedCrop.crop_name}"!`);
      setTimeout(() => setActionNotice(''), 5000);

    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Unable to update crop.'
      );
    } finally {
      setSavingCrop(false);
    }
  };

  // STEP 2.21.19 — Delete crop
  const handleDeleteCrop = async (crop) => {
    const confirmed = window.confirm(
      `Delete "${crop.crop_name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');
      setSuccess('');

      await deleteCrop(crop.id);

      setCrops((previous) =>
        previous.filter(
          (item) => item.id !== crop.id
        )
      );

      setSuccess('Crop deleted successfully.');
      setActionNotice(`🗑️ Deleted crop "${crop.crop_name}".`);
      setTimeout(() => setActionNotice(''), 5000);

    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Unable to delete crop.'
      );
    }
  };

  const handleCreateSoilRecord = async (e) => {
    e.preventDefault();

    if (!selectedField?.id) {
      setError('Please select a field first.');
      return;
    }

    try {
      setSavingSoil(true);
      setError('');
      setSuccess('');

      const newRecord = await createSoilRecord({
        fieldId: selectedField.id,
        ph: soilForm.ph,
        nitrogen: soilForm.nitrogen,
        phosphorus: soilForm.phosphorus,
        potassium: soilForm.potassium,
        organicCarbon: soilForm.organicCarbon,
        moisture: soilForm.moisture,
        source: soilForm.source,
        testDate: soilForm.testDate
      });

      setSoilRecords((previous) => [
        newRecord,
        ...previous
      ]);

      setSoilForm({
        ph: '',
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        organicCarbon: '',
        moisture: '',
        source: 'user_input',
        testDate: ''
      });

      setSuccess('Soil record added successfully.');
      setActionNotice(`🧪 Added soil test record for ${selectedField.field_name}!`);
      setTimeout(() => setActionNotice(''), 5000);

    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Unable to save soil record.'
      );
    } finally {
      setSavingSoil(false);
    }
  };

  // STEP 2.21.22 — Start soil editing
  const handleEditSoil = (soil) => {
    setEditingSoil(soil);

    setEditSoilForm({
      ph: soil.ph ?? '',
      nitrogen: soil.nitrogen ?? '',
      phosphorus: soil.phosphorus ?? '',
      potassium: soil.potassium ?? '',
      organicCarbon: soil.organic_carbon ?? '',
      moisture: soil.moisture ?? '',
      source: soil.source || 'user_input',
      testDate: soil.test_date || ''
    });
  };

  // STEP 2.21.23 — Update soil
  const handleUpdateSoil = async (e) => {
    e.preventDefault();

    if (!editingSoil?.id) {
      return;
    }

    try {
      setSavingSoil(true);
      setError('');
      setSuccess('');

      const updatedSoil = await updateSoilRecord(
        editingSoil.id,
        {
          ph:
            editSoilForm.ph === ''
              ? null
              : Number(editSoilForm.ph),
          nitrogen:
            editSoilForm.nitrogen === ''
              ? null
              : Number(editSoilForm.nitrogen),
          phosphorus:
            editSoilForm.phosphorus === ''
              ? null
              : Number(editSoilForm.phosphorus),
          potassium:
            editSoilForm.potassium === ''
              ? null
              : Number(editSoilForm.potassium),
          organic_carbon:
            editSoilForm.organicCarbon === ''
              ? null
              : Number(editSoilForm.organicCarbon),
          moisture:
            editSoilForm.moisture === ''
              ? null
              : Number(editSoilForm.moisture),
          source:
            editSoilForm.source || 'user_input',
          test_date:
            editSoilForm.testDate || null
        }
      );

      setSoilRecords((previous) =>
        previous.map((soil) =>
          soil.id === updatedSoil.id
            ? updatedSoil
            : soil
        )
      );

      setEditingSoil(null);

      setSuccess('Soil record updated successfully.');
      setActionNotice(`✏️ Updated soil test record!`);
      setTimeout(() => setActionNotice(''), 5000);

    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Unable to update soil record.'
      );
    } finally {
      setSavingSoil(false);
    }
  };

  // STEP 2.21.24 — Delete soil record
  const handleDeleteSoil = async (soil) => {
    const confirmed = window.confirm(
      'Delete this soil test?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');
      setSuccess('');

      await deleteSoilRecord(soil.id);

      setSoilRecords((previous) =>
        previous.filter(
          (item) => item.id !== soil.id
        )
      );

      setSuccess('Soil record deleted successfully.');
      setActionNotice(`🗑️ Deleted soil test record.`);
      setTimeout(() => setActionNotice(''), 5000);

    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'Unable to delete soil record.'
      );
    }
  };

  const currentFarm = selectedFarm || farms.find((f) => f.id === activeFarmId) || farms[0] || null;

  const triggerIrrigation = () => {
    setIrrigationActive(true);
    const targetName = currentFarm ? currentFarm.farm_name : 'Selected Sector';
    setActionNotice('💧 Drip Irrigation schedule activated for ' + targetName + ' based on satellite soil moisture index.');
    setTimeout(() => setActionNotice(''), 5000);
  };

  const triggerScan = () => {
    setActionNotice('🛰️ High-resolution Sentinel-2 satellite NDVI telemetry refreshed! Field health optimal (NDVI 0.84).');
    setTimeout(() => setActionNotice(''), 5000);
  };

  const totalAcres = farms.reduce((acc, f) => acc + (Number(f.area_acres) || 0), 0);

  return (
    <div className="space-y-8 py-2 w-full px-4 sm:px-6 animate-in fade-in">
      {/* Toast Notification */}
      {actionNotice && (
        <div className="p-4 rounded-2xl bg-[#00422b] text-white font-bold text-xs flex items-center justify-between shadow-xl animate-in fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice('')} className="p-1 text-emerald-300 hover:text-white">✕</button>
        </div>
      )}

      {/* Success Notice */}
      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{success}</span>
          </div>
          <button onClick={() => setSuccess('')} className="p-1 text-emerald-500 hover:text-emerald-800">✕</button>
        </div>
      )}

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError('')} className="p-1 text-rose-500 hover:text-rose-800">✕</button>
        </div>
      )}

      {/* TOP HEADER & MISSION CONTROL BAR */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-emerald-100 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#006c49] text-[11px] font-extrabold uppercase tracking-wider border border-emerald-200">
            <Globe className="w-3.5 h-3.5 text-[#006c49] animate-pulse" />
            <span>SATELLITE &amp; AI ANALYTICS • SUPABASE CONNECTED</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">
            Farm Operations &amp; Crop Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-[#3c4a42] font-medium">
            Manage your farms, fields, crops, soil health tests, satellite NDVI imaging, and crop lifecycle analytics.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleCreateTestFarm}
            disabled={savingFarm || !user?.id}
            className="px-4 py-2.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold shadow-sm hover:bg-[#046a38] transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>{savingFarm ? 'Saving...' : 'Add Test Farm'}</span>
          </button>

          <button 
            onClick={triggerScan}
            className="px-4 py-2.5 rounded-2xl bg-white text-[#006c49] border border-emerald-200 text-xs font-bold shadow-sm hover:bg-emerald-50 transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#006c49]" />
            <span>Refresh NDVI</span>
          </button>

          <button 
            onClick={triggerIrrigation}
            className="px-5 py-2.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold shadow-md hover:bg-[#046a38] transition-all flex items-center gap-2"
          >
            <Droplets className="w-4 h-4 text-emerald-300" />
            <span>{irrigationActive ? 'Irrigation Schedule Active 💧' : 'Trigger Drip Irrigation'}</span>
          </button>
        </div>
      </div>

      {/* STEP 2.12 — Add Farm Form */}
      <form
        onSubmit={handleCreateFarm}
        className="bg-white rounded-3xl border border-emerald-100 p-6 space-y-4 shadow-sm"
      >
        <h2 className="text-xl font-black text-[#002117]">
          Add New Farm
        </h2>

        <input
          type="text"
          placeholder="Farm name"
          value={farmForm.farmName}
          onChange={(e) =>
            setFarmForm({
              ...farmForm,
              farmName: e.target.value
            })
          }
          required
          className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="State"
            value={farmForm.state}
            onChange={(e) =>
              setFarmForm({
                ...farmForm,
                state: e.target.value
              })
            }
            className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
          />

          <input
            type="text"
            placeholder="District"
            value={farmForm.district}
            onChange={(e) =>
              setFarmForm({
                ...farmForm,
                district: e.target.value
              })
            }
            className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
          />

          <input
            type="text"
            placeholder="Village"
            value={farmForm.village}
            onChange={(e) =>
              setFarmForm({
                ...farmForm,
                village: e.target.value
              })
            }
            className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
          />

          <input
            type="number"
            step="0.01"
            placeholder="Area in acres"
            value={farmForm.areaAcres}
            onChange={(e) =>
              setFarmForm({
                ...farmForm,
                areaAcres: e.target.value
              })
            }
            className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
          />
        </div>

        <button
          type="submit"
          disabled={savingFarm}
          className="px-6 py-3 rounded-2xl bg-[#006c49] text-white font-bold disabled:opacity-50 hover:bg-[#046a38] transition-all shadow-md text-sm"
        >
          {savingFarm
            ? 'Saving...'
            : 'Add Farm'}
        </button>
      </form>

      {/* STEP 2.13 — Display real farms */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-[#002117]">
          My Farms
        </h2>

        {loading ? (
          <div className="p-6 bg-white rounded-3xl border border-emerald-100 flex items-center gap-2 text-sm font-semibold text-[#006c49]">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Loading farms...</span>
          </div>
        ) : farms.length === 0 ? (
          <div className="p-6 bg-white rounded-3xl border border-emerald-100">
            <p className="text-sm font-semibold text-gray-500">
              You haven't added any farms yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {farms.map((farm) => (
              <div
                key={farm.id}
                className={`bg-white rounded-3xl border transition-all p-6 space-y-3 relative group ${
                  selectedFarm?.id === farm.id 
                    ? 'border-[#006c49] ring-2 ring-[#006c49]/20 shadow-md' 
                    : 'border-emerald-100 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-black text-[#002117]">
                    {farm.farm_name}
                  </h3>
                </div>

                <p className="text-sm text-gray-500">
                  {farm.village || 'Village not set'},
                  {' '}
                  {farm.district || 'District not set'},
                  {' '}
                  {farm.state || 'State not set'}
                </p>

                {farm.area_acres && (
                  <p className="text-sm font-bold text-[#006c49]">
                    {farm.area_acres} acres
                  </p>
                )}

                {/* Action buttons: Open Farm, Edit, Delete */}
                <div className="pt-3 flex flex-wrap items-center gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFarm(farm);
                      setActiveFarmId(farm.id);
                      setSelectedField(null);
                      setSuccess('');
                      setError('');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedFarm?.id === farm.id
                        ? 'bg-[#00422b] text-white shadow-sm'
                        : 'bg-[#006c49] text-white hover:bg-[#046a38]'
                    }`}
                  >
                    {selectedFarm?.id === farm.id ? 'Open Farm ✓' : 'Open Farm'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEditFarm(farm)}
                    className="px-4 py-2 rounded-xl border border-emerald-200 text-xs font-bold text-[#006c49] hover:bg-emerald-50 transition-all"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteFarm(farm)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 border border-red-200 hover:bg-red-50 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Farm Modal */}
      {editingFarm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <form
            onSubmit={handleUpdateFarm}
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl border border-emerald-100"
          >
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <h2 className="text-2xl font-black text-[#002117]">
                Edit Farm
              </h2>
              <button
                type="button"
                onClick={() => setEditingFarm(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm font-semibold">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Farm Name *</label>
                <input
                  type="text"
                  value={editFarmForm.farmName}
                  onChange={(e) =>
                    setEditFarmForm({
                      ...editFarmForm,
                      farmName: e.target.value
                    })
                  }
                  placeholder="Farm name"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">State</label>
                  <input
                    type="text"
                    value={editFarmForm.state}
                    onChange={(e) =>
                      setEditFarmForm({
                        ...editFarmForm,
                        state: e.target.value
                      })
                    }
                    placeholder="State"
                    className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">District</label>
                  <input
                    type="text"
                    value={editFarmForm.district}
                    onChange={(e) =>
                      setEditFarmForm({
                        ...editFarmForm,
                        district: e.target.value
                      })
                    }
                    placeholder="District"
                    className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Village</label>
                  <input
                    type="text"
                    value={editFarmForm.village}
                    onChange={(e) =>
                      setEditFarmForm({
                        ...editFarmForm,
                        village: e.target.value
                      })
                    }
                    placeholder="Village"
                    className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">Area (Acres)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editFarmForm.areaAcres}
                    onChange={(e) =>
                      setEditFarmForm({
                        ...editFarmForm,
                        areaAcres: e.target.value
                      })
                    }
                    placeholder="Area in acres"
                    className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={savingFarm}
                className="flex-1 py-3 rounded-2xl bg-[#006c49] text-white font-bold text-sm shadow-md hover:bg-[#046a38] transition-all disabled:opacity-50"
              >
                {savingFarm
                  ? 'Saving...'
                  : 'Save Changes'}
              </button>

              <button
                type="button"
                onClick={() =>
                  setEditingFarm(null)
                }
                className="px-5 py-3 rounded-2xl border border-slate-200 font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 2.18.12 — Add field form when farm selected */}
      {selectedFarm && (
        <form
          onSubmit={handleCreateField}
          className="bg-white rounded-3xl border border-emerald-100 p-6 space-y-4 shadow-sm animate-in fade-in"
        >
          <div>
            <p className="text-sm text-gray-500 font-semibold">
              Adding field to
            </p>
            <h2 className="text-xl font-black text-[#002117]">
              {selectedFarm.farm_name}
            </h2>
          </div>

          <input
            type="text"
            placeholder="Field name"
            value={fieldForm.fieldName}
            onChange={(e) =>
              setFieldForm({
                ...fieldForm,
                fieldName: e.target.value
              })
            }
            required
            className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
          />

          <input
            type="number"
            step="0.01"
            placeholder="Area in acres"
            value={fieldForm.areaAcres}
            onChange={(e) =>
              setFieldForm({
                ...fieldForm,
                areaAcres: e.target.value
              })
            }
            className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              step="any"
              placeholder="Latitude"
              value={fieldForm.latitude}
              onChange={(e) =>
                setFieldForm({
                  ...fieldForm,
                  latitude: e.target.value
                })
              }
              className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
            />

            <input
              type="number"
              step="any"
              placeholder="Longitude"
              value={fieldForm.longitude}
              onChange={(e) =>
                setFieldForm({
                  ...fieldForm,
                  longitude: e.target.value
                })
              }
              className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
            />
          </div>

          <button
            type="submit"
            disabled={savingField}
            className="px-6 py-3 rounded-2xl bg-[#006c49] text-white font-bold disabled:opacity-50 hover:bg-[#046a38] transition-all text-sm shadow-md"
          >
            {savingField
              ? 'Adding...'
              : 'Add Field'}
          </button>
        </form>
      )}

      {/* STEP 2.18.16 — Display fields with STEP 2.21.15 Field card buttons */}
      {selectedFarm && (
        <div className="space-y-4 animate-in fade-in">
          <h3 className="text-lg font-black text-[#002117]">
            Fields for {selectedFarm.farm_name}
          </h3>

          {loadingFields ? (
            <div className="p-6 bg-white rounded-3xl border border-emerald-100 flex items-center gap-2 text-sm font-semibold text-[#006c49]">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Loading fields...</span>
            </div>
          ) : fields.length === 0 ? (
            <div className="p-5 rounded-2xl bg-gray-50 border border-emerald-100 text-sm font-semibold text-gray-500">
              No fields added yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className={`bg-white border rounded-2xl p-5 shadow-sm space-y-2 transition-all ${
                    selectedField?.id === field.id
                      ? 'border-[#006c49] ring-2 ring-[#006c49]/20 shadow-md'
                      : 'border-emerald-100 hover:border-emerald-300'
                  }`}
                >
                  <h4 className="font-black text-lg text-[#002117]">
                    {field.field_name}
                  </h4>

                  {field.area_acres && (
                    <p className="text-sm font-bold text-[#006c49]">
                      {field.area_acres} acres
                    </p>
                  )}

                  {field.latitude &&
                    field.longitude && (
                      <p className="text-xs text-gray-400 font-mono">
                        📍 {field.latitude},
                        {' '}
                        {field.longitude}
                      </p>
                  )}

                  {/* STEP 2.21.15 — Field card buttons: Open Field, Edit, Delete */}
                  <div className="flex gap-2 mt-4 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedField(field);
                        setCrops([]);
                        setSoilRecords([]);
                        setError('');
                        setSuccess('');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedField?.id === field.id
                          ? 'bg-[#00422b] text-white shadow-sm'
                          : 'bg-[#006c49] text-white hover:bg-[#046a38]'
                      }`}
                    >
                      {selectedField?.id === field.id ? 'Open Field ✓' : 'Open Field'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEditField(field)}
                      className="px-4 py-2 rounded-xl border border-emerald-200 text-xs font-bold text-[#006c49] hover:bg-emerald-50 transition-all"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteField(field)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 border border-red-200 hover:bg-red-50 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit Field Modal */}
      {editingField && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <form
            onSubmit={handleUpdateField}
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl border border-emerald-100"
          >
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <h2 className="text-2xl font-black text-[#002117]">
                Edit Field
              </h2>
              <button
                type="button"
                onClick={() => setEditingField(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm font-semibold">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Field Name *</label>
                <input
                  type="text"
                  value={editFieldForm.fieldName}
                  onChange={(e) =>
                    setEditFieldForm({
                      ...editFieldForm,
                      fieldName: e.target.value
                    })
                  }
                  placeholder="Field name"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Area (Acres)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editFieldForm.areaAcres}
                  onChange={(e) =>
                    setEditFieldForm({
                      ...editFieldForm,
                      areaAcres: e.target.value
                    })
                  }
                  placeholder="Area in acres"
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={editFieldForm.latitude}
                    onChange={(e) =>
                      setEditFieldForm({
                        ...editFieldForm,
                        latitude: e.target.value
                      })
                    }
                    placeholder="Latitude"
                    className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={editFieldForm.longitude}
                    onChange={(e) =>
                      setEditFieldForm({
                        ...editFieldForm,
                        longitude: e.target.value
                      })
                    }
                    placeholder="Longitude"
                    className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={savingField}
                className="flex-1 py-3 rounded-2xl bg-[#006c49] text-white font-bold text-sm shadow-md hover:bg-[#046a38] transition-all disabled:opacity-50"
              >
                {savingField
                  ? 'Saving...'
                  : 'Save Changes'}
              </button>

              <button
                type="button"
                onClick={() =>
                  setEditingField(null)
                }
                className="px-5 py-3 rounded-2xl border border-slate-200 font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 2.19.12 — Add Crop form */}
      {selectedField && (
        <form
          onSubmit={handleCreateCrop}
          className="bg-white rounded-3xl border border-emerald-100 p-6 space-y-5 shadow-sm animate-in fade-in"
        >
          <div>
            <p className="text-xs font-bold text-gray-500">
              Adding crop to
            </p>

            <h2 className="text-2xl font-black text-[#002117]">
              {selectedField.field_name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Crop */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Crop Name
              </label>

              <input
                type="text"
                placeholder="Wheat"
                value={cropForm.cropName}
                onChange={(e) =>
                  setCropForm({
                    ...cropForm,
                    cropName:
                      e.target.value
                  })
                }
                required
                className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
              />
            </div>

            {/* Variety */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Variety
              </label>

              <input
                type="text"
                placeholder="HD-2967"
                value={cropForm.variety}
                onChange={(e) =>
                  setCropForm({
                    ...cropForm,
                    variety:
                      e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
              />
            </div>

            {/* Sowing */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Sowing Date
              </label>

              <input
                type="date"
                value={cropForm.sowingDate}
                onChange={(e) =>
                  setCropForm({
                    ...cropForm,
                    sowingDate:
                      e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
              />
            </div>

            {/* Harvest */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Expected Harvest
              </label>

              <input
                type="date"
                value={
                  cropForm.expectedHarvestDate
                }
                onChange={(e) =>
                  setCropForm({
                    ...cropForm,
                    expectedHarvestDate:
                      e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
              />
            </div>

            {/* Growth Stage */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Growth Stage
              </label>

              <select
                value={cropForm.growthStage}
                onChange={(e) =>
                  setCropForm({
                    ...cropForm,
                    growthStage:
                      e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
              >
                <option value="">
                  Select stage
                </option>

                <option value="germination">
                  Germination
                </option>

                <option value="seedling">
                  Seedling
                </option>

                <option value="vegetative">
                  Vegetative
                </option>

                <option value="flowering">
                  Flowering
                </option>

                <option value="fruiting">
                  Fruiting
                </option>

                <option value="maturity">
                  Maturity
                </option>

                <option value="harvested">
                  Harvested
                </option>
              </select>
            </div>

            {/* Season */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Season
              </label>

              <select
                value={cropForm.season}
                onChange={(e) =>
                  setCropForm({
                    ...cropForm,
                    season:
                      e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
              >
                <option value="">
                  Select season
                </option>

                <option value="kharif">
                  Kharif
                </option>

                <option value="rabi">
                  Rabi
                </option>

                <option value="zaid">
                  Zaid
                </option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={savingCrop}
            className="px-6 py-3 rounded-2xl bg-[#006c49] text-white font-bold disabled:opacity-50 hover:bg-[#046a38] transition-all text-sm shadow-md"
          >
            {savingCrop
              ? 'Adding Crop...'
              : 'Add Crop'}
          </button>
        </form>
      )}

      {/* STEP 2.19.13 — Display crops with STEP 2.21.20 Crop card buttons */}
      {selectedField && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-[#002117]">
              Crops for {selectedField.field_name}
            </h3>

            <span className="text-xs font-bold text-gray-500 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
              {crops.length} crop(s)
            </span>
          </div>

          {loadingCrops ? (
            <div className="p-5 bg-gray-50 rounded-2xl border border-emerald-100 flex items-center gap-2 text-sm font-semibold text-[#006c49]">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Loading crops...</span>
            </div>
          ) : crops.length === 0 ? (
            <div className="p-5 bg-gray-50 rounded-2xl border border-emerald-100 text-sm font-semibold text-gray-500">
              No crops added to this field yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {crops.map((crop) => (
                <div
                  key={crop.id}
                  className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm space-y-4 hover:border-emerald-300 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xl font-black text-[#002117]">
                        {crop.crop_name}
                      </h4>

                      {crop.variety && (
                        <p className="text-sm text-gray-500 font-semibold">
                          Variety: {crop.variety}
                        </p>
                      )}
                    </div>

                    {crop.growth_stage && (
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#006c49] text-xs font-extrabold capitalize">
                        {crop.growth_stage}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                    {crop.season && (
                      <div>
                        <p className="text-[10px] uppercase text-gray-400 font-bold">
                          Season
                        </p>

                        <p className="text-sm font-bold text-[#002117] capitalize">
                          {crop.season}
                        </p>
                      </div>
                    )}

                    {crop.sowing_date && (
                      <div>
                        <p className="text-[10px] uppercase text-gray-400 font-bold">
                          Sowing
                        </p>

                        <p className="text-sm font-bold text-[#002117]">
                          {crop.sowing_date}
                        </p>
                      </div>
                    )}

                    {crop.expected_harvest_date && (
                      <div>
                        <p className="text-[10px] uppercase text-gray-400 font-bold">
                          Harvest
                        </p>

                        <p className="text-sm font-bold text-[#002117]">
                          {crop.expected_harvest_date}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* STEP 2.21.20 — Crop card buttons: Edit, Delete */}
                  <div className="flex gap-2 mt-5 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleEditCrop(crop)}
                      className="px-4 py-2 rounded-xl border border-emerald-200 text-xs font-bold text-[#006c49] hover:bg-emerald-50 transition-all"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteCrop(crop)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 border border-red-200 hover:bg-red-50 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit Crop Modal */}
      {editingCrop && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <form
            onSubmit={handleUpdateCrop}
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl border border-emerald-100"
          >
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <h2 className="text-2xl font-black text-[#002117]">
                Edit Crop
              </h2>
              <button
                type="button"
                onClick={() => setEditingCrop(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-semibold">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Crop Name *</label>
                <input
                  type="text"
                  value={editCropForm.cropName}
                  onChange={(e) =>
                    setEditCropForm({
                      ...editCropForm,
                      cropName: e.target.value
                    })
                  }
                  placeholder="Crop name"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Variety</label>
                <input
                  type="text"
                  value={editCropForm.variety}
                  onChange={(e) =>
                    setEditCropForm({
                      ...editCropForm,
                      variety: e.target.value
                    })
                  }
                  placeholder="Variety"
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Sowing Date</label>
                <input
                  type="date"
                  value={editCropForm.sowingDate}
                  onChange={(e) =>
                    setEditCropForm({
                      ...editCropForm,
                      sowingDate: e.target.value
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Expected Harvest</label>
                <input
                  type="date"
                  value={editCropForm.expectedHarvestDate}
                  onChange={(e) =>
                    setEditCropForm({
                      ...editCropForm,
                      expectedHarvestDate: e.target.value
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Growth Stage</label>
                <select
                  value={editCropForm.growthStage}
                  onChange={(e) =>
                    setEditCropForm({
                      ...editCropForm,
                      growthStage: e.target.value
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                >
                  <option value="">Select stage</option>
                  <option value="germination">Germination</option>
                  <option value="seedling">Seedling</option>
                  <option value="vegetative">Vegetative</option>
                  <option value="flowering">Flowering</option>
                  <option value="fruiting">Fruiting</option>
                  <option value="maturity">Maturity</option>
                  <option value="harvested">Harvested</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Season</label>
                <select
                  value={editCropForm.season}
                  onChange={(e) =>
                    setEditCropForm({
                      ...editCropForm,
                      season: e.target.value
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                >
                  <option value="">Select season</option>
                  <option value="kharif">Kharif</option>
                  <option value="rabi">Rabi</option>
                  <option value="zaid">Zaid</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={savingCrop}
                className="flex-1 py-3 rounded-2xl bg-[#006c49] text-white font-bold text-sm shadow-md hover:bg-[#046a38] transition-all disabled:opacity-50"
              >
                {savingCrop
                  ? 'Saving...'
                  : 'Save Changes'}
              </button>

              <button
                type="button"
                onClick={() =>
                  setEditingCrop(null)
                }
                className="px-5 py-3 rounded-2xl border border-slate-200 font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 2.20.10 — Add Soil Test Form */}
      {selectedField && (
        <form
          onSubmit={handleCreateSoilRecord}
          className="bg-white rounded-3xl border border-emerald-100 p-6 space-y-5 shadow-sm animate-in fade-in"
        >
          <div>
            <p className="text-xs font-bold text-gray-500">
              Soil Health
            </p>

            <h2 className="text-2xl font-black text-[#002117]">
              Add Soil Test
            </h2>

            <p className="text-sm text-gray-500">
              {selectedField.field_name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* pH */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Soil pH
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                max="14"
                placeholder="6.8"
                value={soilForm.ph}
                onChange={(e) =>
                  setSoilForm({
                    ...soilForm,
                    ph: e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
              />
            </div>

            {/* Nitrogen */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Nitrogen
              </label>

              <input
                type="number"
                step="0.01"
                placeholder="240"
                value={soilForm.nitrogen}
                onChange={(e) =>
                  setSoilForm({
                    ...soilForm,
                    nitrogen:
                      e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
              />
            </div>

            {/* Phosphorus */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Phosphorus
              </label>

              <input
                type="number"
                step="0.01"
                placeholder="18"
                value={soilForm.phosphorus}
                onChange={(e) =>
                  setSoilForm({
                    ...soilForm,
                    phosphorus:
                      e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
              />
            </div>

            {/* Potassium */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Potassium
              </label>

              <input
                type="number"
                step="0.01"
                placeholder="210"
                value={soilForm.potassium}
                onChange={(e) =>
                  setSoilForm({
                    ...soilForm,
                    potassium:
                      e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
              />
            </div>

            {/* Organic Carbon */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Organic Carbon
              </label>

              <input
                type="number"
                step="0.01"
                placeholder="0.72"
                value={soilForm.organicCarbon}
                onChange={(e) =>
                  setSoilForm({
                    ...soilForm,
                    organicCarbon:
                      e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
              />
            </div>

            {/* Moisture */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Moisture %
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="34"
                value={soilForm.moisture}
                onChange={(e) =>
                  setSoilForm({
                    ...soilForm,
                    moisture:
                      e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
              />
            </div>

            {/* Test Date */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Test Date
              </label>

              <input
                type="date"
                value={soilForm.testDate}
                onChange={(e) =>
                  setSoilForm({
                    ...soilForm,
                    testDate:
                      e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
              />
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Source
              </label>

              <select
                value={soilForm.source}
                onChange={(e) =>
                  setSoilForm({
                    ...soilForm,
                    source:
                      e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006c49]"
              >
                <option value="user_input">
                  Manual Entry
                </option>

                <option value="soil_lab">
                  Soil Laboratory
                </option>

                <option value="government_report">
                  Government Report
                </option>

                <option value="estimated">
                  Estimated
                </option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={savingSoil}
            className="px-6 py-3 rounded-2xl bg-[#006c49] text-white font-bold disabled:opacity-50 hover:bg-[#046a38] transition-all text-sm shadow-md"
          >
            {savingSoil
              ? 'Saving...'
              : 'Save Soil Test'}
          </button>
        </form>
      )}

      {/* STEP 2.20.11 — Display soil records with STEP 2.21.25 Soil card buttons */}
      {selectedField && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-[#002117]">
              Soil Test History for {selectedField.field_name}
            </h3>

            <span className="text-xs font-bold text-gray-500 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
              {soilRecords.length} test(s)
            </span>
          </div>

          {loadingSoil ? (
            <div className="p-5 bg-gray-50 rounded-2xl border border-emerald-100 flex items-center gap-2 text-sm font-semibold text-[#006c49]">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Loading soil records...</span>
            </div>
          ) : soilRecords.length === 0 ? (
            <div className="p-5 bg-gray-50 rounded-2xl border border-emerald-100 text-sm font-semibold text-gray-500">
              No soil tests recorded yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {soilRecords.map((soil) => (
                <div
                  key={soil.id}
                  className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm space-y-4 hover:border-emerald-300 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-black text-[#002117]">
                        Soil Test
                      </h4>

                      {soil.test_date && (
                        <p className="text-sm text-gray-500 font-semibold">
                          {soil.test_date}
                        </p>
                      )}
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#006c49] text-xs font-extrabold capitalize">
                      {soil.source}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">
                        pH
                      </p>

                      <p className="text-lg font-black text-[#002117]">
                        {soil.ph ?? '—'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">
                        Nitrogen
                      </p>

                      <p className="text-lg font-black text-[#002117]">
                        {soil.nitrogen ?? '—'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">
                        Phosphorus
                      </p>

                      <p className="text-lg font-black text-[#002117]">
                        {soil.phosphorus ?? '—'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">
                        Potassium
                      </p>

                      <p className="text-lg font-black text-[#002117]">
                        {soil.potassium ?? '—'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">
                        Organic Carbon
                      </p>

                      <p className="text-lg font-black text-[#002117]">
                        {soil.organic_carbon ?? '—'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">
                        Moisture
                      </p>

                      <p className="text-lg font-black text-[#002117]">
                        {soil.moisture != null
                          ? `${soil.moisture}%`
                          : '—'}
                      </p>
                    </div>
                  </div>

                  {/* STEP 2.21.25 — Soil card buttons: Edit, Delete */}
                  <div className="flex gap-2 mt-5 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleEditSoil(soil)}
                      className="px-4 py-2 rounded-xl border border-emerald-200 text-xs font-bold text-[#006c49] hover:bg-emerald-50 transition-all"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteSoil(soil)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 border border-red-200 hover:bg-red-50 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit Soil Modal */}
      {editingSoil && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <form
            onSubmit={handleUpdateSoil}
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl border border-emerald-100"
          >
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <h2 className="text-2xl font-black text-[#002117]">
                Edit Soil Test Record
              </h2>
              <button
                type="button"
                onClick={() => setEditingSoil(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-semibold">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Soil pH</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="14"
                  value={editSoilForm.ph}
                  onChange={(e) =>
                    setEditSoilForm({
                      ...editSoilForm,
                      ph: e.target.value
                    })
                  }
                  placeholder="6.8"
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Nitrogen</label>
                <input
                  type="number"
                  step="0.01"
                  value={editSoilForm.nitrogen}
                  onChange={(e) =>
                    setEditSoilForm({
                      ...editSoilForm,
                      nitrogen: e.target.value
                    })
                  }
                  placeholder="240"
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Phosphorus</label>
                <input
                  type="number"
                  step="0.01"
                  value={editSoilForm.phosphorus}
                  onChange={(e) =>
                    setEditSoilForm({
                      ...editSoilForm,
                      phosphorus: e.target.value
                    })
                  }
                  placeholder="18"
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Potassium</label>
                <input
                  type="number"
                  step="0.01"
                  value={editSoilForm.potassium}
                  onChange={(e) =>
                    setEditSoilForm({
                      ...editSoilForm,
                      potassium: e.target.value
                    })
                  }
                  placeholder="210"
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Organic Carbon</label>
                <input
                  type="number"
                  step="0.01"
                  value={editSoilForm.organicCarbon}
                  onChange={(e) =>
                    setEditSoilForm({
                      ...editSoilForm,
                      organicCarbon: e.target.value
                    })
                  }
                  placeholder="0.72"
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Moisture %</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={editSoilForm.moisture}
                  onChange={(e) =>
                    setEditSoilForm({
                      ...editSoilForm,
                      moisture: e.target.value
                    })
                  }
                  placeholder="34"
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Test Date</label>
                <input
                  type="date"
                  value={editSoilForm.testDate}
                  onChange={(e) =>
                    setEditSoilForm({
                      ...editSoilForm,
                      testDate: e.target.value
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Source</label>
                <select
                  value={editSoilForm.source}
                  onChange={(e) =>
                    setEditSoilForm({
                      ...editSoilForm,
                      source: e.target.value
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#006c49]"
                >
                  <option value="user_input">Manual Entry</option>
                  <option value="soil_lab">Soil Laboratory</option>
                  <option value="government_report">Government Report</option>
                  <option value="estimated">Estimated</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={savingSoil}
                className="flex-1 py-3 rounded-2xl bg-[#006c49] text-white font-bold text-sm shadow-md hover:bg-[#046a38] transition-all disabled:opacity-50"
              >
                {savingSoil
                  ? 'Saving...'
                  : 'Save Changes'}
              </button>

              <button
                type="button"
                onClick={() =>
                  setEditingSoil(null)
                }
                className="px-5 py-3 rounded-2xl border border-slate-200 font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4 SLEEK METRIC HERO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Area */}
        <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#6c7a71] tracking-wider">TOTAL FARM AREA</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#006c49] flex items-center justify-center font-bold">
              <Sprout className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-display font-black text-3xl text-[#002117]">
              {currentFarm?.area_acres || totalAcres || 12} <span className="text-xs text-[#6c7a71] font-medium">Acres</span>
            </h3>
            <p className="text-xs text-[#006c49] font-bold mt-1">
              {currentFarm ? `${currentFarm.farm_name}` : `${farms.length || 3} Farms Mapped`}
            </p>
          </div>
        </div>

        {/* Active Location / Crops */}
        <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#6c7a71] tracking-wider">LOCATION &amp; REGION</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#0284c7] flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-display font-black text-xl text-[#002117] truncate">
              {currentFarm?.village || currentFarm?.district || currentFarm?.state || 'Punjab'}
            </h3>
            <p className="text-xs text-[#0284c7] font-bold mt-1">
              {[currentFarm?.district, currentFarm?.state].filter(Boolean).join(', ') || 'Ludhiana, Punjab'}
            </p>
          </div>
        </div>

        {/* Projected Yield */}
        <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#6c7a71] tracking-wider">PROJECTED YIELD</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h3 className="font-display font-black text-3xl text-[#002117]">+24.5%</h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">vs last season</span>
            </div>
            <p className="text-xs text-emerald-700 font-bold mt-1">Optimal Growth Rate</p>
          </div>
        </div>

        {/* Estimated Profit */}
        <div className="rounded-3xl p-6 bg-[#00422b] text-white shadow-md space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#6ffbbe] tracking-wider">EST. NET REVENUE</span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 text-white flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-display font-black text-3xl text-[#6ffbbe]">₹4,85,000</h3>
            <p className="text-[11px] text-[#bbcabf] font-semibold mt-1">APMC Mandi Arbitrage Active</p>
          </div>
        </div>

      </div>

      {/* MIDDLE SECTION: CROP LIFECYCLE TRACKER & DIGITAL TWIN TELEMETRY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Crop Lifecycle Tracker Card */}
        <div className="lg:col-span-7 rounded-3xl p-7 bg-white border border-emerald-100 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase bg-emerald-100 text-[#006c49] px-2.5 py-1 rounded-full mb-1">
                <span>LIFECYCLE PIPELINE</span>
              </div>
              <h2 className="font-display font-black text-2xl text-[#002117]">Crop Stage Tracker</h2>
              <p className="text-xs text-[#6c7a71] font-semibold">{currentFarm?.farm_name || 'Active Sector'}</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full">
              Day 42 of 120
            </span>
          </div>

          {/* Interactive Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center py-4 relative">

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#006c49] text-white flex items-center justify-center mx-auto text-xs font-bold shadow-sm">
                <Check className="w-5 h-5" />
              </div>
              <p className="font-extrabold text-xs text-[#002117]">Sowing</p>
              <span className="text-[9px] text-emerald-700 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full">DONE</span>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#006c49] text-white ring-4 ring-emerald-200 flex items-center justify-center mx-auto text-xs font-bold shadow-md animate-pulse">
                <Sprout className="w-5 h-5" />
              </div>
              <p className="font-extrabold text-xs text-[#006c49]">Tillering</p>
              <span className="text-[9px] text-white bg-[#006c49] font-extrabold px-2 py-0.5 rounded-full shadow-sm">ACTIVE STAGE</span>
            </div>

            <div className="space-y-2 opacity-70">
              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-500 flex items-center justify-center mx-auto text-xs font-bold">
                3
              </div>
              <p className="font-bold text-xs text-slate-700">Flowering</p>
              <span className="text-[9px] text-slate-500 font-semibold">EST. 12 DAYS</span>
            </div>

            <div className="space-y-2 opacity-70">
              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-500 flex items-center justify-center mx-auto text-xs font-bold">
                4
              </div>
              <p className="font-bold text-xs text-slate-700">Harvesting</p>
              <span className="text-[9px] text-slate-500 font-semibold">EST. 45 DAYS</span>
            </div>
          </div>

          {/* AI Insight Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1.5">
            <p className="font-bold text-[#006c49] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#006c49]" /> AI Agronomist Guidance
            </p>
            <p className="text-[#3c4a42] leading-relaxed font-medium">
              Current tillering rate is 5% ahead of schedule due to optimal satellite moisture levels (62%). Applying a mild nitrogen top-up in 3 days will maximize tiller survival and increase head count.
            </p>
          </div>
        </div>

        {/* Digital Twin Telemetry Radar */}
        <div className="lg:col-span-5 rounded-3xl p-7 bg-white border border-emerald-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <div>
              <h3 className="font-display font-extrabold text-xl text-[#002117]">Digital Twin Analysis</h3>
              <p className="text-[10px] text-[#6c7a71] font-semibold">Real-time Satellite Data Analytics</p>
            </div>
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#006c49] text-white flex items-center justify-center font-bold shadow-sm">
                  <Sprout className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[9px] text-[#6c7a71] uppercase font-extrabold">CROP CANOPY (NDVI)</p>
                  <p className="font-extrabold text-[#002117] text-sm">NDVI 0.84 <span className="text-emerald-700 text-xs">(Optimal)</span></p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">Vigorous</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0284c7] text-white flex items-center justify-center font-bold shadow-sm">
                  <Droplets className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[9px] text-[#6c7a71] uppercase font-extrabold">IRRIGATION ADVISORY</p>
                  <p className="font-extrabold text-[#002117] text-sm">{irrigationActive ? 'Running Drip Cycle' : 'Scheduled (2:00 PM)'}</p>
                </div>
              </div>
              <button onClick={triggerIrrigation} className="text-[10px] font-bold bg-blue-600 text-[#fff] px-2.5 py-1 rounded-full hover:bg-blue-700">
                {irrigationActive ? 'Running' : 'Start'}
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-sm">
                  <Activity className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[9px] text-[#6c7a71] uppercase font-extrabold">LEAF AREA INDEX</p>
                  <p className="font-extrabold text-[#002117] text-sm">3.2 <span className="text-emerald-700 text-xs">(+0.4)</span></p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">Growing</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
