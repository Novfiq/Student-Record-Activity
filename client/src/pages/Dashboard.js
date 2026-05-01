import React, {
  useEffect,
  useState
} from "react";

import api from "../api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ActivityCard from "../components/ActivityCard";
import Notifications from "../components/Notifications";
import BackButton from "../components/BackButton";

function Dashboard() {

  const [activities, setActivities] =
    useState([]);

  useEffect(() => {

    api.get(
      "/activities",
      {
        headers: {
          Authorization:
            localStorage.getItem("token")
        }
      }
    )

    .then(res => {

      setActivities(res.data);

    });

  }, []);

  return (

    <>

      <Navbar />

      <div className="layout">

        <Sidebar />

        <div className="content">
          <BackButton />
          <h1>
            Student Dashboard
          </h1>

          {
            activities.map(a => (

              <ActivityCard
                key={a.id}
                activity={a}
              />
            ))
          }

          <Notifications />

        </div>

      </div>

    </>
  );
}

export default Dashboard;