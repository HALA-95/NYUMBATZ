/**
 * ADMIN DASHBOARD - ADMIN PORTAL IMPLEMENTATION
 * 
 * This component implements the admin dashboard as specified in PRD 4.6.
 * It provides administrators with full system control and analytics.
 * 
 * KEY FEATURES (PRD 4.6):
 * - View analytics (users, properties, revenue)
 * - Manage users (approve, suspend)
 * - Configure commission rates
 * - Monitor payments and system health
 * - Mock property list with management tools
 * - Request table with approve/reject buttons (Lucide UI Check)
 * 
 * PERMISSIONS (PRD 4.6):
 * - Full CRUD on all tables
 * - Access to financial reports
 * - User management capabilities
 * - System configuration access
 * 
 * SCALABILITY NOTES:
 * - Ready for real API integration
 * - Component-based architecture
 * - Responsive design for all devices
 * - Analytics dashboard ready for charts
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  BarChart3,
  Users,
  Home,
  DollarSign,
  Settings,
  Bell,
  Search,
  Filter,
  Check,
  X,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  TrendingUp,
  AlertTriangle,
  MapPin,
  Calendar,
  Clock
} from 'lucide-react';
import { mockProperties } from '../data/mockData';
import { Property, ViewingRequest, User as UserType } from '../types';

/**
 * MOCK ADMIN DATA
 * 
 * Simulates admin-specific data for dashboard analytics and management.
 * In production, this would come from Supabase database with proper aggregations.
 */
const mockAnalytics = {
  totalUsers: 1247,
  totalProperties: 342,
  totalRevenue: 45600000, // TSh
  monthlyGrowth: 12.5,
  pendingRequests: 23,
  activeListings: 298
};

const mockUsers: UserType[] = [
  {
    id: 'user1',
    fullName: 'John Mwamba',
    email: 'john.mwamba@gmail.com',
    phoneNumber: '+255712345678',
    userRole: 'tenant',
    isVerified: true,
    registrationDate: '2024-01-01'
  },
  {
    id: 'user2',
    fullName: 'Grace Kimonge',
    email: 'grace.kimonge@gmail.com',
    phoneNumber: '+255722345678',
    userRole: 'owner',
    isVerified: true,
    registrationDate: '2023-12-15'
  },
  {
    id: 'user3',
    fullName: 'David Mwakibolwa',
    email: 'david.mwakibolwa@gmail.com',
    phoneNumber: '+255733456789',
    userRole: 'tenant',
    isVerified: false,
    registrationDate: '2024-02-10'
  }
];

const mockViewingRequests: ViewingRequest[] = [
  {
    id: 'req1',
    propertyId: '1',
    tenantId: 'user1',
    requestedDate: '2024-02-15',
    preferredTime: '14:00',
    status: 'pending',
    notes: 'I would like to see the property this weekend if possible.',
    createdAt: '2024-02-10'
  },
  {
    id: 'req2',
    propertyId: '3',
    tenantId: 'user3',
    requestedDate: '2024-02-12',
    preferredTime: '10:00',
    status: 'pending',
    notes: 'Looking forward to viewing this apartment.',
    createdAt: '2024-02-08'
  },
  {
    id: 'req3',
    propertyId: '5',
    tenantId: 'user1',
    requestedDate: '2024-02-08',
    preferredTime: '16:00',
    status: 'approved',
    notes: 'Great property, very interested!',
    createdAt: '2024-02-05'
  }
];

/**
 * ADMIN DASHBOARD COMPONENT IMPLEMENTATION
 * 
 * Main dashboard interface for admin users.
 */
const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // DASHBOARD STATE
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'users' | 'requests' | 'analytics' | 'settings'>('overview');
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [users, setUsers] = useState<UserType[]>(mockUsers);
  const [viewingRequests, setViewingRequests] = useState<ViewingRequest[]>(mockViewingRequests);
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * VIEWING REQUEST APPROVAL HANDLER
   * 
   * Handles approval/rejection of viewing requests.
   */
  const handleRequestAction = (requestId: string, action: 'approved' | 'rejected') => {
    setViewingRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: action }
          : request
      )
    );
    
    // Show success message (in production, this would be a toast notification)
    alert(`Request ${action} successfully!`);
  };

  /**
   * USER VERIFICATION HANDLER
   * 
   * Handles user verification status changes.
   */
  const handleUserVerification = (userId: string, verified: boolean) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, isVerified: verified }
          : user
      )
    );
    
    alert(`User ${verified ? 'verified' : 'unverified'} successfully!`);
  };

  /**
   * PROPERTY STATUS HANDLER
   * 
   * Handles property status changes.
   */
  const handlePropertyStatus = (propertyId: string, status: 'available' | 'rented' | 'maintenance') => {
    setProperties(prev => 
      prev.map(property => 
        property.id === propertyId 
          ? { ...property, status }
          : property
      )
    );
    
    alert(`Property status updated to ${status}!`);
  };

  /**
   * FORMAT CURRENCY HELPER
   * 
   * Formats numbers as Tanzanian Shilling currency.
   */
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ADMIN HEADER */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold text-teal-600">
                Nyumba<span className="text-orange-500">TZ</span>
              </Link>
              <span className="text-gray-300">|</span>
              <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {mockAnalytics.pendingRequests}
                </span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">{user?.fullName}</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* NAVIGATION TABS */}
        <div className="mb-6">
          <nav className="flex space-x-8 border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'properties', label: 'Properties', icon: Home },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'requests', label: 'Viewing Requests', icon: Calendar },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* TAB CONTENT */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* ANALYTICS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-semibold text-gray-900">{mockAnalytics.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Home className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Properties</p>
                    <p className="text-2xl font-semibold text-gray-900">{mockAnalytics.totalProperties}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-semibold text-gray-900">{formatCurrency(mockAnalytics.totalRevenue)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                    <p className="text-2xl font-semibold text-gray-900">+{mockAnalytics.monthlyGrowth}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* PENDING REQUESTS */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Pending Requests</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {viewingRequests.filter(r => r.status === 'pending').slice(0, 3).map((request) => {
                      const property = properties.find(p => p.id === request.propertyId);
                      const tenant = users.find(u => u.id === request.tenantId);
                      return (
                        <div key={request.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {tenant?.fullName} - {property?.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              {request.requestedDate} at {request.preferredTime}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleRequestAction(request.id, 'approved')}
                              className="p-1 text-green-600 hover:bg-green-100 rounded"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleRequestAction(request.id, 'rejected')}
                              className="p-1 text-red-600 hover:bg-red-100 rounded"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SYSTEM ALERTS */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">System Alerts</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-red-900">High Server Load</p>
                        <p className="text-sm text-red-700">CPU usage at 85%</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-yellow-900">Pending Verifications</p>
                        <p className="text-sm text-yellow-700">3 users awaiting verification</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-green-900">System Healthy</p>
                        <p className="text-sm text-green-700">All services operational</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROPERTIES TAB */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            
            {/* HEADER WITH ACTIONS */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Property Management</h3>
              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
                <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </button>
              </div>
            </div>

            {/* SEARCH AND FILTERS */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search properties..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* PROPERTIES TABLE */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Owner
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {properties.slice(0, 10).map((property) => (
                      <tr key={property.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-lg object-cover"
                                src={property.images[0]}
                                alt={property.title}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {property.title}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {property.location.city}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Property Owner</div>
                          <div className="text-sm text-gray-500">ID: {property.ownerId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(property.priceMonthly)}
                          </div>
                          <div className="text-sm text-gray-500">per month</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={property.status}
                            onChange={(e) => handlePropertyStatus(property.id, e.target.value as any)}
                            className={`text-xs font-medium rounded-full px-2 py-1 ${
                              property.status === 'available' ? 'bg-green-100 text-green-800' :
                              property.status === 'rented' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            <option value="available">Available</option>
                            <option value="rented">Rented</option>
                            <option value="maintenance">Maintenance</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">User Management</h3>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export Users
              </button>
            </div>

            {/* USERS TABLE */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <Users className="h-5 w-5 text-gray-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.fullName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            user.userRole === 'admin' ? 'bg-red-100 text-red-800' :
                            user.userRole === 'owner' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {user.userRole}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.isVerified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.registrationDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {!user.isVerified && (
                              <button
                                onClick={() => handleUserVerification(user.id, true)}
                                className="text-green-600 hover:text-green-900"
                                title="Verify User"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                            )}
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEWING REQUESTS TAB */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Viewing Requests Management</h3>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                  {viewingRequests.filter(r => r.status === 'pending').length} Pending
                </span>
              </div>
            </div>

            {/* REQUESTS TABLE */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tenant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {viewingRequests.map((request) => {
                      const property = properties.find(p => p.id === request.propertyId);
                      const tenant = users.find(u => u.id === request.tenantId);
                      return (
                        <tr key={request.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                  <Users className="h-4 w-4 text-blue-600" />
                                </div>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {tenant?.fullName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {tenant?.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {property?.title}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {property?.location.city}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {request.requestedDate}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {request.preferredTime}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              request.status === 'approved' ? 'bg-green-100 text-green-800' :
                              request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {request.status === 'pending' ? (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleRequestAction(request.id, 'approved')}
                                  className="text-green-600 hover:text-green-900 p-1 hover:bg-green-100 rounded"
                                  title="Approve Request"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleRequestAction(request.id, 'rejected')}
                                  className="text-red-600 hover:text-red-900 p-1 hover:bg-red-100 rounded"
                                  title="Reject Request"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                                <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-100 rounded">
                                  <Eye className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-100 rounded">
                                <Eye className="h-4 w-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Analytics & Reports</h3>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics</h4>
                <p className="text-gray-600 mb-4">
                  Detailed analytics and reporting features will be available here.
                </p>
                <p className="text-sm text-gray-500">
                  Charts, graphs, and detailed reports for business insights.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">System Settings</h3>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Commission Settings</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Commission Rate (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="15"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Property Price (TSh)
                  </label>
                  <input
                    type="number"
                    defaultValue="100000"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;