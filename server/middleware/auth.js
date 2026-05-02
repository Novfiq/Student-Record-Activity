const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.send(
        "No token"
      );
    }

    const token =
      authHeader.split(" ")[1];

    const verified =
      jwt.verify(
        token,
        "secretkey"
      );

    req.user = verified;

    next();

  } catch (err) {

    console.log(err);

    res.send(
      "Invalid token"
    );
  }
};