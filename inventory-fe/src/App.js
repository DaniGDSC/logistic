// path/to/filename.js
import logo from './logo.svg';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Item</button>
      </header>
      <main>
        {/* Your main content goes here */}
        <p>Hey, welcome to the Inventory Management System!</p> {/* Change "Hello" to "Hey" */}
      </main>
    </div>
  );
}

export default App;
