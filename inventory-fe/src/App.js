import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './Productpage.js';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#dashboard" className="hover:underline">Dashboard</a></li>
            <li><a href="#items" className="hover:underline">Items</a></li>
            <li><a href="#orders" className="hover:underline">Orders</a></li>
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
        <li><a href="#items" className="block py-2 px-4 hover:bg-gray-300">Items</a></li>
        <li><a href="#orders" className="block py-2 px-4 hover:bg-gray-300">Orders</a></li>
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

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 container mx-auto py-4">
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}

export default App;
