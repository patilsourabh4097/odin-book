const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../model/users");

exports.signup = async (req, res) => {
  const { firstname, lastname, username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (user) {
    res.status(400).json({
      err: "User already exists",
    });
    return;
  }

  password = await bcrypt.hash(password, 10);

  let newUser = new User({
    firstname,
    lastname,
    username,
    password,
  });

  await newUser.save((err) => {
    if (err) {
      res.status(400).json({
        err,
      });
      return;
    }
  });
  res.status(200).json({
    success: "successfully signed up",
  });
};

exports.login = async (req, res) => {
  const { username } = req.body;
  const password = req.body.password;
  const key = process.env.SECRETKEY;

  const user = await User.findOne({ username: username });

  if (!user) {
    res.status(400).json({ msg: "user doesnt exists" });
    return;
  }

  const passMatch = await bcrypt.compare(password, user.password);
  if (passMatch) {
    let credentials = {
      name: user.username,
      password: user.password,
    };
    const token = await jwt.sign(credentials, key);
    res.status(200).json({
      msg: "login successfull",
      token,
    });
  } else {
    res.status(400).json({
      msg: "wrong password",
    });
  }
};

exports.authUser = (req, res, next) => {
  if (!req.headers.auth) {
    res.status(400).json({ msg: "user is not logged in to do this activity" });
    return;
  }
  let token = req.headers.auth;
  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRETKEY, async (err, userObj) => {
    if (err) {
      res.status(400).json({ msg: "Invalid token" });
      return;
    }

    let user = await User.findOne({ username: userObj.name });
    if (!user) {
      res.status(400).json({ msg: "user doesnt exists" });
      return;
    }
    req.user = user;
    next();
  });
};
