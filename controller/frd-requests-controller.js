const express = require("express");

const FrdRequest = require("../model/frd-requests");
const User = require("../model/users");

exports.getAllRequests = async (req, res) => {
  const requests = await FrdRequest.find();
  if (requests.length === 0) {
    res.json({ msg: "no requests found" });
    return;
  }
  res.status(200).json({ msg: requests });
};

exports.getRequestById = async (req, res) => {
  const { requestId } = req.params;
  try {
    request = await FrdRequest.findById(requestId);
  } catch (err) {
    res.status(400).json({ msg: "no such request found" });
    return;
  }
  res.status(200).json({ msg: "success", request });
};

exports.addRequest = async (req, res) => {
  const { requestBy, requestTo } = req.body;
  if (!requestBy || !requestTo) {
    res.status(400).json({ msg: "provide both users" });
    return;
  }
  if (requestBy === requestTo) {
    res.status(400).json({ msg: "both users cannot be same" });
  }
  try {
    const sendBy = await User.findById(requestBy);
    const rcvdBy = await User.findById(requestTo);
  } catch (err) {
    res.status(400).json({ msg: "either sender or rcver doesnt exists" });
    return;
  }
  try {
    let newRequest = await new FrdRequest({
      requestBy,
      requestTo,
    });
    newRequest = await newRequest.save();
    res.status(200).json({
      msg: "requested successfully",
      newRequest,
    });
  } catch (err) {
    res.status(400).json({ msg: "error while sending request" });
    return;
  }
};

exports.deleteRequest = async (req, res) => {
  const { requestId } = req.params;
  try {
    const request = await FrdRequest.findById(requestId);
  } catch (err) {
    res.status(400).json({ msg: "no such request found" });
  }
  try {
    deleted = await FrdRequest.deleteOne({ _id: requestId });
    res.status(200).json({ delete: requestId });
  } catch (err) {
    res.status(500).json({ msg: "error while deleting req" });
  }
};
