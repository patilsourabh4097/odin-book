const bcrypt = require("bcryptjs");
const express = require("express");

const FrdRequest = require("../model/frd-requests");
const User = require("../model/user");
const Posts = require("../model/posts");

exports.allUsers = async (req, res) => {
  users = await User.find().populate("friends");
  if (users.length === 0) {
    res.json({
      msg: "no users found",
    });
    return;
  }
  res.json({
    users: users,
  });
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    res.json({
      msg: "No user found",
    });
    return;
  }
  res.json({
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
  });
};

exports.postsByUser = async (req, res) => {
  const { userId } = req.params;

  const posts = await Posts.find({ postBy: userId });
  if (posts.length === 0) {
    res.json({
      msg: "no posts by this user",
    });
    return;
  }
  res.json({
    posts,
  });
};

exports.getFrdRequests = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
  } catch (err) {
    res.status(400).json({ msg: "No such user exists" });
  }

  const allRequests = await FrdRequest.find({ requestTo: userId }).populate(
    "requestBy"
  );
  if (allRequests.length === 0) {
    res.json({ msg: "no requests found" });
    return;
  }
  res.json({
    success: "Success",
    allRequests,
  });
};

exports.acceptRequest = async (req, res) => {
  const userToAdd = req.body.user;
  const { userId } = req.params;

  const user = await User.findById(userToAdd);

  if (!user) {
    res.status(400).json({ msg: "no such user to add" });
    return;
  }

  let currUser = await User.findById(userId);

  if (currUser.friends.indexOf(userToAdd) !== -1) {
    res.status(400).json({
      msg: "both are already friends",
    });
    return;
  }

  if (userFound.friends.indexOf(userId) !== -1) {
    res.status(400).json({
      msg: ["both are already friends"],
    });
    return;
  }
  currUser.friends.push(user._id);
  user.friends.push(currUser._id);
  let savedOne = await currUser.save();
  let savedTwo = await user.save();
  res.json({ msg: "accepted request" });
};

exports.unfriend = async (req, res) => {
  const { unfriendId } = req.body;
  const { userId } = req.params;

  const currUser = await User.findById(userId);
  const unfriendTo = await User.findById(unfriendId);

  currUser.friends = [...currUser.friends].filter(
    (friend) => friend.toString() !== unfriendId
  );

  unfriendTo.friends = [...unfriendTo.friends].filter(
    (friend) => friend.toString() !== userId
  );
  const updatedFirst = await User.updateOne(
    { _id: userId },
    { friends: currUser.friends }
  );

  const updatedSec = await User.updateOne(
    { _id: unfriendId },
    { friends: unfriendTo.friends }
  );

  res.json({ success: "unfriend done" });
};

exports.changePassword = async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;

  const salt = await bcrypt.genSalt();
  let hashedPassword = await bcrypt.hash(password, salt);

  const updatedPass = await User.updateOne(
    { _id: userId },
    { password: hashedPassword }
  );
  res.json({
    success: "password updated ",
  });
};
