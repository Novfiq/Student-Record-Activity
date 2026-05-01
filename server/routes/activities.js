const express = require("express");

const multer = require("multer");

const db = require("../database/db");

const auth =
  require("../middleware/auth");

const router = express.Router();

/* ===== MULTER STORAGE ===== */

const storage =
  multer.diskStorage({

    destination: "uploads/",

    filename: (req, file, cb) => {

      cb(

        null,

        Date.now() +
        "-" +
        file.originalname
      );
    }
  });

const upload =
  multer({ storage });

/* ===== ADD ACTIVITY ===== */

router.post(

  "/",

  auth,

  upload.single("file"),

  (req, res) => {

    const {
      title,
      type,
      description
    } = req.body;

    const file =
      req.file?.filename;

    db.query(

      `INSERT INTO activities
      (title,type,description,file,student_id)
      VALUES(?,?,?,?,?)`,

      [
        title,
        type,
        description,
        file,
        req.user.id
      ],

      (err) => {

        if (err) {

          console.log(err);

          return res.send(
            "Database Error"
          );
        }

        res.send(
          "Activity Added"
        );
      }
    );
  }
);

/* ===== GET STUDENT ACTIVITIES ===== */

router.get(

  "/",

  auth,

  (req, res) => {

    db.query(

      `SELECT *
      FROM activities
      WHERE student_id=?
      ORDER BY id DESC`,

      [req.user.id],

      (err, result) => {

        if (err) {

          console.log(err);

          return res.send([]);
        }

        res.send(result);
      }
    );
  }
);

/* ===== GET ALL ACTIVITIES ===== */

router.get(

  "/all",

  (req, res) => {

    db.query(

      `SELECT
        a.*,
        s.name,
        s.department

      FROM activities a

      JOIN students s

      ON a.student_id = s.id

      ORDER BY a.id DESC`,

      (err, result) => {

        if (err) {

          console.log(err);

          return res.send([]);
        }

        res.send(result);
      }
    );
  }
);

/* ===== UPDATE STATUS ===== */

router.put(

  "/:id",

  (req, res) => {

    const {
      status,
      remarks
    } = req.body;

    db.query(

      `UPDATE activities

      SET
        status=?,
        remarks=?

      WHERE id=?`,

      [
        status,
        remarks,
        req.params.id
      ],

      (err) => {

        if (err) {

          console.log(err);

          return res.send(
            "Update Failed"
          );
        }

        res.send(
          "Activity Updated"
        );
      }
    );
  }
);

/* ===== DELETE ACTIVITY ===== */

router.delete(

  "/:id",

  auth,

  (req, res) => {

    db.query(

      `DELETE FROM activities
      WHERE id=?`,

      [req.params.id],

      (err) => {

        if (err) {

          console.log(err);

          return res.send(
            "Delete Failed"
          );
        }

        res.send(
          "Activity Deleted"
        );
      }
    );
  }
);

module.exports = router;