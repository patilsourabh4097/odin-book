const express = require("express");

const Posts = require("../model/posts");
const User = require("../model/users");

exports.allPosts = async (req, res) => {
  const posts = await Posts.find();
  if (posts.length === 0) {
    res.status(400).json({
      msg: "no posts found",
    });
    return;
  }
  res.status(200).json({
    posts,
  });
};

exports.addPosts = async (req, res) => {
  const { post } = req.body;
  const user = req.user;
  if (post === "") {
    res.status(400).json({
      msg: "post should not be empty",
    });
    return;
  }
  let newPost = await new Posts({
    post,
    postBy: user,
  });
  newPost = await newPost.save();
  res.status(200).json({
    post: newPost,
  });
};

exports.getSinglePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Posts.findById(postId).populate("postBy");
  } catch (err) {
    res.status(400).json({ msg: "No post with this id found" });
    return;
  }
  res.status(200).json({
    post,
  });
};

exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const content = req.body.changes;
  if (content === "") {
    res.status(400).json({ msg: "content must not be empty" });
    return;
  }
  try {
    const post = await Posts.findById(postId);
  } catch (err) {
    res.status(400).json({ msg: "the post you want to update is not found" });
    return;
  }
  updatedPost = await Posts.updateOne({ _id: postId }, { post: content });
  res.status(200).json({
    changes: content,
    _id: postId,
  });
};

exports.likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  const post = await Posts.findById(postId);
  if (post.likes.indexOf(userId) !== -1) {
    res.status(400).json({
      msg: "user has already liked post",
    });
    return;
  }

  let likes = post.likes;
  likes.push(userId);
  results = await Posts.updateOne({ _id: postId }, { likes });
  res.status(200).json({
    msg: "liked post",
  });
};

exports.dislikePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  const post = await Posts.findById(postId);
  if (post.likes.indexOf(userId) === -1) {
    res.status(400).json({
      msg: "user has not liked the post",
    });
    return;
  }

  const likes = [...post.likes].filter(
    (user) => user._id.toString() !== userId
  );
  updatedPost = await Posts.updateOne({ _id: postId }, { likes });
  res.status(200).json({
    msg: "successfully disliked",
  });
};

exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Posts.findById(postId);
  } catch (err) {
    res.status(400).json({ msg: "the post you want to delete does not exists" });
  }
  const deleted = await Posts.deleteOne({ _id: postId });
  res.status(200).json({
    deleted,
  });
};
