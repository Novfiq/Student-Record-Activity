import React, { useState } from "react";

import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  MenuItem
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import api from "../api";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    name: "",

    email: "",

    password: "",

    role: "student",

    department: ""
  });

  const [errors, setErrors] = useState({});

  /* ===== VALIDATION ===== */

  const validate = () => {

    let temp = {};

    /* ===== NAME ===== */

    if (form.name.trim() === "") {

      temp.name =
        "Name is required";
    }

    /* ===== EMAIL ===== */

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email)) {

      temp.email =
        "Enter valid Gmail";
    }

    /* ===== PASSWORD ===== */

    if (form.password.length < 6) {

      temp.password =
        "Password must be greater than 6 characters";
    }

    /* ===== DEPARTMENT ===== */

    if (form.department === "") {

      temp.department =
        "Select department";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  /* ===== REGISTER ===== */

  const register = async () => {

    if (!validate()) {

      return;
    }

    try {

      await api.post(
        "/auth/register",
        form
      );

      alert(
        "Registered Successfully"
      );

      navigate("/");

    } catch (err) {

      alert("Registration Failed");
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
            Register
          </Typography>

          {/* ===== NAME ===== */}

          <TextField

            fullWidth

            label="Name"

            className="input"

            error={!!errors.name}

            helperText={errors.name}

            onChange={e =>

              setForm({

                ...form,

                name: e.target.value
              })
            }
          />

          <br /><br />

          {/* ===== EMAIL ===== */}

          <TextField

            fullWidth

            label="Email"

            className="input"

            error={!!errors.email}

            helperText={errors.email}

            onChange={e =>

              setForm({

                ...form,

                email: e.target.value
              })
            }
          />

          <br /><br />

          {/* ===== PASSWORD ===== */}

          <TextField

            fullWidth

            label="Password"

            type="password"

            className="input"

            error={!!errors.password}

            helperText={errors.password}

            onChange={e =>

              setForm({

                ...form,

                password: e.target.value
              })
            }
          />

          <br /><br />

          {/* ===== DEPARTMENT ===== */}

          <TextField

            fullWidth

            select

            label="Department"

            className="input"

            error={!!errors.department}

            helperText={errors.department}

            onChange={e =>

              setForm({

                ...form,

                department: e.target.value
              })
            }
          >

            <MenuItem value="CSE">
              CSE
            </MenuItem>

            <MenuItem value="EEE">
              AIDS
            </MenuItem>

            <MenuItem value="IT">
              IT
            </MenuItem>

            <MenuItem value="ECE">
              ECE
            </MenuItem>

            <MenuItem value="EEE">
              EEE
            </MenuItem>

          </TextField>

          <br /><br />

          {/* ===== BUTTON ===== */}

          <Button

            fullWidth

            variant="contained"

            className="primary-btn"

            onClick={register}
          >
            REGISTER
          </Button>

        </CardContent>

      </Card>

    </Container>
  );
}

export default Register;