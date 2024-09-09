import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import './index.css';

function Sidebar() {
    return (
      <aside className="bg-gray-200 p-4 w-1/4">
        <ul>
          <li><Link to="./component/app.js" className="block py-2 px-4 hover:bg-gray-300">Dashboard</Link></li>
          <li><Link to="/items" className="block py-2 px-4 hover:bg-gray-300">Items</Link></li>
          <li><Link to="/orders" className="block py-2 px-4 hover:bg-gray-300">Orders</Link></li>
        </ul>
      </aside>
    );
  }

  export default Sidebar