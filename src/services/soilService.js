import { supabase } from '../lib/supabase';


// ==========================================
// GET SOIL RECORDS FOR A FIELD
// ==========================================

export async function getSoilRecords(fieldId) {

  if (!fieldId) {
    throw new Error('Field ID is required.');
  }

  const { data, error } = await supabase
    .from('soil_records')
    .select('*')
    .eq('field_id', fieldId)
    .order('test_date', {
      ascending: false
    });

  if (error) {
    throw error;
  }

  return data || [];
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

  const { data, error } = await supabase
    .from('soil_records')
    .insert({
      field_id: fieldId,

      ph:
        ph === ''
          ? null
          : Number(ph),

      nitrogen:
        nitrogen === ''
          ? null
          : Number(nitrogen),

      phosphorus:
        phosphorus === ''
          ? null
          : Number(phosphorus),

      potassium:
        potassium === ''
          ? null
          : Number(potassium),

      organic_carbon:
        organicCarbon === ''
          ? null
          : Number(organicCarbon),

      moisture:
        moisture === ''
          ? null
          : Number(moisture),

      source:
        source?.trim() ||
        'user_input',

      test_date:
        testDate || null
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}


// ==========================================
// UPDATE SOIL RECORD
// ==========================================

export async function updateSoilRecord(
  recordId,
  updates
) {

  if (!recordId) {
    throw new Error(
      'Soil record ID is required.'
    );
  }

  const { data, error } = await supabase
    .from('soil_records')
    .update(updates)
    .eq('id', recordId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}


// ==========================================
// DELETE SOIL RECORD
// ==========================================

export async function deleteSoilRecord(
  recordId
) {

  if (!recordId) {
    throw new Error(
      'Soil record ID is required.'
    );
  }

  const { error } = await supabase
    .from('soil_records')
    .delete()
    .eq('id', recordId);

  if (error) {
    throw error;
  }

  return true;
}
