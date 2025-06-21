/**
 * AUTHENTICATION CONTEXT
 * 
 * React context for managing user authentication state across the application.
 * Provides authentication functions and user data to all components.
 * 
 * KEY FEATURES:
 * - User authentication state management
 * - Login/logout functionality
 * - User profile data
 * - Loading states
 * - Error handling
 * - Automatic session restoration
 * 
 * USAGE:
 * - Wrap app with AuthProvider
 * - Use useAuth hook in components
 * - Access user data and auth functions
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, auth, db } from '../lib/supabase';
import type { Database } from '../lib/supabase';

// Types
type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  // User state
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  
  // Loading states
  loading: boolean;
  profileLoading: boolean;
  
  // Authentication functions
  signUp: (email: string, password: string, userData: {
    fullName: string;
    phoneNumber: string;
    userRole: 'tenant' | 'landlord';
  }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  
  // Profile functions
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
  
  // Utility functions
  isLandlord: boolean;
  isTenant: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AUTH PROVIDER COMPONENT
 * 
 * Provides authentication context to the entire application.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  /**
   * LOAD USER PROFILE
   * 
   * Fetches user profile data from the database.
   */
  const loadProfile = async (userId: string) => {
    try {
      setProfileLoading(true);
      const { data, error } = await db.profiles.getById(userId);
      
      if (error) {
        console.error('Error loading profile:', error);
        return;
      }
      
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  /**
   * SIGN UP FUNCTION
   * 
   * Creates a new user account with profile data.
   */
  const signUp = async (
    email: string, 
    password: string, 
    userData: { fullName: string; phoneNumber: string; userRole: 'tenant' | 'landlord' }
  ) => {
    try {
      console.log('Starting signup process...', { email, userData });
      
      // Check if user already exists
      const { exists } = await auth.checkUserExists(email);
      if (exists) {
        return { error: { message: 'User with this email already exists' } };
      }
      
      const { data, error } = await auth.signUp(email, password, userData);
      
      if (error) {
        console.error('Signup error:', error);
        return { error };
      }
      
      console.log('Signup data:', data);
      
      // Check if profile was created by trigger
      if (data.user) {
        // Wait a moment for the trigger to execute
        setTimeout(async () => {
          try {
            const { data: profile, error: profileError } = await db.profiles.getById(data.user!.id);
            if (profileError || !profile) {
              console.log('Profile not created by trigger, creating manually...');
              // Create profile manually if trigger failed
              await auth.createProfile(data.user!.id, {
                fullName: userData.fullName,
                email: email,
                phoneNumber: userData.phoneNumber,
                userRole: userData.userRole
              });
            }
          } catch (err) {
            console.error('Error checking/creating profile:', err);
          }
        }, 1000);
      }
      
      return { error: null };
    } catch (error) {
      console.error('Signup catch error:', error);
      return { error };
    }
  };

  /**
   * SIGN IN FUNCTION
   * 
   * Authenticates user with email and password.
   */
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await auth.signIn(email, password);
      
      if (error) {
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  /**
   * SIGN OUT FUNCTION
   * 
   * Signs out the current user and clears state.
   */
  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  /**
   * UPDATE PROFILE FUNCTION
   * 
   * Updates user profile data in the database.
   */
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      return { error: 'No user logged in' };
    }

    try {
      const { data, error } = await db.profiles.update(user.id, updates);
      
      if (error) {
        return { error };
      }
      
      setProfile(data);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  /**
   * AUTHENTICATION STATE LISTENER
   * 
   * Listens for authentication state changes and updates context.
   */
  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setSession(session);
          setUser(session.user);
          await loadProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Computed values
  const isLandlord = profile?.user_role === 'landlord';
  const isTenant = profile?.user_role === 'tenant';

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    profileLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isLandlord,
    isTenant
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * USE AUTH HOOK
 * 
 * Custom hook to access authentication context.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;