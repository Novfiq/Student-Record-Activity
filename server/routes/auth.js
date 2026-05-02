const express = require("express");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const db = require("../database/db");

const router = express.Router();

/* ===== REGISTER ===== */

router.post(

  "/register",

  async (req, res) => {

    try {

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

        (err) => {

          if (err) {

            console.log(err);

            return res.send(
              "Register Failed"
            );
          }

          res.send(
            "Registered"
          );
        }
      );

    } catch (err) {

      console.log(err);

      res.send(
        "Register Error"
      );
    }
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

        if (err) {

          console.log(err);

          return res.send(
            "Database Error"
          );
        }

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

        const token =
          jwt.sign(

            {
              id: result[0].id,
              email: result[0].email,
              role: result[0].role
            },

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