import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Button
} from "@mui/material";

function ActivityCard({ activity }) {

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
              href={
                "http://localhost:5000/uploads/" +
                activity.file
              }
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

      </CardContent>

    </Card>
  );
}

export default ActivityCard;