import React from "react";
import BackButton from "../components/BackButton";

import {
  Card,
  CardContent,
  Avatar
} from "@mui/material";

function StudentProfile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="center">

      <Card className="glass-card">
        <BackButton />

        <CardContent>

          <div
            style={{
              textAlign: "center"
            }}
          >

            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: "auto"
              }}
            >
              {user.name.charAt(0)}
            </Avatar>

            <h1>{user.name}</h1>

            <p>
              {user.email}
            </p>

            <p>
              Department:
              {user.department}
            </p>

            <p>
              Role:
              {user.role}
            </p>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}

export default StudentProfile;