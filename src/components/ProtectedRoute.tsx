/**
 * PROTECTED ROUTE COMPONENT - ROLE-BASED ACCESS CONTROL
 * 
 * This component provides route protection based on user authentication and roles.
 * It ensures that only authorized users can access specific pages and features.
 * 
 * KEY FEATURES:
 * - Authentication requirement enforcement
 * - Role-based access control
 * - Automatic redirection for unauthorized access
 * - Loading states during authentication checks
 * - Flexible role specification (single role or multiple roles)
 * 
 * USAGE EXAMPLES:
 * - <ProtectedRoute requiredRole="admin">...</ProtectedRoute>
 * - <ProtectedRoute requiredRoles={["admin", "owner"]}>...</ProtectedRoute>
 * - <ProtectedRoute requireAuth={true}>...</ProtectedRoute>
 * 
 * SCALABILITY NOTES:
 * - Easy to extend with permission-based access
 * - Supports multiple role requirements
 * - Can be enhanced with feature flags
 * - Ready for integration with real authentication system
 */

import React, { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

/**
 * PROTECTED ROUTE PROPS INTERFACE
 * 
 * Defines the configuration options for route protection.
 */
interface ProtectedRouteProps {
  children: ReactNode;                           // Components to render if authorized
  requiredRole?: 'admin' | 'tenant' | 'owner';  // Single required role
  requiredRoles?: ('admin' | 'tenant' | 'owner')[]; // Multiple allowed roles
  requireAuth?: boolean;                         // Whether authentication is required
  redirectTo?: string;                          // Custom redirect path for unauthorized access
}

/**
 * PROTECTED ROUTE COMPONENT IMPLEMENTATION
 * 
 * Handles authentication and authorization checks before rendering protected content.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requiredRoles,
  requireAuth = true,
  redirectTo = '/'
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Check if authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access if roles are specified
  if (user && (requiredRole || requiredRoles)) {
    const userRole = user.userRole;
    
    // Check single required role
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to={redirectTo} replace />;
    }
    
    // Check multiple allowed roles
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  // User is authorized, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;

/**
 * USAGE EXAMPLES:
 * 
 * 1. Admin Only Route:
 *    <ProtectedRoute requiredRole="admin">
 *      <AdminDashboard />
 *    </ProtectedRoute>
 * 
 * 2. Multiple Roles Allowed:
 *    <ProtectedRoute requiredRoles={["admin", "owner"]}>
 *      <PropertyManagement />
 *    </ProtectedRoute>
 * 
 * 3. Authentication Required Only:
 *    <ProtectedRoute requireAuth={true}>
 *      <UserProfile />
 *    </ProtectedRoute>
 * 
 * 4. Custom Redirect:
 *    <ProtectedRoute requiredRole="tenant" redirectTo="/unauthorized">
 *      <TenantDashboard />
 *    </ProtectedRoute>
 */