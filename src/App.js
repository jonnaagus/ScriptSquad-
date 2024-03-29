import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Login from './pages/login.js'; // Importera inloggningssidan
import OverviewTable from './pages/overview'; // Importera översiktstabellen
import Layout from './components/Layout.js';
import RequireAuth from './components/RequireAuth.js';
import CalendarView from './pages/CalenderTimereport.js';
import Project from './pages/Project.js';

function App() {
  return (

    <Routes>
      <Route path="/" element={<Layout />}>

        {/* PublicRoute */}
        <Route path="/" element={<Login />} />

        {/* ProteectedRoute */}
        <Route element ={<RequireAuth />}>
        <Route path="/overview" element={<OverviewTable />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/calenderTimereport" element={<CalendarView />} />
        </Route>
        {/* <Route path= "*" element={<missing />} */}
      </Route>

    </Routes>

  );
}

export default App;