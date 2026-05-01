const express = require("express");

const db = require("../database/db");

const router = express.Router();

/* ===== LEADERBOARD ===== */

router.get(

  "/",

  (req, res) => {

    db.query(

      `SELECT
        s.name,
        COUNT(a.id) AS count

      FROM students s

      JOIN activities a

      ON s.id=a.student_id

      WHERE a.status='Approved'

      GROUP BY s.name

      ORDER BY count DESC

      LIMIT 5`,

      (err, result) => {

        res.send(result);
      }
    );
  }
);

module.exports = router;