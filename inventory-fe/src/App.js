import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/Products/ProductList';
import ProductForm from './pages/Products/ProductForm'

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/ProductForm" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;
