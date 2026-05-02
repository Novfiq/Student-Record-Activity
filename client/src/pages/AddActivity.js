import React, {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import api from "../api";

function AddActivity() {

  const navigate =
    useNavigate();

  const [title, setTitle] =
    useState("");

  const [type, setType] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [file, setFile] =
    useState(null);

  const addActivity = async () => {

    try {

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "type",
        type
      );

      formData.append(
        "description",
        description
      );

      formData.append(
        "file",
        file
      );

      const token =
        localStorage.getItem("token");

      const res =
        await api.post(

          "/activities",

          formData,

          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

      alert(res.data);

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert(
        "Failed to add activity"
      );
    }
  };

  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background:
          "linear-gradient(to right,#020617,#0f172a)"
      }}
    >

      {/* SIDEBAR */}

      <div
        style={{
          width: "250px",
          background: "#1e293b",
          padding: "20px",
          color: "white"
        }}
      >

        <h1
          style={{
            color: "cyan"
          }}
        >
          MENU
        </h1>

        <br />

        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Dashboard
        </Link>

        <br /><br />

        <Link
          to="/add-activity"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Add Activity
        </Link>

        <br /><br />

        <Link
          to="/profile"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Profile
        </Link>

        <br /><br />

        <Link
          to="/events"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Events
        </Link>

        <br /><br />

        <Link
          to="/reports"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Reports
        </Link>

        <br /><br />

        <button

          onClick={logout}

          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "10px",
            width: "100%",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </div>

      {/* MAIN CONTENT */}

      <div
        style={{
          flex: 1,
          padding: "30px",
          color: "white"
        }}
      >

        <h1>
          Add Activity
        </h1>

        <br />

        <input

          type="text"

          placeholder="Title"

          value={title}

          onChange={e =>
            setTitle(e.target.value)
          }

          style={{
            padding: "10px",
            width: "300px"
          }}
        />

        <br /><br />

        <input

          type="text"

          placeholder="Type"

          value={type}

          onChange={e =>
            setType(e.target.value)
          }

          style={{
            padding: "10px",
            width: "300px"
          }}
        />

        <br /><br />

        <textarea

          placeholder="Description"

          value={description}

          onChange={e =>
            setDescription(e.target.value)
          }

          style={{
            padding: "10px",
            width: "300px",
            height: "100px"
          }}
        />

        <br /><br />

        <input

          type="file"

          onChange={e =>
            setFile(
              e.target.files[0]
            )
          }
        />

        <br /><br />

        <button

          onClick={addActivity}

          style={{
            padding: "10px",
            background: "cyan",
            border: "none",
            cursor: "pointer"
          }}
        >
          ADD ACTIVITY
        </button>

      </div>

    </div>
  );
}

export default AddActivity;