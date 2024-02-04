import React from 'react';
import Home from './Home'; // Ensure this import path matches your file structure
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Cards from './Cards';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* Header */}
      
      <Router >
        <Routes>
          <Route path='/' element={<Cards/>}/>

          <Route path="/login" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;