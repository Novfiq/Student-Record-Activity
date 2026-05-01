const express = require("express");

const multer = require("multer");

const {
  CloudinaryStorage
} = require("multer-storage-cloudinary");

const cloudinary =
  require("../config/cloudinary");

const db =
  require("../database/db");

const auth =
  require("../middleware/auth");

const router =
  express.Router();

/* ===== CLOUDINARY STORAGE ===== */

const storage =
  new CloudinaryStorage({

    cloudinary: cloudinary,

    params: {

      folder:
        "student-records",

      allowed_formats: [
        "jpg",
        "png",
        "jpeg",
        "pdf"
      ]
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
      req.file?.path;

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

  async (req, res) => {

    try {

      db.query(

        `SELECT file
         FROM activities
         WHERE id=?`,

        [req.params.id],

        async (err, result) => {

          if (err) {

            console.log(err);

            return res.send(
              "Delete Failed"
            );
          }

          if (result.length > 0) {

            const fileUrl =
              result[0].file;

            if (fileUrl) {

              const arr =
                fileUrl.split("/");

              const fileName =
                arr[arr.length - 1];

              const publicId =
                "student-records/" +
                fileName.split(".")[0];

              try {

                await cloudinary.uploader.destroy(
                  publicId
                );

              } catch (e) {

                console.log(e);
              }
            }
          }

          db.query(

            `DELETE FROM activities
             WHERE id=?`,

            [req.params.id],

            (err2) => {

              if (err2) {

                console.log(err2);

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

    } catch (err) {

      console.log(err);

      res.send(
        "Delete Failed"
      );
    }
  }
);

module.exports = router;