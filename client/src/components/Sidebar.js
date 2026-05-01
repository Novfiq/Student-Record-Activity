import React from "react";

import {
  Dashboard,
  AddCircle,
  Person,
  Event,
  Assessment,
  Logout
} from "@mui/icons-material";

import { Link } from "react-router-dom";

function Sidebar() {

  const logout = () => {

    localStorage.clear();

    window.location = "/";
  };

  return (

    <div className="sidebar">

      <h2 className="sidebar-title">
        MENU
      </h2>

      <Link to="/dashboard">

        <Dashboard />

        Dashboard

      </Link>

      <Link to="/add-activity">

        <AddCircle />

        Add Activity

      </Link>

      <Link to="/profile">

        <Person />

        Profile

      </Link>

      <Link to="/events">

        <Event />

        Events

      </Link>

      <Link to="/reports">

        <Assessment />

        Reports

      </Link>

      <button
        className="logout-btn"
        onClick={logout}
      >

        <Logout />

        Logout

      </button>

    </div>
  );
}

export default Sidebar;