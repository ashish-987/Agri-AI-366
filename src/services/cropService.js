const API_URL = 'http://127.0.0.1:8000';

// GET CROPS FOR A FIELD
export async function getCrops(fieldId) {
  if (!fieldId) throw new Error('Field ID is required.');

  const response = await fetch(
    `${API_URL}/crops/field/${fieldId}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || 'Failed to fetch crops');
  }

  return result.crops || [];
}


// CREATE CROP
export async function createCrop({
  fieldId,
  cropName,
  variety,
  sowingDate,
  expectedHarvestDate,
  growthStage,
  season
}) {
  if (!fieldId) throw new Error('Field ID is required.');
  if (!cropName?.trim()) throw new Error('Crop name is required.');

  const response = await fetch(`${API_URL}/crops/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      field_id: fieldId,
      crop_name: cropName.trim(),
      variety: variety?.trim() || null,
      sowing_date: sowingDate || null,
      expected_harvest_date: expectedHarvestDate || null,
      growth_stage: growthStage?.trim() || null,
      season: season?.trim() || null
    })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || 'Failed to create crop');
  }

  return result.crop?.[0] || result.crop;
}


// DELETE CROP
export async function deleteCrop(cropId) {
  if (!cropId) throw new Error('Crop ID is required.');

  const response = await fetch(
    `${API_URL}/crops/${cropId}`,
    {
      method: 'DELETE'
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || 'Failed to delete crop');
  }

  return true;
}


// UPDATE CROP
export async function updateCrop(cropId, updates) {
  if (!cropId) throw new Error('Crop ID is required.');

  const response = await fetch(`${API_URL}/crops/${cropId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || 'Failed to update crop');
  }

  return result.crop?.[0] || result.crop;
}
