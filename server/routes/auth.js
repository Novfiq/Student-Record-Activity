const express = require("express");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const db = require("../database/db");

const router = express.Router();

/* ===== REGISTER ===== */

router.post(
  "/register",

  async (req, res) => {

    const {
      name,
      email,
      password,
      role,
      department
    } = req.body;

    const hash =
      await bcrypt.hash(password, 10);

    db.query(

      `INSERT INTO students
      (name,email,password,role,department)
      VALUES(?,?,?,?,?)`,

      [
        name,
        email,
        hash,
        role,
        department
      ],

      () => {

        res.send("Registered");
      }
    );
  }
);

/* ===== LOGIN ===== */

router.post(
  "/login",

  (req, res) => {

    const {
      email,
      password
    } = req.body;

    db.query(

      "SELECT * FROM students WHERE email=?",

      [email],

      async (err, result) => {

        if (result.length === 0) {

          return res.send(
            "User not found"
          );
        }

        const valid =
          await bcrypt.compare(
            password,
            result[0].password
          );

        if (!valid) {

          return res.send(
            "Wrong password"
          );
        }

        const token = jwt.sign(
          result[0],
          "secretkey"
        );

        res.send({

          token,

          user: result[0]
        });
      }
    );
  }
);

module.exports = router;