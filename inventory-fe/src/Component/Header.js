import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component


const Header = () => {
  return (
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:underline">Dashboard</Link></li> {/* Use the imported Link component */}
              <li><Link to="Product" className="hover:underline">Product</Link></li>
              <li><Link to="/orders" className="hover:underline">Orders</Link></li>
              <li><Link to="/orders" className="hover:underline">Inventory</Link></li>
              <li><Link to="/orders" className="hover:underline">Suppliers</Link></li>
              <li><Link to="/orders" className="hover:underline">Reports</Link></li>
              <li><Link to="/orders" className="hover:underline">User Management</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    );
};
    export default Header;
