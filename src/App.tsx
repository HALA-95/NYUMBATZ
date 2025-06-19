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
 * 
 * ARCHITECTURE DECISIONS:
 * - Uses React Router for client-side routing
 * - Implements custom event system for component communication
 * - Maintains authentication state at app level
 * - Provides consistent layout structure
 * 
 * SCALABILITY NOTES:
 * - Easy to add new routes and pages
 * - Authentication can be replaced with any provider
 * - Global state can be enhanced with Context API or Redux
 * - Event system can be replaced with state management
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

/**
 * MAIN APP COMPONENT
 * 
 * Root component that provides application structure and routing.
 */
function App() {
  
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
   * Placeholder for authentication functionality.
   * In production, this would integrate with authentication provider.
   */
  const handleAuthClick = () => {
    // Handle authentication
    console.log('Auth clicked');
    // TODO: Integrate with authentication provider (Supabase Auth)
  };

  return (
    <Router>
      {/* MAIN APPLICATION LAYOUT */}
      <div className="min-h-screen bg-gray-50 flex flex-col">
        
        {/* GLOBAL HEADER - Appears on all pages */}
        <Header 
          onSearch={handleSearch}           // Search functionality
          isAuthenticated={false}          // Authentication state (TODO: make dynamic)
          onAuthClick={handleAuthClick}    // Authentication handler
        />
        
        {/* MAIN CONTENT AREA - Flexible height */}
        <main className="flex-1">
          <Routes>
            {/* HOME PAGE ROUTE */}
            <Route path="/" element={<HomePage />} />
            
            {/* FUTURE ROUTES CAN BE ADDED HERE */}
            {/* <Route path="/property/:id" element={<PropertyDetailsPage />} /> */}
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
          </Routes>
        </main>
        
        {/* GLOBAL FOOTER - Appears on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;