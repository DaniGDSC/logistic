import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/Products/ProductList';
import ProductForm from './pages/Products/ProductForm';
import ProductDetails from './pages/Products/ProductDetails';


function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/ProductForm" element={<ProductForm />} />
        <Route path="/ProductDetails" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
