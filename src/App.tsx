import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
  const handleSearch = (query: string) => {
    // This search will be handled by the HomePage component
    // We'll pass it down through props or context
    console.log('Search query from header:', query);
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