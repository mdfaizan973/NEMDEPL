const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], "newmasai");

      if (decoded) {
        req.body.authorID = decoded.authorID; //For -> products route
        req.body.author = decoded.author;
        // console.log(decoded);
        next();
      } else {
        res.send({ msg: "Please login" });
      }
    } catch (err) {
      res.send({ mas: err.message });
    }
  } else {
    res.send({ msg: "Please login" });
  }
};

module.exports = { auth };
