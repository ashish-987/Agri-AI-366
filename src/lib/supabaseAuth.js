import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Sign up a new user with Email and Password
 */
export async function signUpWithEmail({ email, password, fullName, phone }) {
  if (!isSupabaseConfigured) {
    // Demo Mode fallback
    return {
      user: {
        id: 'demo-user-id-' + Date.now(),
        email,
        user_metadata: { full_name: fullName || 'Kisan Farmer', phone: phone || '' },
      },
      session: { access_token: 'demo-token' },
      error: null,
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || 'Kisan Farmer',
        phone: phone || '',
      },
    },
  });

  if (error) throw error;
  return data;
}

/**
 * Sign in existing user with Email and Password
 */
export async function signInWithEmail({ email, password }) {
  if (!isSupabaseConfigured) {
    return {
      user: {
        id: 'demo-user-id',
        email,
        user_metadata: { full_name: 'Kisan Farmer', phone: '+91 98765 43210' },
      },
      session: { access_token: 'demo-token' },
      error: null,
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

/**
 * Sign in using Google OAuth Provider
 */
export async function signInWithGoogle() {
  if (!isSupabaseConfigured) {
    return {
      user: {
        id: 'google-demo-user-id',
        email: 'gurpreet.singh@gmail.com',
        user_metadata: { full_name: 'Gurpreet Singh (Google)', phone: '+91 98123 45678' },
      },
      error: null,
    };
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    },
  });

  if (error) throw error;
  return data;
}

/**
 * Sign out current user
 */
export async function signOutUser() {
  if (!isSupabaseConfigured) {
    return { error: null };
  }

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return { error: null };
}

/**
 * Fetch current authenticated user session & profile from Supabase
 */
export async function getCurrentUserProfile() {
  if (!isSupabaseConfigured) return null;

  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session?.user) return null;

  const authUser = session.user;

  // Fetch full profile record from public.profiles table
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authUser.id)
    .maybeSingle();

  if (profileError) {
    console.error('Error fetching profile from Supabase:', profileError);
  }

  return {
    id: authUser.id,
    email: authUser.email,
    name: profile?.full_name || authUser.user_metadata?.full_name || authUser.email.split('@')[0],
    phone: profile?.phone || authUser.user_metadata?.phone || '',
    location: profile?.location || 'Ludhiana, Punjab',
    state: profile?.state || 'Punjab',
    district: profile?.district || 'Ludhiana',
    total_area: profile?.total_area_acres || 0,
    avatar: profile?.avatar_url || authUser.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    plan_type: profile?.plan_type || 'FREE',
    raw_user: authUser
  };
}

/**
 * Update user profile in Supabase profiles table
 */
export async function updateUserProfile(userId, profileUpdates) {
  if (!isSupabaseConfigured) return { success: true };

  const { data, error } = await supabase
    .from('profiles')
    .update({
      full_name: profileUpdates.name,
      phone: profileUpdates.phone,
      location: profileUpdates.location,
      total_area_acres: profileUpdates.area,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
