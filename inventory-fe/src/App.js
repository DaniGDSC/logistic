import './index.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
      <Switch>
        <Route path="/products" component={ProductPage} />
        {/* Other routes */}
      </Switch>
    </Router>
  );
}

export default App;
