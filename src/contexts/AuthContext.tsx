/**
 * AUTHENTICATION CONTEXT - MOCK VERSION
 * 
 * Simplified authentication context that doesn't use Supabase.
 * Provides mock authentication for development purposes.
 */

import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: any;
  profile: any;
  session: any;
  loading: boolean;
  profileLoading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<{ error: any }>;
  isLandlord: boolean;
  isTenant: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (email: string, password: string, userData: any) => {
    console.log('Mock signup:', { email, userData });
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    console.log('Mock signin:', { email });
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: any) => {
    return { error: null };
  };

  const value: AuthContextType = {
    user,
    profile,
    session: null,
    loading,
    profileLoading: false,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isLandlord: false,
    isTenant: false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;