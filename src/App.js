import React from 'react';
import './App.css';
import Login from './pages/login.js'; // Importera inloggningssidan
import OverviewTable from './pages/overview'; // Importera översiktstabellen
import Timereport from './pages/Timereport.js';
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/overview" element={<OverviewTable/>} />
        <Route path="/timereport" element={<Timereport/>} />
      </Routes>
    </div>
  );
}

export default App;