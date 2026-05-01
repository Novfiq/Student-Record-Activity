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

    const ok =
      window.confirm(
        "Delete this activity?"
      );

    if (!ok) return;

    try {

      const token =
        localStorage.getItem("token");

      await api.delete(

        `/activities/${activity.id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert("Deleted Successfully");

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
          className={
            activity.status === "Approved"
              ? "status approved"
              : activity.status === "Rejected"
              ? "status rejected"
              : "status pending"
          }
        >
          {activity.status}
        </div>

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
                  View Proof
                </Button>

              </a>
            )
          }

          <Button
            variant="contained"
            color="error"
            onClick={deleteActivity}
          >
            Delete
          </Button>

        </div>

      </CardContent>

    </Card>
  );
}

export default ActivityCard;