import React from 'react';
import Home from './Home'; // Ensure this import path matches your file structure
import ProfileCreation from './ProfileCreation'; // Ensure this import path matches your file structure
import './App.css';
import Cards from './Cards';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* Header */}
      
      <Router >
        <Routes>
          <Route path='/swipe' element={<Cards/>}/>

          <Route path="/" element={<Home />} />

          <Route path='/makeProfile' element={<ProfileCreation/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;