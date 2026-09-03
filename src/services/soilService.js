const API_URL = 'http://127.0.0.1:8000';


// ==========================================
// GET SOIL RECORDS FOR A FIELD
// ==========================================

export async function getSoilRecords(fieldId) {
  if (!fieldId) {
    throw new Error('Field ID is required.');
  }

  const response = await fetch(
    `${API_URL}/soil/field/${fieldId}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail || 'Failed to fetch soil records.'
    );
  }

  return result.soil_records || [];
}


// ==========================================
// CREATE SOIL RECORD
// ==========================================

export async function createSoilRecord({
  fieldId,
  ph,
  nitrogen,
  phosphorus,
  potassium,
  organicCarbon,
  moisture,
  source,
  testDate
}) {
  if (!fieldId) {
    throw new Error('Field ID is required.');
  }

  const response = await fetch(`${API_URL}/soil/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      field_id: fieldId,
      ph: ph === '' ? null : Number(ph),
      nitrogen: nitrogen === '' ? null : Number(nitrogen),
      phosphorus: phosphorus === '' ? null : Number(phosphorus),
      potassium: potassium === '' ? null : Number(potassium),
      organic_carbon:
        organicCarbon === ''
          ? null
          : Number(organicCarbon),
      moisture:
        moisture === ''
          ? null
          : Number(moisture),
      source: source?.trim() || 'user_input',
      test_date: testDate || null
    })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail || 'Failed to create soil record.'
    );
  }

  return result.soil_record?.[0] || result.soil_record;
}


// ==========================================
// UPDATE SOIL RECORD
// ==========================================

export async function updateSoilRecord(
  recordId,
  updates
) {
  if (!recordId) {
    throw new Error('Soil record ID is required.');
  }

  const response = await fetch(
    `${API_URL}/soil/${recordId}`,
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
    throw new Error(
      result.detail || 'Failed to update soil record.'
    );
  }

  return result.soil_record?.[0] || result.soil_record;
}


// ==========================================
// DELETE SOIL RECORD
// ==========================================

export async function deleteSoilRecord(recordId) {
  if (!recordId) {
    throw new Error(
      'Soil record ID is required.'
    );
  }

  const response = await fetch(
    `${API_URL}/soil/${recordId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail || 'Failed to delete soil record.'
    );
  }

  return true;
}
