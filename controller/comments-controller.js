const express = require("express");

const Comments = require("../model/comments");
const Posts = require("../model/posts");
const User = require("../model/users");

exports.getAllComments = async (req, res) => {
  const { postId } = req.params;
  try {
    post = await Posts.findById(postId);
  } catch (err) {
    res.status(400).json({ msg: "the post you are commenting on does not exists" });
  }
  const comments = await Comments.find({ onPost: postId });
  res.status(200).json({
    sucess: "success",
    comments,
  });
};

exports.addComment = async (req, res) => {
  const { postId } = req.params;
  const content = req.body.comment;
  if (content === "") {
    res.status(400).json({ msg: "comment should not be empty" });
  }
  try {
    const post = await Posts.findById(postId);
  } catch (err) {
    res.status(400).json({ msg: "there is no such post to comment on" });
  }
  const newComment = new Comments({
    comment: content,
    commentBy: req.user,
    onPost: postId,
  });

  const commented = await newComment.save();
  res.status(200).json({
    msg: "comment added",
    comment: content,
  });
};

exports.updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { update } = req.body;
  const result = await Comments.updateOne(
    { _id: commentId },
    { comment: update }
  );
  res.status(200).json({ success: "updated successfully", update });
};

exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comments.findById(commentId);
  } catch (err) {
    res.status(400).json({ msg: "no comment found with this id" });
  }
  try {
    const deleteResult = await Comments.deleteOne({ _id: commentId });
  } catch (err) {
    res.status(400).json({ msg: "error while deleting comment" });
    return;
  }
  res.status(200).json({
    msg: "comment deleted",
  });
};
