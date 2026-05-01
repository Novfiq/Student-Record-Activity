const express = require("express");

const db = require("../database/db");

const router = express.Router();

/* ===== DEPARTMENT REPORT ===== */

router.get(

  "/department",

  (req, res) => {

    db.query(

      `SELECT
        s.department,
        COUNT(a.id) AS count

      FROM activities a

      JOIN students s

      ON a.student_id=s.id

      WHERE a.status='Approved'

      GROUP BY s.department`,

      (err, result) => {

        res.send(result);
      }
    );
  }
);

/* ===== MONTHLY TRENDS ===== */

router.get(

  "/trends",

  (req, res) => {

    db.query(

      `SELECT
        MONTH(date) AS month,
        COUNT(*) AS count

      FROM activities

      GROUP BY MONTH(date)`,

      (err, result) => {

        res.send(result);
      }
    );
  }
);

module.exports = router;