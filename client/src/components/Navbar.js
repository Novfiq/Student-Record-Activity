import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar
} from "@mui/material";

function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <AppBar
      position="static"
      sx={{
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        boxShadow: "none"
      }}
    >

      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#00e5ff"
          }}
        >
          Student Activity Platform
        </Typography>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >

          <Typography>
            {user?.name}
          </Typography>

          <Avatar>
            {user?.name?.charAt(0)}
          </Avatar>

        </div>

      </Toolbar>

    </AppBar>
  );
}

export default Navbar;