/**
 * SUPABASE CLIENT CONFIGURATION
 * 
 * This file sets up the Supabase client for authentication and database operations.
 * Supabase provides a complete backend solution with authentication, database, and real-time features.
 * 
 * KEY FEATURES:
 * - User authentication (email/password)
 * - PostgreSQL database with real-time subscriptions
 * - Row Level Security (RLS) for data protection
 * - File storage for property images
 * - Automatic API generation
 * 
 * ENVIRONMENT VARIABLES:
 * - VITE_SUPABASE_URL: Your Supabase project URL
 * - VITE_SUPABASE_ANON_KEY: Your Supabase anonymous key
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Supabase project at https://supabase.com
 * 2. Get your project URL and anon key from Settings > API
 * 3. Add them to your .env file
 * 4. Run the database migrations to create tables
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

/**
 * DATABASE TYPES
 * 
 * TypeScript interfaces that match our Supabase database schema.
 * These ensure type safety when working with database operations.
 */

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone_number: string | null;
          user_role: 'tenant' | 'landlord';
          avatar_url: string | null;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          phone_number?: string | null;
          user_role: 'tenant' | 'landlord';
          avatar_url?: string | null;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone_number?: string | null;
          user_role?: 'tenant' | 'landlord';
          avatar_url?: string | null;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          owner_id: string;
          title: string;
          description: string;
          property_type: 'house' | 'apartment' | 'room';
          bedrooms: number;
          bathrooms: number;
          price_monthly: number;
          city: string;
          area: string;
          address: string | null;
          phone_contact: string;
          images: string[];
          amenities: string[];
          utilities: string[];
          nearby_services: string[];
          is_available: boolean;
          views_count: number;
          inquiries_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          title: string;
          description: string;
          property_type: 'house' | 'apartment' | 'room';
          bedrooms: number;
          bathrooms: number;
          price_monthly: number;
          city: string;
          area: string;
          address?: string | null;
          phone_contact: string;
          images?: string[];
          amenities?: string[];
          utilities?: string[];
          nearby_services?: string[];
          is_available?: boolean;
          views_count?: number;
          inquiries_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          title?: string;
          description?: string;
          property_type?: 'house' | 'apartment' | 'room';
          bedrooms?: number;
          bathrooms?: number;
          price_monthly?: number;
          city?: string;
          area?: string;
          address?: string | null;
          phone_contact?: string;
          images?: string[];
          amenities?: string[];
          utilities?: string[];
          nearby_services?: string[];
          is_available?: boolean;
          views_count?: number;
          inquiries_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      property_inquiries: {
        Row: {
          id: string;
          property_id: string;
          tenant_id: string;
          tenant_name: string;
          tenant_phone: string;
          message: string;
          status: 'new' | 'contacted' | 'viewed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          tenant_id: string;
          tenant_name: string;
          tenant_phone: string;
          message: string;
          status?: 'new' | 'contacted' | 'viewed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          tenant_id?: string;
          tenant_name?: string;
          tenant_phone?: string;
          message?: string;
          status?: 'new' | 'contacted' | 'viewed';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

/**
 * AUTHENTICATION HELPERS
 * 
 * Helper functions for common authentication operations.
 */

export const auth = {
  // Sign up new user
  signUp: async (email: string, password: string, userData: { fullName: string; phoneNumber: string; userRole: 'tenant' | 'landlord' }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.fullName,
          phone_number: userData.phoneNumber,
          user_role: userData.userRole
        }
      }
    });
    return { data, error };
  },

  // Sign in user
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  // Sign out user
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current user
  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  // Get current session
  getSession: () => {
    return supabase.auth.getSession();
  }
};

/**
 * DATABASE HELPERS
 * 
 * Helper functions for common database operations.
 */

export const db = {
  // Properties
  properties: {
    // Get all properties with filters
    getAll: async (filters?: {
      city?: string;
      priceMin?: number;
      priceMax?: number;
      propertyType?: string;
      bedrooms?: number;
      search?: string;
    }) => {
      let query = supabase
        .from('properties')
        .select(`
          *,
          profiles:owner_id (
            full_name,
            phone_number,
            is_verified
          )
        `)
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }
      if (filters?.priceMin) {
        query = query.gte('price_monthly', filters.priceMin);
      }
      if (filters?.priceMax) {
        query = query.lte('price_monthly', filters.priceMax);
      }
      if (filters?.propertyType) {
        query = query.eq('property_type', filters.propertyType);
      }
      if (filters?.bedrooms) {
        query = query.gte('bedrooms', filters.bedrooms);
      }
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,city.ilike.%${filters.search}%,area.ilike.%${filters.search}%`);
      }

      return query;
    },

    // Get properties by owner
    getByOwner: async (ownerId: string) => {
      return supabase
        .from('properties')
        .select('*')
        .eq('owner_id', ownerId)
        .order('created_at', { ascending: false });
    },

    // Get single property
    getById: async (id: string) => {
      return supabase
        .from('properties')
        .select(`
          *,
          profiles:owner_id (
            full_name,
            phone_number,
            is_verified
          )
        `)
        .eq('id', id)
        .single();
    },

    // Create property
    create: async (property: Database['public']['Tables']['properties']['Insert']) => {
      return supabase
        .from('properties')
        .insert(property)
        .select()
        .single();
    },

    // Update property
    update: async (id: string, updates: Database['public']['Tables']['properties']['Update']) => {
      return supabase
        .from('properties')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
    },

    // Delete property
    delete: async (id: string) => {
      return supabase
        .from('properties')
        .delete()
        .eq('id', id);
    },

    // Increment views
    incrementViews: async (id: string) => {
      return supabase.rpc('increment_property_views', { property_id: id });
    }
  },

  // Profiles
  profiles: {
    // Get profile by user ID
    getById: async (id: string) => {
      return supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
    },

    // Create profile
    create: async (profile: Database['public']['Tables']['profiles']['Insert']) => {
      return supabase
        .from('profiles')
        .insert(profile)
        .select()
        .single();
    },

    // Update profile
    update: async (id: string, updates: Database['public']['Tables']['profiles']['Update']) => {
      return supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
    }
  },

  // Property Inquiries
  inquiries: {
    // Get inquiries for landlord
    getByLandlord: async (landlordId: string) => {
      return supabase
        .from('property_inquiries')
        .select(`
          *,
          properties (
            title,
            city,
            area,
            price_monthly
          )
        `)
        .in('property_id', 
          supabase
            .from('properties')
            .select('id')
            .eq('owner_id', landlordId)
        )
        .order('created_at', { ascending: false });
    },

    // Create inquiry
    create: async (inquiry: Database['public']['Tables']['property_inquiries']['Insert']) => {
      return supabase
        .from('property_inquiries')
        .insert(inquiry)
        .select()
        .single();
    },

    // Update inquiry status
    updateStatus: async (id: string, status: 'new' | 'contacted' | 'viewed') => {
      return supabase
        .from('property_inquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
    }
  }
};

/**
 * REAL-TIME SUBSCRIPTIONS
 * 
 * Helper functions for setting up real-time subscriptions.
 */

export const realtime = {
  // Subscribe to property changes
  subscribeToProperties: (callback: (payload: any) => void) => {
    return supabase
      .channel('properties')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'properties' }, 
        callback
      )
      .subscribe();
  },

  // Subscribe to inquiries for a landlord
  subscribeToInquiries: (landlordId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('inquiries')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'property_inquiries',
          filter: `property_id=in.(select id from properties where owner_id=eq.${landlordId})`
        }, 
        callback
      )
      .subscribe();
  }
};

export default supabase;