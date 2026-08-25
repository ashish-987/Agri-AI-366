const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000';


// ==========================================
// GENERIC API REQUEST
// ==========================================

export async function apiRequest(
  endpoint,
  options = {}
) {

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,

      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    }
  );


  let data = null;

  try {

    data = await response.json();

  } catch {

    data = null;

  }


  if (!response.ok) {

    throw new Error(
      data?.detail ||
      `API request failed: ${response.status}`
    );

  }


  return data;
}


// ==========================================
// CHECK FASTAPI
// ==========================================

export async function checkBackend() {

  return apiRequest('/health');

}


export async function getWeather(
  latitude,
  longitude
) {
  return apiRequest(
    `/weather?latitude=${latitude}&longitude=${longitude}`
  );
}


export async function getWeatherAdvisory(
  latitude,
  longitude
) {
  return apiRequest(
    `/weather/advisory?latitude=${latitude}&longitude=${longitude}`
  );
}


export async function getForecastAdvisory(
  latitude,
  longitude
) {
  return apiRequest(
    `/weather/forecast-advisory?latitude=${latitude}&longitude=${longitude}`
  );
}


export async function analyzeSoil({
  ph,
  nitrogen,
  phosphorus,
  potassium,
  organicCarbon,
  moisture,
  crop
}) {

  const params = new URLSearchParams({
    ph,
    nitrogen,
    phosphorus,
    potassium,
    organic_carbon: organicCarbon,
    moisture,
    crop
  });

  return apiRequest(
    `/soil/analyze?${params.toString()}`
  );
}


export async function getFertilizerRecommendation({
  crop,
  nitrogen,
  phosphorus,
  potassium
}) {

  const params = new URLSearchParams({
    crop,
    nitrogen,
    phosphorus,
    potassium
  });

  return apiRequest(
    `/fertilizer/recommend?${params.toString()}`
  );
}


export async function getFarms(userId) {
  return apiRequest(`/farms/${userId}`);
}


export async function createFarm(farmData) {
  return apiRequest('/farms', {
    method: 'POST',
    body: JSON.stringify(farmData)
  });
}


export async function getFields(farmId) {
  return apiRequest(`/fields/farm/${farmId}`);
}


export async function createField(field) {
  return apiRequest('/fields/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(field)
  });
}


export async function deleteField(fieldId) {
  return apiRequest(`/fields/${fieldId}`, {
    method: 'DELETE'
  });
}


export async function getCrops(fieldId) {
  return apiRequest(`/crops/field/${fieldId}`);
}


export async function createCrop(crop) {
  return apiRequest('/crops/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(crop)
  });
}


export async function deleteCrop(cropId) {
  return apiRequest(`/crops/${cropId}`, {
    method: 'DELETE'
  });
}


export async function saveSoilRecord(record) {
  return apiRequest('/soil/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(record)
  });
}


export async function getSoilRecords(fieldId) {
  return apiRequest(`/soil/field/${fieldId}`);
}


export default API_BASE_URL;
