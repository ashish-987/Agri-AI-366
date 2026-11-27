import { supabase } from '../lib/supabase';

const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000';

// GET MY FARMS
export async function getMyFarms(userId) {
  if (!userId) {
    throw new Error('User is not logged in.');
  }

  try {
    const response = await fetch(
      `${API_URL}/farms/${userId}`
    );

    if (response.ok) {
      const result = await response.json();
      if (result.success && result.farms) {
        return result.farms;
      }
    }
  } catch (err) {
    console.warn('Backend getMyFarms failed, falling back to Supabase client:', err);
  }

  // Direct Supabase fallback
  const { data, error } = await supabase
    .from('farms')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message || 'Failed to fetch farms');
  }

  return data || [];
}


// CREATE FARM
export async function createFarm({
  userId,
  farmName,
  state,
  district,
  village,
  areaAcres,
  latitude,
  longitude
}) {
  if (!userId) {
    throw new Error('User is not logged in.');
  }

  if (!farmName?.trim()) {
    throw new Error('Farm name is required.');
  }

  const payload = {
    user_id: userId,
    farm_name: farmName.trim(),
    state: state?.trim() || null,
    district: district?.trim() || null,
    village: village?.trim() || null,
    area_acres:
      areaAcres === '' ? null : Number(areaAcres),
    latitude:
      latitude === '' ? null : Number(latitude),
    longitude:
      longitude === '' ? null : Number(longitude)
  };

  // Try backend first
  try {
    const response = await fetch(`${API_URL}/farms/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok && result.success && result.farm) {
      return Array.isArray(result.farm) ? result.farm[0] : result.farm;
    }
  } catch (err) {
    console.warn('Backend createFarm failed, attempting direct Supabase insert:', err);
  }

  // Direct Supabase fallback using authenticated user session
  const { data, error } = await supabase
    .from('farms')
    .insert([payload])
    .select();

  if (error) {
    throw new Error(error.message || 'Failed to create farm');
  }

  return Array.isArray(data) ? data[0] : data;
}


// UPDATE FARM
export async function updateFarm(farmId, updates) {
  if (!farmId) {
    throw new Error('Farm ID is required.');
  }

  try {
    const response = await fetch(
      `${API_URL}/farms/${farmId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      }
    );

    const result = await response.json();

    if (response.ok && result.success && result.farm) {
      return Array.isArray(result.farm) ? result.farm[0] : result.farm;
    }
  } catch (err) {
    console.warn('Backend updateFarm failed, falling back to Supabase client:', err);
  }

  const { data, error } = await supabase
    .from('farms')
    .update(updates)
    .eq('id', farmId)
    .select();

  if (error) {
    throw new Error(error.message || 'Failed to update farm');
  }

  return Array.isArray(data) ? data[0] : data;
}


// DELETE FARM
export async function deleteFarm(farmId) {
  if (!farmId) {
    throw new Error('Farm ID is required.');
  }

  try {
    const response = await fetch(
      `${API_URL}/farms/${farmId}`,
      {
        method: 'DELETE'
      }
    );

    const result = await response.json();

    if (response.ok) {
      return true;
    }
  } catch (err) {
    console.warn('Backend deleteFarm failed, falling back to Supabase client:', err);
  }

  const { error } = await supabase
    .from('farms')
    .delete()
    .eq('id', farmId);

  if (error) {
    throw new Error(error.message || 'Failed to delete farm');
  }

  return true;
}
