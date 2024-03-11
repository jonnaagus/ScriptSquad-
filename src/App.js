import React, { useState, useEffect } from 'react';
import axios from 'axios'; // API-anrop
import './App.css';
import Login from './pages/login.js'; // Importera inloggningssidan
import OverviewTable from './pages/overview'; // Importera översiktstabellen
import "./styles/login.css"; // Importera inloggningslayout

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Projektöversikt</h1>
        {/* <Login/> */}
        <OverviewTable /> 
      </header>
    </div>
  );
}

export default App;