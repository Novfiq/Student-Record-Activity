const express = require("express");

const db = require("../database/db");

const router = express.Router();

/* ===== CREATE EVENT ===== */

router.post("/", (req, res) => {

  const {
    title,
    description,
    date
  } = req.body;

  db.query(

    `INSERT INTO events
    (title, description, date)
    VALUES (?, ?, ?)`,

    [
      title,
      description,
      date
    ],

    (err, result) => {

      if (err) {

        console.log("INSERT ERROR:", err);

        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      res.json({
        success: true,
        message: "Event Added"
      });
    }
  );
});

/* ===== GET EVENTS ===== */

router.get("/", (req, res) => {

  db.query(

    "SELECT * FROM events",

    (err, result) => {

      if (err) {

        console.log("SELECT ERROR:", err);

        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      res.json({
        success: true,
        data: result
      });
    }
  );
});

module.exports = router;