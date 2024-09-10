import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/Products/ProductList';
import ProductForm from './pages/Products/ProductForm';
import ProductDetails from './pages/Products/ProductDetails';
import CurrentStock from './pages/Inventory/CurrentStock';


function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/ProductForm" element={<ProductForm />} />
        <Route path="/ProductDetails" element={<ProductDetails />} />
        <Route path="/CurrentStock" element={<CurrentStock />} />
      </Routes>
    </Router>
  );
}

export default App;
