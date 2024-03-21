import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.js';
import Login from './pages/login.js'; 
import OverviewTable from './pages/overview'; 
import Timereport from './pages/Timereport.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/overview" element={<OverviewTable />} />
        <Route path="/timereport" element={<Timereport />} />
      </Route>
    </Routes>
  );
}

export default App;