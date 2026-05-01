import React, { useState, useEffect } from "react";

import BackButton from "../components/BackButton";

import api from "../api";

import {

  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions

} from "@mui/material";

function Events() {

  const events = [

    {
      title: "Hackathon",
      date: "15 May"
    },

    {
      title: "AI Workshop",
      date: "20 May"
    },

    {
      title: "Placement Drive",
      date: "1 June"
    }
  ];

  const [open, setOpen] =
    useState(false);

  const [selectedEvent, setSelectedEvent] =
    useState("");

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [registeredEvents, setRegisteredEvents] =
    useState([]);

  /* ===== LOAD REGISTERED EVENTS ===== */

  useEffect(() => {

    loadRegisteredEvents();

  }, []);

  /* ===== LOAD EVENTS FROM MYSQL ===== */

  const loadRegisteredEvents =
  async () => {

    try {

      const res = await api.get(

        "/events/my-events",

        {
          headers: {

            Authorization:
              localStorage.getItem(
                "token"
              )
          }
        }
      );

      setRegisteredEvents(
        res.data
      );

    } catch (err) {

      console.log(err);
    }
  };

  /* ===== OPEN DIALOG ===== */

  const handleOpen = (eventName) => {

    setSelectedEvent(eventName);

    setOpen(true);

    setMessage("");
  };

  /* ===== CLOSE DIALOG ===== */

  const handleClose = () => {

    setOpen(false);

    setName("");

    setPhone("");

    setMessage("");
  };

  /* ===== REGISTER EVENT ===== */

  const registerEvent = async () => {

    if (!name || !phone) {

      setMessage(
        "Please fill all fields"
      );

      return;
    }

    if (phone.length < 10) {

      setMessage(
        "Enter valid phone number"
      );

      return;
    }

    try {

      await api.post(

        "/events/register",

        {

          event_name:
            selectedEvent,

          student_name:
            name,

          phone
        },

        {
          headers: {

            Authorization:
              localStorage.getItem(
                "token"
              )
          }
        }
      );

      setMessage(

        `Successfully Registered for ${selectedEvent}`
      );

      setName("");

      setPhone("");

      loadRegisteredEvents();

    } catch (err) {

      console.log(err);

      setMessage(
        "Registration Failed"
      );
    }
  };

  return (

    <div className="content">

      {/* ===== BACK BUTTON ===== */}

      <BackButton />

      {/* ===== TITLE ===== */}

      <h1>
        Upcoming Events
      </h1>

      {/* ===== EVENT CARDS ===== */}

      <div

        style={{

          display: "flex",

          gap: "25px",

          flexWrap: "wrap"
        }}
      >

        {
          events.map((e, i) => (

            <Card

              key={i}

              className="glass-card"

              style={{
                width: "300px"
              }}
            >

              <CardContent>

                <h2>
                  {e.title}
                </h2>

                <p>
                  Date: {e.date}
                </p>

                <Button

                  variant="contained"

                  className="primary-btn"

                  onClick={() =>
                    handleOpen(
                      e.title
                    )
                  }

                >
                  REGISTER
                </Button>

              </CardContent>

            </Card>
          ))
        }

      </div>

      {/* ===== REGISTERED EVENTS ===== */}

      <div
        style={{
          marginTop: "50px"
        }}
      >

        <h1>
          Registered Events
        </h1>

        {
          registeredEvents.length === 0 ? (

            <p>
              No events registered yet
            </p>

          ) : (

            registeredEvents.map(
              (r, i) => (

                <Card

                  key={i}

                  className="activity-card"

                  style={{
                    marginTop: "20px",
                    padding: "10px"
                  }}
                >

                  <CardContent>

                    <h2>
                      {r.event_name}
                    </h2>

                    <p>
                      Name:
                      {r.student_name}
                    </p>

                    <p>
                      Phone:
                      {r.phone}
                    </p>

                  </CardContent>

                </Card>
              )
            )
          )
        }

      </div>

      {/* ===== DIALOG ===== */}

      <Dialog

        open={open}

        onClose={handleClose}

        sx={{

          "& .MuiDialog-paper": {

            backgroundColor:
              "#000000 !important",

            backgroundImage:
              "none !important",

            color:
              "white !important",

            borderRadius: "20px",

            padding: "20px",

            width: "420px",

            boxShadow:
              "0px 0px 25px rgba(0,229,255,0.4)"
          }
        }}
      >

        <DialogTitle

          style={{

            color: "#00e5ff",

            fontWeight: "bold",

            fontSize: "28px"
          }}
        >

          Register Event

        </DialogTitle>

        <DialogContent>

          <div

            style={{

              display: "flex",

              flexDirection: "column",

              gap: "20px",

              marginTop: "10px"
            }}
          >

            {/* ===== NAME ===== */}

            <input

              type="text"

              placeholder="Enter Name"

              value={name}

              onChange={e =>
                setName(
                  e.target.value
                )
              }

              style={{

                padding: "15px",

                borderRadius: "12px",

                border:
                  "1px solid #00e5ff",

                outline: "none",

                fontSize: "18px",

                background: "#1e293b",

                color: "white"
              }}
            />

            {/* ===== PHONE ===== */}

            <input

              type="number"

              placeholder="Enter Phone Number"

              value={phone}

              onChange={e =>
                setPhone(
                  e.target.value
                )
              }

              style={{

                padding: "15px",

                borderRadius: "12px",

                border:
                  "1px solid #00e5ff",

                outline: "none",

                fontSize: "18px",

                background: "#1e293b",

                color: "white"
              }}
            />

            {/* ===== MESSAGE ===== */}

            {
              message && (

                <p

                  style={{

                    color:
                      message.includes(
                        "Successfully"
                      )

                        ? "black"

                        : "#ff4d4d",

                    background:
                      message.includes(
                        "Successfully"
                      )

                        ? "#00ff99"

                        : "transparent",

                    padding:
                      message.includes(
                        "Successfully"
                      )

                        ? "10px"

                        : "0px",

                    borderRadius: "10px",

                    fontWeight: "bold"
                  }}
                >

                  {message}

                </p>
              )
            }

          </div>

        </DialogContent>

        <DialogActions>

          <Button

            onClick={handleClose}

            style={{
              color: "#ff4d4d"
            }}
          >

            CANCEL

          </Button>

          <Button

            variant="contained"

            className="primary-btn"

            onClick={registerEvent}

          >

            SUBMIT

          </Button>

        </DialogActions>

      </Dialog>

    </div>
  );
}

export default Events;