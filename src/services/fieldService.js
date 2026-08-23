import { supabase } from '../lib/supabase';


// ==========================================
// GET FIELDS OF A FARM
// ==========================================

export async function getFields(farmId) {

  if (!farmId) {
    throw new Error('Farm ID is required.');
  }

  const { data, error } = await supabase
    .from('fields')
    .select('*')
    .eq('farm_id', farmId)
    .order('created_at', {
      ascending: false
    });

  if (error) {
    throw error;
  }

  return data || [];
}


// ==========================================
// CREATE FIELD
// ==========================================

export async function createField({
  farmId,
  fieldName,
  areaAcres,
  latitude,
  longitude
}) {

  if (!farmId) {
    throw new Error('Farm ID is required.');
  }

  if (!fieldName?.trim()) {
    throw new Error('Field name is required.');
  }

  const { data, error } = await supabase
    .from('fields')
    .insert({
      farm_id: farmId,
      field_name: fieldName.trim(),

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


// ==========================================
// UPDATE FIELD
// ==========================================

export async function updateField(
  fieldId,
  updates
) {

  if (!fieldId) {
    throw new Error('Field ID is required.');
  }

  const { data, error } = await supabase
    .from('fields')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', fieldId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}


// ==========================================
// DELETE FIELD
// ==========================================

export async function deleteField(fieldId) {

  if (!fieldId) {
    throw new Error('Field ID is required.');
  }

  const { error } = await supabase
    .from('fields')
    .delete()
    .eq('id', fieldId);

  if (error) {
    throw error;
  }

  return true;
}
