const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const token =
    req.headers["authorization"];

  if (!token) {

    return res.send("No token");
  }

  jwt.verify(
    token,
    "secretkey",

    (err, user) => {

      if (err) {

        return res.send(
          "Invalid token"
        );
      }

      req.user = user;

      next();
    }
  );
};