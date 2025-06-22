/**
 * SUPABASE CLIENT CONFIGURATION - DISABLED
 * 
 * This file is kept for future use but Supabase integration is disabled.
 * The app now uses mock data instead of a real database.
 */

// Mock Supabase configuration for development
export const isSupabaseConfigured = false;
export const supabaseUrl = '';
export const supabaseAnonKey = '';

// Mock supabase client
export const supabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signOut: () => Promise.resolve({ error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null })
  }
};

// Mock auth helpers
export const auth = {
  signUp: async () => ({ data: null, error: { message: 'Authentication disabled - using mock data' } }),
  signIn: async () => ({ data: null, error: { message: 'Authentication disabled - using mock data' } }),
  signOut: async () => ({ error: null }),
  getCurrentUser: () => Promise.resolve({ data: { user: null }, error: null }),
  getSession: () => Promise.resolve({ data: { session: null }, error: null })
};

// Mock database helpers
export const db = {
  properties: {
    getAll: async () => ({ data: [], error: { message: 'Database disabled - using mock data' } }),
    getById: async () => ({ data: null, error: { message: 'Database disabled - using mock data' } }),
    create: async () => ({ data: null, error: { message: 'Database disabled - using mock data' } }),
    update: async () => ({ data: null, error: { message: 'Database disabled - using mock data' } }),
    delete: async () => ({ error: { message: 'Database disabled - using mock data' } })
  },
  profiles: {
    getById: async () => ({ data: null, error: { message: 'Database disabled - using mock data' } }),
    create: async () => ({ data: null, error: { message: 'Database disabled - using mock data' } }),
    update: async () => ({ data: null, error: { message: 'Database disabled - using mock data' } })
  }
};

export default supabase;