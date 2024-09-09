import './index.css'; // This import is unnecessary and should be removed unless used elsewhere in the project.
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ProductPage from './components/ProductPage';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#dashboard" className="hover:underline">Dashboard</a></li>
            <li><Link to="/" className="hover:underline">Dashboard</Link></li>
            <li><Link to="/items" className="hover:underline">Items</Link></li>
            <li><Link to="/orders" className="hover:underline">Orders</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="bg-gray-200 p-4 w-1/4">
      <ul>
        <li><a href="#dashboard" className="block py-2 px-4 hover:bg-gray-300">Dashboard</a></li>
        <li><Link to="/" className="block py-2 px-4 hover:bg-gray-300">Dashboard</Link></li>
        <li><Link to="/items" className="block py-2 px-4 hover:bg-gray-300">Items</Link></li>
        <li><Link to="/orders" className="block py-2 px-4 hover:bg-gray-300">Orders</Link></li>
      </ul>
    </aside>
  );
}

function MainContent() {
  return (
    <div className="p-4 bg-white shadow rounded-lg flex-1">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <p>Here you can manage your inventory effectively.</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
          <li><a href="#terms" className="hover:underline">Terms of Service</a></li>
        </ul>
        <div>
          <p>Email: info@inventorymanagement.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
      </div>
    </footer>
  );
}

export default App; 