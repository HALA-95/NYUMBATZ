import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
  const handleSearch = (query: string) => {
    // Dispatch a custom event that HomePage can listen to
    const searchEvent = new CustomEvent('headerSearch', { detail: query });
    window.dispatchEvent(searchEvent);
  };

  const handleAuthClick = () => {
    // Handle authentication
    console.log('Auth clicked');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header 
          onSearch={handleSearch}
          isAuthenticated={false}
          onAuthClick={handleAuthClick}
        />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;