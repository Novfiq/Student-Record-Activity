import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Button
} from "@mui/material";

import api from "../api";

function ActivityCard({
  activity,
  fetchActivities
}) {

  const deleteActivity =
    async (id) => {

      try {

        await api.delete(
          `/activities/${id}`,
          {
            headers: {
              token:
                localStorage.getItem(
                  "token"
                )
            }
          }
        );

        alert(
          "Activity Deleted"
        );

        fetchActivities();

      } catch (err) {

        console.log(err);

        alert(
          "Delete Failed"
        );
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
          style={{
            marginLeft: "10px"
          }}
          onClick={() =>
            deleteActivity(
              activity.id
            )
          }
        >
          Delete
        </Button>

      </CardContent>

    </Card>
  );
}

export default ActivityCard;