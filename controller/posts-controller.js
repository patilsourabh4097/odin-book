const express = require("express");

const Posts = require("../model/posts");
const User = require("../model/user");

exports.allPosts = async (req, res) => {
  const posts = await Posts.find();
  if (posts.length === 0) {
    res.json({
      msg: "no posts found",
    });
    return;
  }
  res.json({
    posts,
  });
};

exports.addPosts = async (req, res) => {
  const { post } = req.body;
  const user = req.user;
  if (post === "") {
    res.json({
      msg: "post should not be empty",
    });
    return;
  }
  const newPost = await new Posts({
    post,
    postBy: user,
  });
  savedPost = await newPost.save();
  res.json({
    post: savedPost,
  });
};

exports.getSinglePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Posts.findById(postId).populate("postBy");
  } catch (err) {
    res.json({ msg: "No post with this id found" });
    return;
  }
  res.json({
    post,
  });
};

exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const content = req.body.changes;
  if (content === "") {
    res.json({ msg: "content must not be empty" });
    return;
  }
  try {
    const post = await Posts.findById(postId);
  } catch (err) {
    res.json({ msg: "the post you want to update is not found" });
    return;
  }
  updatedPost = await Posts.updateOne({ _id: postId }, { post: content });
  res.json({
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
  res.json({
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
  res.json({
    msg: "successfully disliked",
  });
};

exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Posts.findById(postId);
  } catch (err) {
    res.json({ msg: "the post you want to delete does not exists" });
  }
  const deleted = await Posts.deleteOne({ _id: postId });
  res.json({
    deleted,
  });
};
