import './index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Footer from './Footer';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 container mx-auto py-4">
          <Sidebar />
          <MainContent />
        </div>
        <Footer />
      </div>
      <Routes>
        <Route path="./pages/ProductPage" component={ProductPage} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
