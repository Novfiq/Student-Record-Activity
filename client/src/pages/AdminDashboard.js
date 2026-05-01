import React, {
  useEffect,
  useState
} from "react";

import api from "../api";

import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

import DepartmentChart from
"../components/Charts/DepartmentChart";

import TrendChart from
"../components/Charts/TrendChart";

import LeaderboardChart from
"../components/Charts/LeaderboardChart";

function AdminDashboard() {

  const [deptData, setDeptData] =
    useState([]);

  const [trendData, setTrendData] =
    useState([]);

  const [leaderData, setLeaderData] =
    useState([]);

  useEffect(() => {

    api.get("/reports/department")
    .then(res =>
      setDeptData(res.data)
    );

    api.get("/reports/trends")
    .then(res =>
      setTrendData(res.data)
    );

    api.get("/leaderboard")
    .then(res =>
      setLeaderData(res.data)
    );

  }, []);

  return (

    <>

      <Navbar />
      <BackButton />

      <div className="content">

        <h1>
          Admin Dashboard
        </h1>

        <div className="chart-box">

          <h2>
            Department Analytics
          </h2>

          <DepartmentChart
            data={deptData}
          />

        </div>

        <div className="chart-box">

          <h2>
            Monthly Trends
          </h2>

          <TrendChart
            data={trendData}
          />

        </div>

        <div className="chart-box">

          <h2>
            Leaderboard
          </h2>

          <LeaderboardChart
            data={leaderData}
          />

        </div>

      </div>

    </>
  );
}

export default AdminDashboard;