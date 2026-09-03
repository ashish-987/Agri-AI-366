const API_URL = 'http://127.0.0.1:8000';

// GET MY FARMS
export async function getMyFarms(userId) {
  if (!userId) {
    throw new Error('User is not logged in.');
  }

  const response = await fetch(
    `${API_URL}/farms/${userId}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || 'Failed to fetch farms');
  }

  return result.farms || [];
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

  const response = await fetch(`${API_URL}/farms/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
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
    })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || 'Failed to create farm');
  }

  return result.farm?.[0] || result.farm;
}


// UPDATE FARM
export async function updateFarm(farmId, updates) {
  if (!farmId) {
    throw new Error('Farm ID is required.');
  }

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

  if (!response.ok) {
    throw new Error(result.detail || 'Failed to update farm');
  }

  return result.farm?.[0] || result.farm;
}


// DELETE FARM
export async function deleteFarm(farmId) {
  if (!farmId) {
    throw new Error('Farm ID is required.');
  }

  const response = await fetch(
    `${API_URL}/farms/${farmId}`,
    {
      method: 'DELETE'
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || 'Failed to delete farm');
  }

  return true;
}
