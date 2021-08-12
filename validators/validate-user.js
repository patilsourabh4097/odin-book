const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../model/users");

exports.authUser = (req, res, next) => {
  let token = req.headers.auth;
  if (!token) {
    res.status(401).json({ msg: "user is not logged in to do this activity" });
    return;
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRETKEY, async (err, userObj) => {
    if (err) {
      res.status(401).json({ msg: "Invalid token" });
      return;
    }

    let user = await User.findOne({ userName: userObj.name });
    if (!user) {
      res.status(404).json({ msg: "user doesnt exists" });
      return;
    }
    req.user = user;
    next();
  });
};
