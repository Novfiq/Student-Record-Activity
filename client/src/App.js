import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import AddActivity from "./pages/AddActivity";

import AdminDashboard from "./pages/AdminDashboard";

import StudentProfile from "./pages/StudentProfile";

import Events from "./pages/Events";

import Reports from "./pages/Reports";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/add-activity"
          element={<AddActivity />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/profile"
          element={<StudentProfile />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;