require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const SECRET_KEY = process.env.SECRET_KEY;
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, SECRET_KEY, (error, decodedToken) => {
      if (error) {
        console.log(error.message);
        res.json({ error });
      } else {
        console.log(decodedToken);
        res.json({ message: "Si lo logramos" });
        next();
      }
    });
  } else {
    res.json({ message: "No es un usuario autenticado" });
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
