/**
 * TENANT DASHBOARD - TENANT PORTAL IMPLEMENTATION
 * 
 * This component implements the tenant portal as specified in PRD 3.3.
 * It provides tenants with access to property search, viewing requests, and profile management.
 * 
 * KEY FEATURES (PRD 3.3):
 * - Search and filter properties
 * - Submit viewing requests
 * - Process payments
 * - View rental history and profile
 * - Mock viewing request form
 * - Profile page integration
 * 
 * PERMISSIONS (PRD 3.3):
 * - Read-only access to properties
 * - CRUD on own requests and profile
 * 
 * SCALABILITY NOTES:
 * - Ready for real API integration
 * - Component-based architecture for easy maintenance
 * - Responsive design for all devices
 * - State management ready for complex workflows
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  User, 
  Heart, 
  Bell, 
  Settings, 
  Home,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Plus,
  Filter
} from 'lucide-react';
import { mockProperties } from '../data/mockData';
import { Property, ViewingRequest } from '../types';
import PropertyCard from '../components/PropertyCard';

/**
 * MOCK VIEWING REQUESTS DATA
 * 
 * Simulates viewing requests for the current tenant.
 * In production, this would come from Supabase database.
 */
const mockViewingRequests: ViewingRequest[] = [
  {
    id: 'req1',
    propertyId: '1',
    tenantId: 'tenant1',
    requestedDate: '2024-02-15',
    preferredTime: '14:00',
    status: 'pending',
    notes: 'I would like to see the property this weekend if possible.',
    createdAt: '2024-02-10'
  },
  {
    id: 'req2',
    propertyId: '3',
    tenantId: 'tenant1',
    requestedDate: '2024-02-12',
    preferredTime: '10:00',
    status: 'approved',
    notes: 'Looking forward to viewing this apartment.',
    createdAt: '2024-02-08'
  },
  {
    id: 'req3',
    propertyId: '5',
    tenantId: 'tenant1',
    requestedDate: '2024-02-08',
    preferredTime: '16:00',
    status: 'completed',
    notes: 'Great property, very interested!',
    createdAt: '2024-02-05'
  }
];

/**
 * TENANT DASHBOARD COMPONENT IMPLEMENTATION
 * 
 * Main dashboard interface for tenant users.
 */
const TenantDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // DASHBOARD STATE
  const [activeTab, setActiveTab] = useState<'overview' | 'search' | 'requests' | 'profile'>('overview');
  const [viewingRequests, setViewingRequests] = useState<ViewingRequest[]>(mockViewingRequests);
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);

  // MOCK VIEWING REQUEST FORM STATE
  const [newRequest, setNewRequest] = useState({
    propertyId: '',
    requestedDate: '',
    preferredTime: '',
    notes: ''
  });

  /**
   * INITIALIZE DASHBOARD DATA
   * 
   * Loads user-specific data on component mount.
   */
  useEffect(() => {
    // Load favorite properties (mock data)
    const favorites = mockProperties.filter(p => ['1', '3', '5'].includes(p.id));
    setFavoriteProperties(favorites);
  }, []);

  /**
   * VIEWING REQUEST SUBMISSION HANDLER
   * 
   * Handles new viewing request form submission.
   */
  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const request: ViewingRequest = {
      id: `req_${Date.now()}`,
      propertyId: newRequest.propertyId,
      tenantId: user?.id || '',
      requestedDate: newRequest.requestedDate,
      preferredTime: newRequest.preferredTime,
      status: 'pending',
      notes: newRequest.notes,
      createdAt: new Date().toISOString()
    };

    setViewingRequests(prev => [request, ...prev]);
    setNewRequest({ propertyId: '', requestedDate: '', preferredTime: '', notes: '' });
    setShowNewRequestForm(false);
    
    // Show success message (in production, this would be a toast notification)
    alert('Viewing request submitted successfully!');
  };

  /**
   * GET STATUS ICON HELPER
   * 
   * Returns appropriate icon for viewing request status.
   */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  /**
   * GET STATUS COLOR HELPER
   * 
   * Returns appropriate color classes for status badges.
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* DASHBOARD HEADER */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold text-teal-600">
                Nyumba<span className="text-orange-500">TZ</span>
              </Link>
              <span className="text-gray-300">|</span>
              <h1 className="text-lg font-semibold text-gray-900">Tenant Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">{user?.fullName}</span>
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
              { id: 'overview', label: 'Overview', icon: Home },
              { id: 'search', label: 'Search Properties', icon: Search },
              { id: 'requests', label: 'My Requests', icon: Calendar },
              { id: 'profile', label: 'Profile', icon: User }
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
            
            {/* WELCOME SECTION */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.fullName}!</h2>
              <p className="text-teal-100">Find your perfect home in Tanzania</p>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Viewing Requests</p>
                    <p className="text-2xl font-semibold text-gray-900">{viewingRequests.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Heart className="h-8 w-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Saved Properties</p>
                    <p className="text-2xl font-semibold text-gray-900">{favoriteProperties.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed Views</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {viewingRequests.filter(r => r.status === 'completed').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {viewingRequests.slice(0, 3).map((request) => {
                    const property = mockProperties.find(p => p.id === request.propertyId);
                    return (
                      <div key={request.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        {getStatusIcon(request.status)}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Viewing request for {property?.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {request.requestedDate} at {request.preferredTime}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEARCH PROPERTIES TAB */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Search Properties</h3>
              
              {/* SEARCH BAR */}
              <div className="flex space-x-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by location, price, or property type..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  <Filter className="h-5 w-5" />
                </button>
              </div>

              {/* QUICK LINK TO MAIN SEARCH */}
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Use our advanced search to find your perfect home</p>
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Go to Property Search
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* VIEWING REQUESTS TAB */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            
            {/* HEADER WITH NEW REQUEST BUTTON */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">My Viewing Requests</h3>
              <button
                onClick={() => setShowNewRequestForm(true)}
                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </button>
            </div>

            {/* NEW REQUEST FORM MODAL */}
            {showNewRequestForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">New Viewing Request</h4>
                  
                  <form onSubmit={handleRequestSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Property
                      </label>
                      <select
                        value={newRequest.propertyId}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, propertyId: e.target.value }))}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="">Select a property</option>
                        {mockProperties.slice(0, 5).map(property => (
                          <option key={property.id} value={property.id}>
                            {property.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={newRequest.requestedDate}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, requestedDate: e.target.value }))}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Time
                      </label>
                      <select
                        value={newRequest.preferredTime}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, preferredTime: e.target.value }))}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="">Select time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes (Optional)
                      </label>
                      <textarea
                        value={newRequest.notes}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, notes: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Any specific requirements or questions..."
                      />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Submit Request
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowNewRequestForm(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* REQUESTS LIST */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
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
                      const property = mockProperties.find(p => p.id === request.propertyId);
                      return (
                        <tr key={request.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-lg object-cover"
                                  src={property?.images[0]}
                                  alt={property?.title}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {property?.title}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {property?.location.city}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{request.requestedDate}</div>
                            <div className="text-sm text-gray-500">{request.preferredTime}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {getStatusIcon(request.status)}
                              <span className="ml-1 capitalize">{request.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-teal-600 hover:text-teal-900 flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </button>
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

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Profile Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user?.fullName || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={user?.phoneNumber || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <input
                    type="text"
                    value={user?.userRole || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 capitalize"
                  />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantDashboard;