const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../model/users");

exports.signup = async (req, res) => {
  const { firstName, lastName, userName, password } = req.body;
  const user = await User.findOne({ userName: userName });
  if (user) {
    res.status(400).json({
      err: "User already exists",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser = new User({
    firstName,
    lastName,
    userName,
    password: hashedPassword,
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
  const { userName, password } = req.body;
  const key = process.env.SECRETKEY;

  const user = await User.findOne({ userName: userName });

  if (!user) {
    res.status(400).json({ msg: "user doesnt exists" });
    return;
  }

  const passMatch = await bcrypt.compare(password, user.password);
  if (passMatch) {
    let credentials = {
      name: user.userName,
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
  let token = req.headers.auth;
  if (!token) {
    res.status(400).json({ msg: "user is not logged in to do this activity" });
    return;
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRETKEY, async (err, userObj) => {
    if (err) {
      res.status(400).json({ msg: "Invalid token" });
      return;
    }

    let user = await User.findOne({ userName: userObj.name });
    if (!user) {
      res.status(400).json({ msg: "user doesnt exists" });
      return;
    }
    req.user = user;
    next();
  });
};
