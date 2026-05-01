import React from "react";
import BackButton from "../components/BackButton";

import {
  Card,
  CardContent,
  Button
} from "@mui/material";

function Reports() {

  return (

    <div className="content">

      <Card className="glass-card">

        <CardContent>
          <BackButton />

          <h1>
            Reports
          </h1>

          <p>
            Generate reports of:
          </p>

          <ul>

            <li>
              Student activities
            </li>

            <li>
              Department analytics
            </li>

            <li>
              Monthly trends
            </li>

            <li>
              Approved certificates
            </li>

          </ul>

          <Button
            variant="contained"
            className="primary-btn"
          >
            DOWNLOAD PDF
          </Button>

        </CardContent>

      </Card>

    </div>
  );
}

export default Reports;