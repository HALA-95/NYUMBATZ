/**
 * LOGIN PAGE COMPONENT - USER AUTHENTICATION
 * 
 * This component provides the login interface for users to authenticate.
 * It supports different user roles and includes registration links.
 * 
 * KEY FEATURES:
 * - Email and password authentication
 * - Role-based login with visual indicators
 * - Form validation and error handling
 * - Responsive design for all devices
 * - Loading states during authentication
 * - Quick login options for testing
 * 
 * MOCK CREDENTIALS:
 * - Admin: admin@nyumbatz.com / password123
 * - Tenant: john.mwamba@gmail.com / password123
 * - Owner: grace.kimonge@gmail.com / password123
 * 
 * SCALABILITY NOTES:
 * - Easy to integrate with Supabase Auth
 * - Form validation ready for production
 * - Social login integration ready
 * - Password reset functionality placeholder
 */

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, User, Shield, Home } from 'lucide-react';

/**
 * LOGIN PAGE COMPONENT IMPLEMENTATION
 * 
 * Provides authentication interface with role-based access.
 */
const LoginPage: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  
  // FORM STATE
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  /**
   * FORM SUBMISSION HANDLER
   * 
   * Handles login form submission with validation and error handling.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const success = await login(formData.email, formData.password);
      
      if (!success) {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * INPUT CHANGE HANDLER
   * 
   * Updates form data state when user types.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  /**
   * QUICK LOGIN HANDLER
   * 
   * Provides quick login for testing different user roles.
   */
  const handleQuickLogin = async (email: string) => {
    setFormData({ email, password: 'password123' });
    setError('');
    setIsSubmitting(true);

    try {
      const success = await login(email, 'password123');
      if (!success) {
        setError('Quick login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during quick login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        {/* HEADER SECTION */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-teal-600 hover:text-teal-700 transition-colors">
              Nyumba<span className="text-orange-500">TZ</span>
            </h1>
          </Link>
          <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please sign in to continue
          </p>
        </div>

        {/* LOGIN FORM */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* EMAIL FIELD */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* PASSWORD FIELD */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isSubmitting || isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* QUICK LOGIN OPTIONS FOR TESTING */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-4">
              Quick login for testing:
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => handleQuickLogin('admin@nyumbatz.com')}
                disabled={isSubmitting}
                className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Shield className="h-4 w-4 mr-2 text-red-500" />
                Login as Admin
              </button>
              <button
                onClick={() => handleQuickLogin('john.mwamba@gmail.com')}
                disabled={isSubmitting}
                className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <User className="h-4 w-4 mr-2 text-blue-500" />
                Login as Tenant
              </button>
              <button
                onClick={() => handleQuickLogin('grace.kimonge@gmail.com')}
                disabled={isSubmitting}
                className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Home className="h-4 w-4 mr-2 text-green-500" />
                Login as Owner
              </button>
            </div>
          </div>

          {/* FOOTER LINKS */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-teal-600 hover:text-teal-500">
                Sign up here
              </Link>
            </p>
            <Link to="/forgot-password" className="text-sm text-teal-600 hover:text-teal-500 mt-2 inline-block">
              Forgot your password?
            </Link>
          </div>
        </div>

        {/* BACK TO HOME */}
        <div className="text-center">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;