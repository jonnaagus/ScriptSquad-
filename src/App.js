import React, { useState, useEffect } from 'react';
import axios from 'axios'; // API-anrop
import './App.css';
import Login from './pages/login.js'; // Importera inloggningssidan
import OverviewTable from './pages/overview'; // Importera översiktstabellen
import "./styles/login.css"; // Importera inloggningslayout

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // API-anrop
    const getProjects = async () => {
      try {
        const response = await axios.get('https://api.notion.com/v1/databases/085c0b7eab1d4242b4d0d7f0280154d5/query', {
          headers: {
            Authorization: 'Bearer secret_gQrtRaFxAfLnOjGySHof1ZmeNP74kPZHUFHQ5RyWW4T'
          }
        });
        setProjects(response.data.results);
      } catch (error) {
        console.error('Error fetching project data:', error);
        // Visa en felmeddelande för användaren eller utför någon annan hantering av felet här
      }
    };
  
    getProjects();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Projektöversikt</h1>
        {/* <Login/> */}
        <OverviewTable projects={projects} /> {}
      </header>
    </div>
  );
}

export default App;