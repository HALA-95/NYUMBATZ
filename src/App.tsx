/**
 * APP COMPONENT - ROOT APPLICATION COMPONENT
 * 
 * This is the main application component that sets up routing, global state,
 * and coordinates between major application sections.
 * 
 * KEY RESPONSIBILITIES:
 * - Application routing setup (React Router)
 * - Global layout structure (Header, Main, Footer)
 * - Authentication state management
 * - Search coordination between Header and HomePage
 * - Global event handling and communication
 * - Route protection based on user roles
 * 
 * ARCHITECTURE DECISIONS:
 * - Uses React Router for client-side routing
 * - Implements custom event system for component communication
 * - Maintains authentication state at app level
 * - Provides consistent layout structure
 * - Role-based access control with protected routes
 * 
 * SCALABILITY NOTES:
 * - Easy to add new routes and pages
 * - Authentication can be replaced with any provider
 * - Global state can be enhanced with Context API or Redux
 * - Event system can be replaced with state management
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TenantDashboard from './pages/TenantDashboard';
import AdminDashboard from './pages/AdminDashboard';

/**
 * DASHBOARD REDIRECT COMPONENT
 * 
 * Redirects users to appropriate dashboard based on their role.
 */
const DashboardRedirect: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  switch (user.userRole) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'tenant':
      return <Navigate to="/tenant" replace />;
    case 'owner':
      return <Navigate to="/owner" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

/**
 * APP LAYOUT COMPONENT
 * 
 * Provides consistent layout for pages that need header and footer.
 */
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();

  /**
   * SEARCH EVENT HANDLER
   * 
   * Handles search requests from the Header component.
   * Uses custom events to communicate with HomePage component.
   * This loose coupling allows for easy component replacement.
   * 
   * @param query - Search query from header
   */
  const handleSearch = (query: string) => {
    // Dispatch a custom event that HomePage can listen to
    const searchEvent = new CustomEvent('headerSearch', { detail: query });
    window.dispatchEvent(searchEvent);
  };

  /**
   * AUTHENTICATION HANDLER
   * 
   * Handles authentication actions (login/logout).
   */
  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      // Navigate to login page
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* GLOBAL HEADER - Appears on all pages */}
      <Header 
        onSearch={handleSearch}           // Search functionality
        isAuthenticated={isAuthenticated} // Authentication state
        onAuthClick={handleAuthClick}     // Authentication handler
      />
      
      {/* MAIN CONTENT AREA - Flexible height */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* GLOBAL FOOTER - Appears on all pages */}
      <Footer />
    </div>
  );
};

/**
 * MAIN APP COMPONENT
 * 
 * Root component that provides application structure and routing.
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* ROUTES WITH LAYOUT */}
          <Route path="/" element={
            <AppLayout>
              <HomePage />
            </AppLayout>
          } />
          
          {/* DASHBOARD REDIRECT ROUTE */}
          <Route path="/dashboard" element={<DashboardRedirect />} />
          
          {/* PROTECTED ROUTES */}
          
          {/* TENANT DASHBOARD */}
          <Route path="/tenant" element={
            <ProtectedRoute requiredRole="tenant">
              <TenantDashboard />
            </ProtectedRoute>
          } />
          
          {/* ADMIN DASHBOARD */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* OWNER DASHBOARD (Placeholder) */}
          <Route path="/owner" element={
            <ProtectedRoute requiredRole="owner">
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Owner Dashboard</h1>
                  <p className="text-gray-600 mb-6">Coming soon...</p>
                  <a href="/" className="text-teal-600 hover:text-teal-700">
                    ← Back to homepage
                  </a>
                </div>
              </div>
            </ProtectedRoute>
          } />
          
          {/* CATCH-ALL ROUTE */}
          <Route path="*" element={
            <AppLayout>
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-6">Page not found</p>
                  <a href="/" className="text-teal-600 hover:text-teal-700">
                    ← Back to homepage
                  </a>
                </div>
              </div>
            </AppLayout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;