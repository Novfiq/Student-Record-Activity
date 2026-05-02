import React, {
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import api from "../api";

import ActivityCard from "../components/ActivityCard";

function Dashboard() {

  const navigate =
    useNavigate();

  const [activities, setActivities] =
    useState([]);

  useEffect(() => {

    fetchActivities();

  }, []);

  const fetchActivities = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res =
        await api.get(

          "/activities",

          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

      if (Array.isArray(res.data)) {

        setActivities(res.data);

      } else {

        console.log(res.data);

        setActivities([]);
      }

    } catch (err) {

      console.log(err);

      setActivities([]);
    }
  };

  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background:
          "linear-gradient(to right,#020617,#0f172a)"
      }}
    >

      {/* SIDEBAR */}

      <div
        style={{
          width: "250px",
          background: "#1e293b",
          padding: "20px",
          color: "white"
        }}
      >

        <h1
          style={{
            color: "cyan"
          }}
        >
          MENU
        </h1>

        <br />

        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Dashboard
        </Link>

        <br /><br />

        <Link
          to="/add-activity"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Add Activity
        </Link>

        <br /><br />

        <Link
          to="/profile"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Profile
        </Link>

        <br /><br />

        <Link
          to="/events"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Events
        </Link>

        <br /><br />

        <Link
          to="/reports"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Reports
        </Link>

        <br /><br />

        <button

          onClick={logout}

          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "10px",
            width: "100%",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </div>

      {/* MAIN CONTENT */}

      <div
        style={{
          flex: 1,
          padding: "20px"
        }}
      >

        <h1
          style={{
            color: "white"
          }}
        >
          Student Dashboard
        </h1>

        {

          activities.length === 0 ? (

            <h3
              style={{
                color: "white"
              }}
            >
              No Activities Found
            </h3>

          ) : (

            activities.map(activity => (

              <ActivityCard

                key={activity.id}

                activity={activity}

              />
            ))
          )
        }

      </div>

    </div>
  );
}

export default Dashboard;