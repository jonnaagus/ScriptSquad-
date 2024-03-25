import React from 'react';
import './App.css';
import Login from './pages/login.js'; // Importera inloggningssidan
import OverviewTable from './pages/overview'; // Importera översiktstabellen
import Timereport from './pages/Timereport.js';
import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout.js';
import RequireAuth from './components/RequireAuth.js';

function App() {
  return (

    <Routes>
      <Route path="/" element={<Layout />}>

        {/* PublicRoute */}
        <Route path="/" element={<Login />} />

        {/* ProteectedRoute */}
        <Route element ={<RequireAuth />}>
        <Route path="/overview" element={<OverviewTable />} />
        <Route path="/timereport" element={<Timereport />} />
        </Route>
        {/* <Route path= "*" element={<missing />} */}
      </Route>

    </Routes>

  );
}

export default App;