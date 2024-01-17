import React from 'react';
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/dashboard" element = {<Dashboard/>}/>
      <Route path="/login" element = {<Login/>}/>
    </Routes>
    
    </BrowserRouter>
  );
}

export default App
