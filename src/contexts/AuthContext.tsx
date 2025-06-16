/**
 * AUTHENTICATION CONTEXT - MOCK AUTH SYSTEM
 * 
 * This context provides authentication state management for the application.
 * Currently uses mock authentication for development purposes.
 * In production, this would integrate with Supabase Auth.
 * 
 * KEY FEATURES:
 * - Mock user authentication with different roles
 * - Route protection based on user roles
 * - Persistent login state using localStorage
 * - Easy integration with real authentication system
 * 
 * USER ROLES:
 * - tenant: Can search properties, request viewings, manage profile
 * - owner: Can list properties, manage listings, view requests
 * - admin: Full system access, user management, analytics
 * 
 * SCALABILITY NOTES:
 * - Easy to replace with Supabase Auth
 * - Role-based access control ready
 * - Token management structure in place
 * - User profile management included
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * USER INTERFACE
 * 
 * Defines the structure of user data in the authentication system.
 */
interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  userRole: 'admin' | 'tenant' | 'owner';
  isVerified: boolean;
  profileImage?: string;
  registrationDate: string;
}

/**
 * AUTHENTICATION CONTEXT INTERFACE
 * 
 * Defines the contract for the authentication context.
 */
interface AuthContextType {
  user: User | null;                    // Current authenticated user
  isAuthenticated: boolean;             // Authentication status
  isLoading: boolean;                   // Loading state during auth operations
  login: (email: string, password: string) => Promise<boolean>;  // Login function
  logout: () => void;                   // Logout function
  register: (userData: Partial<User>, password: string) => Promise<boolean>;  // Registration function
  updateProfile: (userData: Partial<User>) => Promise<boolean>;  // Profile update function
}

/**
 * MOCK USERS DATABASE
 * 
 * Simulates different user types for development and testing.
 * In production, this would be replaced with Supabase database queries.
 */
const mockUsers: User[] = [
  {
    id: 'admin1',
    fullName: 'Admin User',
    email: 'admin@jipangishe.com',
    phoneNumber: '+255732345678',
    userRole: 'admin',
    isVerified: true,
    registrationDate: '2023-11-01'
  },
  {
    id: 'tenant1',
    fullName: 'John Mwamba',
    email: 'john.mwamba@gmail.com',
    phoneNumber: '+255712345678',
    userRole: 'tenant',
    isVerified: true,
    registrationDate: '2024-01-01'
  },
  {
    id: 'owner1',
    fullName: 'Grace Kimonge',
    email: 'grace.kimonge@gmail.com',
    phoneNumber: '+255722345678',
    userRole: 'owner',
    isVerified: true,
    registrationDate: '2023-12-15'
  }
];

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AUTHENTICATION PROVIDER COMPONENT
 * 
 * Provides authentication state and functions to the entire application.
 */
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * INITIALIZE AUTHENTICATION STATE
   * 
   * Checks for existing authentication on app startup.
   * Restores user session from localStorage if available.
   */
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('jipangishe-user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('jipangishe-user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * LOGIN FUNCTION
   * 
   * Authenticates user with email and password.
   * In production, this would make API calls to Supabase Auth.
   * 
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise<boolean> - Success status
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password123') {
        setUser(foundUser);
        localStorage.setItem('jipangishe-user', JSON.stringify(foundUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * LOGOUT FUNCTION
   * 
   * Clears user session and authentication state.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('jipangishe-user');
  };

  /**
   * REGISTRATION FUNCTION
   * 
   * Creates new user account.
   * In production, this would integrate with Supabase Auth.
   * 
   * @param userData - User registration data
   * @param password - User's chosen password
   * @returns Promise<boolean> - Success status
   */
  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        fullName: userData.fullName || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
        userRole: userData.userRole || 'tenant',
        isVerified: false,
        registrationDate: new Date().toISOString()
      };
      
      mockUsers.push(newUser);
      setUser(newUser);
      localStorage.setItem('jipangishe-user', JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * PROFILE UPDATE FUNCTION
   * 
   * Updates user profile information.
   * 
   * @param userData - Updated user data
   * @returns Promise<boolean> - Success status
   */
  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('jipangishe-user', JSON.stringify(updatedUser));
      
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * AUTHENTICATION HOOK
 * 
 * Custom hook to access authentication context.
 * Provides type safety and error handling.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * MOCK LOGIN CREDENTIALS FOR TESTING:
 * 
 * Admin:
 * - Email: admin@jipangishe.com
 * - Password: password123
 * 
 * Tenant:
 * - Email: john.mwamba@gmail.com
 * - Password: password123
 * 
 * Owner:
 * - Email: grace.kimonge@gmail.com
 * - Password: password123
 */