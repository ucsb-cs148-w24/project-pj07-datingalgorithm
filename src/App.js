import React from 'react';
import Home from './Home'; 
import ProfileCreation from './ProfileCreation'; 
import './App.css';
import Cards from './Cards';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
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