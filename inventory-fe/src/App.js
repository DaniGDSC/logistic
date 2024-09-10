import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/Products/ProductList';


function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/dashboard" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
