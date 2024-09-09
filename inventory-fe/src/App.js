import './index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Dashboard from './Dashboard';
import ProductPage from './pages/ProductPage';
import InventoryPage from './pages/InventoryPage';
import OrderPage from './pages/OrderPage'; // Import the new page

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 container mx-auto py-4">
          <Sidebar />
          <Dashboard />
        </div>
        <Footer />
      </div>
      <Routes> 
        <Route path="/products" element={<ProductPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/orders" element={<OrderPage />} /> {/* Add the new route */}
      </Routes>
    </Router>
  );
}

export default App;
