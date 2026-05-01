import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Button
} from "@mui/material";

import api from "../api";

function ActivityCard({ activity }) {

  const deleteActivity = async () => {

    console.log(activity);

    const ok =
      window.confirm(
        "Delete this activity?"
      );

    if (!ok) return;

    try {

      const token =
        localStorage.getItem("token");

      const res =
        await api.delete(

          `/activities/${activity.id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      alert(res.data);

      window.location.reload();

    } catch (err) {

      console.log(err);

      alert("Delete Failed");
    }
  };

  return (

    <Card className="activity-card">

      <CardContent>

        <Typography
          variant="h5"
          className="activity-title"
        >
          {activity.title}
        </Typography>

        <Typography>
          ID: {activity.id}
        </Typography>

        <Typography>
          Type: {activity.type}
        </Typography>

        <Typography>
          Date: {activity.date}
        </Typography>

        <Typography>
          Description:
          {activity.description}
        </Typography>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px"
          }}
        >

          {
            activity.file && (

              <a
                href={activity.file}
                target="_blank"
                rel="noreferrer"
              >

                <Button
                  variant="contained"
                  className="view-btn"
                >
                  OPEN FILE
                </Button>

              </a>
            )
          }

          <Button
            variant="contained"
            color="error"
            onClick={deleteActivity}
          >
            DELETE
          </Button>

        </div>

      </CardContent>

    </Card>
  );
}

export default ActivityCard;