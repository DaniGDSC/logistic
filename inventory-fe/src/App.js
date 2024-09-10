import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductPage from './pages/ProductPage';
import ProductList from './pages/Product/ProductList';
import InventoryPage from './pages/Inventory/InventoryPage';
import OrderPage  from './pages/OrderPage';

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path='/productionlist' element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
