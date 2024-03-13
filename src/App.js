import React, { useState, useEffect } from 'react';
import axios from 'axios'; // API-anrop
import './App.css';
import Login from './pages/login.js'; // Importera inloggningssidan
import OverviewTable from './pages/overview'; // Importera översiktstabellen
import Timereport from './pages/Timereport.js';

function App() {
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;