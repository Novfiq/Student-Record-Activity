const express = require("express");

const db = require("../database/db");

const router = express.Router();

/* ===== CREATE EVENT ===== */

router.post(

  "/",

  (req, res) => {

    const {
      title,
      description,
      date
    } = req.body;

    db.query(

      `INSERT INTO events
      (title,description,date)
      VALUES(?,?,?)`,

      [
        title,
        description,
        date
      ],

      () => {

        res.send("Event Added");
      }
    );
  }
);

/* ===== GET EVENTS ===== */

router.get(

  "/",

  (req, res) => {

    db.query(

      "SELECT * FROM events",

      (err, result) => {

        res.send(result);
      }
    );
  }
);

module.exports = router;