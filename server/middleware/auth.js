const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  try {

    const header =
      req.headers.authorization;

    if (!header) {

      return res.status(401).send(
        "No token"
      );
    }

    const token =
      header.split(" ")[1];

    const decoded =
      jwt.verify(
        token,
        "secretkey"
      );

    req.user = decoded;

    next();

  } catch (err) {

    console.log(err);

    res.status(401).send(
      "Invalid token"
    );
  }
};