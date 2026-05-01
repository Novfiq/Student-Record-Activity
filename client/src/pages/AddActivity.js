import React, { useState } from "react";

import {
  Container,
  TextField,
  Button,
  Card,
  CardContent
} from "@mui/material";

import api from "../api";

import BackButton from "../components/BackButton";

function AddActivity() {

  const [title, setTitle] = useState("");

  const [type, setType] = useState("");

  const [description, setDescription] =
    useState("");

  const [file, setFile] = useState(null);

  const add = async () => {

    if (
      !title ||
      !type ||
      !description ||
      !file
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    const form = new FormData();

    form.append("title", title);

    form.append("type", type);

    form.append(
      "description",
      description
    );

    form.append("file", file);

    try {

      await api.post(

        "/activities",

        form,

        {
          headers: {

            Authorization:
              localStorage.getItem(
                "token"
              )
          }
        }
      );

      alert("Activity Added");

      window.location =
        "/dashboard";

    } catch (err) {

      alert(
        "Failed to add activity"
      );
    }
  };

  return (

    <Container className="center">

      <Card className="glass-card">

        <CardContent>

          {}

          <BackButton />

          {}

          <h1 className="title">
            Add Activity
          </h1>

          {}

          <TextField

            fullWidth

            label="Title"

            className="input"

            onChange={e =>
              setTitle(
                e.target.value
              )
            }
          />

          <br /><br />

          {}

          <TextField

            fullWidth

            label="Type"

            className="input"

            onChange={e =>
              setType(
                e.target.value
              )
            }
          />

          <br /><br />

          {}

          <TextField

            fullWidth

            multiline

            rows={4}

            label="Description"

            className="input"

            onChange={e =>
              setDescription(
                e.target.value
              )
            }
          />

          <br /><br />

          {}

          <label
            className="custom-file-upload"
          >

            Choose File

            <input

              type="file"

              onChange={e =>
                setFile(
                  e.target.files[0]
                )
              }
            />

          </label>

          {
            file && (

              <p className="file-name">

                {file.name}

              </p>
            )
          }

          <br /><br />

          {}

          <Button

            variant="contained"

            className="primary-btn"

            onClick={add}
          >

            ADD ACTIVITY

          </Button>

        </CardContent>

      </Card>

    </Container>
  );
}

export default AddActivity;