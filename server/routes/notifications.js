const express = require("express");

const db = require("../database/db");

const auth =
  require("../middleware/auth");

const router = express.Router();

/* ===== GET NOTIFICATIONS ===== */

router.get(

  "/",

  auth,

  (req, res) => {

    db.query(

      `SELECT * FROM notifications
      WHERE student_id=?`,

      [req.user.id],

      (err, result) => {

        res.send(result);
      }
    );
  }
);

/* ===== ADD NOTIFICATION ===== */

router.post(

  "/",

  (req, res) => {

    const {
      message,
      student_id
    } = req.body;

    db.query(

      `INSERT INTO notifications
      (message,student_id)
      VALUES(?,?)`,

      [
        message,
        student_id
      ],

      () => {

        res.send(
          "Notification Added"
        );
      }
    );
  }
);

module.exports = router;