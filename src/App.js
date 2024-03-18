import React from 'react';
import './App.css';
import Login from './pages/login.js'; 
import OverviewTable from './pages/overview'; 
import Timereport from './pages/Timereport.js';
import NavigationMenu from './components/Navbar.js';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavigationMenu />
       <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/overview" element={<OverviewTable/>} />
        <Route path="/timereport" element={<Timereport/>} />
      </Routes>
    </div>
  );
}

export default App;