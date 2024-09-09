import './app.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar';
import Footer from './Component/Footer';
import Dashboard from './pages/Dashboard';
import ProductPage from './pages/ProductPage';
import InventoryPage from './pages/InventoryPage';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 container mx-auto py-4">
          <Sidebar />
        </div>
        <Footer />
      </div>
      <Routes> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
