import { supabase } from '../lib/supabase';


// ==========================================
// GET CROPS FOR A FIELD
// ==========================================

export async function getCrops(fieldId) {

  if (!fieldId) {
    throw new Error('Field ID is required.');
  }

  const { data, error } = await supabase
    .from('crops')
    .select('*')
    .eq('field_id', fieldId)
    .order('created_at', {
      ascending: false
    });

  if (error) {
    throw error;
  }

  return data || [];
}


// ==========================================
// CREATE CROP
// ==========================================

export async function createCrop({
  fieldId,
  cropName,
  variety,
  sowingDate,
  expectedHarvestDate,
  growthStage,
  season
}) {

  if (!fieldId) {
    throw new Error('Field ID is required.');
  }

  if (!cropName?.trim()) {
    throw new Error('Crop name is required.');
  }

  const { data, error } = await supabase
    .from('crops')
    .insert({
      field_id: fieldId,

      crop_name:
        cropName.trim(),

      variety:
        variety?.trim() || null,

      sowing_date:
        sowingDate || null,

      expected_harvest_date:
        expectedHarvestDate || null,

      growth_stage:
        growthStage?.trim() || null,

      season:
        season?.trim() || null
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}


// ==========================================
// UPDATE CROP
// ==========================================

export async function updateCrop(
  cropId,
  updates
) {

  if (!cropId) {
    throw new Error('Crop ID is required.');
  }

  const { data, error } = await supabase
    .from('crops')
    .update({
      ...updates,
      updated_at:
        new Date().toISOString()
    })
    .eq('id', cropId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}


// ==========================================
// DELETE CROP
// ==========================================

export async function deleteCrop(cropId) {

  if (!cropId) {
    throw new Error('Crop ID is required.');
  }

  const { error } = await supabase
    .from('crops')
    .delete()
    .eq('id', cropId);

  if (error) {
    throw error;
  }

  return true;
}
