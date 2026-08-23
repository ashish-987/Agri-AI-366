import { supabase } from '../lib/supabase';

export async function getMyFarms(userId) {
  if (!userId) {
    throw new Error('User is not logged in.');
  }

  const { data, error } = await supabase
    .from('farms')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', {
      ascending: false
    });

  if (error) {
    throw error;
  }

  return data || [];
}


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

  const { data, error } = await supabase
    .from('farms')
    .insert({
      user_id: userId,
      farm_name: farmName.trim(),
      state: state?.trim() || null,
      district: district?.trim() || null,
      village: village?.trim() || null,
      area_acres:
        areaAcres === ''
          ? null
          : Number(areaAcres),
      latitude:
        latitude === ''
          ? null
          : Number(latitude),
      longitude:
        longitude === ''
          ? null
          : Number(longitude)
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}


export async function updateFarm(
  farmId,
  updates
) {
  if (!farmId) {
    throw new Error('Farm ID is required.');
  }

  const { data, error } = await supabase
    .from('farms')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', farmId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}


export async function deleteFarm(farmId) {
  if (!farmId) {
    throw new Error('Farm ID is required.');
  }

  const { error } = await supabase
    .from('farms')
    .delete()
    .eq('id', farmId);

  if (error) {
    throw error;
  }

  return true;
}
