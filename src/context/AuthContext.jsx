import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import { supabase } from '../lib/supabase';

// =====================================================
// 1. CREATE AUTH CONTEXT
// =====================================================

const AuthContext = createContext(null);

// =====================================================
// 2. AUTH PROVIDER
// =====================================================

export function AuthProvider({ children }) {
  // ---------------------------------------------------
  // SESSION
  // ---------------------------------------------------
  const [session, setSession] = useState(null);

  // ---------------------------------------------------
  // FARMER PROFILE
  // ---------------------------------------------------
  const [profile, setProfile] = useState(null);

  // ---------------------------------------------------
  // LOADING STATE
  // ---------------------------------------------------
  const [loading, setLoading] = useState(true);

  // ===================================================
  // 3. LOAD PROFILE FROM DATABASE
  // ===================================================
  const loadProfile = async (authUser) => {
    // No user = no profile
    if (!authUser) {
      setProfile(null);
      return null;
    }

    // Get the profile belonging to this user
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle();

    // Database error
    if (error) {
      console.error('Profile loading error:', error);
      setProfile(null);
      return null;
    }

    // -------------------------------------------------
    // PROFILE DOES NOT EXIST
    // -------------------------------------------------
    if (!data) {
      const fallbackProfile = {
        id: authUser.id,
        full_name:
          authUser.user_metadata?.full_name ||
          authUser.email?.split('@')[0] ||
          'Farmer',
        phone: authUser.user_metadata?.phone || '',
        email: authUser.email || '',
        role: 'farmer'
      };

      const { data: createdProfile, error: createError } = await supabase
        .from('profiles')
        .insert(fallbackProfile)
        .select()
        .single();

      if (createError) {
        console.error('Profile creation error:', createError);
        return null;
      }

      setProfile(createdProfile);
      return createdProfile;
    }

    // -------------------------------------------------
    // PROFILE EXISTS
    // -------------------------------------------------
    setProfile(data);
    return data;
  };

  // ===================================================
  // 4. INITIAL AUTH CHECK
  // ===================================================
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Ask Supabase for the existing session
        const {
          data: { session: currentSession }
        } = await supabase.auth.getSession();

        // Component may have been removed
        if (!mounted) return;

        // Save session
        setSession(currentSession);

        // If user is already logged in
        if (currentSession?.user) {
          await loadProfile(currentSession.user);
        }
      } catch (error) {
        console.error('Authentication initialization error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Run initial check
    initializeAuth();

    // =================================================
    // 5. LISTEN FOR LOGIN / LOGOUT CHANGES
    // =================================================
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!mounted) return;

      console.log('Supabase Auth Event:', event);

      // Update session
      setSession(currentSession);

      // User logged in
      if (currentSession?.user) {
        await loadProfile(currentSession.user);
      }
      // User logged out
      else {
        setProfile(null);
      }

      setLoading(false);
    });

    // =================================================
    // 6. CLEANUP
    // =================================================
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ===================================================
  // 7. LOGIN
  // ===================================================
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    return data;
  };

  // ===================================================
  // 8. SIGNUP
  // ===================================================
  const signup = async ({ email, password, fullName, phone }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone
        }
      }
    });

    if (error) {
      throw error;
    }

    return data;
  };

  // ===================================================
  // 9. GOOGLE LOGIN
  // ===================================================
  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) {
      throw error;
    }

    return data;
  };

  // ===================================================
  // 10. LOGOUT
  // ===================================================
  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setSession(null);
    setProfile(null);
  };

  // ===================================================
  // 11. UPDATE PROFILE
  // ===================================================
  const updateProfile = async (updates) => {
    // Make sure user is logged in
    if (!session?.user?.id) {
      throw new Error('You must be logged in.');
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', session.user.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    setProfile(data);
    return data;
  };

  // ===================================================
  // 12. CREATE USER OBJECT FOR UI
  // ===================================================
  const user = useMemo(() => {
    if (!session?.user) {
      return null;
    }

    return {
      id: session.user.id,
      name:
        profile?.full_name ||
        session.user.user_metadata?.full_name ||
        session.user.email?.split('@')[0] ||
        'Farmer',
      email: session.user.email || profile?.email || '',
      phone: profile?.phone || session.user.user_metadata?.phone || '',
      role: profile?.role || 'farmer',
      state: profile?.state || '',
      district: profile?.district || '',
      village: profile?.village || '',
      avatar: profile?.avatar_url || null
    };
  }, [session, profile]);

  // ===================================================
  // 13. VALUE AVAILABLE TO ENTIRE WEBSITE
  // ===================================================
  const value = {
    // Authentication data
    session,
    user,
    profile,
    loading,
    isLoggedIn: !!session,

    // Authentication functions
    login,
    signup,
    loginWithGoogle,
    logout,

    // Profile
    updateProfile,
    reloadProfile: () => {
      if (session?.user) {
        return loadProfile(session.user);
      }
      return null;
    }
  };

  // ===================================================
  // 14. PROVIDE AUTH TO APP
  // ===================================================
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// =====================================================
// 15. CUSTOM HOOK
// =====================================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
