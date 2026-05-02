import React, { useState } from "react";

import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent
} from "@mui/material";

import {
  useNavigate,
  Link
} from "react-router-dom";

import api from "../api";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {

    try {

      const res =
        await api.post(

          "/auth/login",

          {
            email,
            password
          }
        );

      console.log(res.data);

      if (!res.data.token) {

        return alert(
          "No Token Received"
        );
      }

      localStorage.setItem(

        "token",

        res.data.token
      );

      localStorage.setItem(

        "user",

        JSON.stringify(
          res.data.user
        )
      );

      if (
        res.data.user.role ===
        "admin"
      ) {

        navigate("/admin");

      } else {

        navigate("/dashboard");
      }

    } catch (err) {

      console.log(err);

      alert(

        err.response?.data ||

        err.message ||

        "Login Failed"
      );
    }
  };

  return (

    <Container className="center">

      <Card className="glass-card">

        <CardContent>

          <Typography
            variant="h3"
            className="title"
          >
            Login
          </Typography>

          <TextField
            fullWidth
            label="Email"
            className="input"
            value={email}
            onChange={e =>
              setEmail(
                e.target.value
              )
            }
          />

          <br /><br />

          <TextField
            fullWidth
            label="Password"
            type="password"
            className="input"
            value={password}
            onChange={e =>
              setPassword(
                e.target.value
              )
            }
          />

          <br /><br />

          <Button
            fullWidth
            variant="contained"
            className="primary-btn"
            onClick={login}
          >
            LOGIN
          </Button>

          <br /><br />

          <Typography>

            Don't have account?

            <Link to="/register">
              Register
            </Link>

          </Typography>

        </CardContent>

      </Card>

    </Container>
  );
}

export default Login;