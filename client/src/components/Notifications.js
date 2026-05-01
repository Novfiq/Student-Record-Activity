import React, {
  useEffect,
  useState
} from "react";

import api from "../api";

import {
  Card,
  CardContent,
  Typography
} from "@mui/material";

function Notifications() {

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {

    api.get(
      "/notifications",
      {
        headers: {
          Authorization:
            localStorage.getItem("token")
        }
      }
    )

    .then(res => {

      setNotifications(res.data);

    });

  }, []);

  return (

    <div>

      <Typography
        variant="h5"
        sx={{
          marginTop: "20px",
          marginBottom: "20px"
        }}
      >
        Notifications
      </Typography>

      {
        notifications.map(n => (

          <Card
            key={n.id}
            className="card"
          >

            <CardContent>

              <Typography>
                {n.message}
              </Typography>

              <Typography
                sx={{
                  marginTop: "10px",
                  color: "#00ff99"
                }}
              >
                {n.status}
              </Typography>

            </CardContent>

          </Card>
        ))
      }

    </div>
  );
}

export default Notifications;