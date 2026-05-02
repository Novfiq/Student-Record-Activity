import React, {

  useEffect,
  useState

} from "react";

import api from "../api";

import ActivityCard from "../components/ActivityCard";

function Dashboard() {

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

      console.log(res.data);

      setActivities(res.data);

    } catch (err) {

      console.log(err);

      alert(
        "Failed to load activities"
      );
    }
  };

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      <h1
        style={{
          color: "cyan"
        }}
      >
        Student Dashboard
      </h1>

      {
        activities.map(activity => (

          <ActivityCard

            key={activity.id}

            activity={activity}

          />
        ))
      }

    </div>
  );
}

export default Dashboard;