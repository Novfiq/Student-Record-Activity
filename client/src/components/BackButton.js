import React from "react";

import {
  Button
} from "@mui/material";

import ArrowBackIcon from
"@mui/icons-material/ArrowBack";

import {
  useNavigate
} from "react-router-dom";

function BackButton() {

  const navigate = useNavigate();

  return (

    <Button

      variant="contained"

      startIcon={<ArrowBackIcon />}

      className="back-btn"

      onClick={() => navigate(-1)}

    >
      Back
    </Button>
  );
}

export default BackButton;