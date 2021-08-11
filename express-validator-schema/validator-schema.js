const { body } = require("express-validator");

exports.signupSchema = schema = [
  body("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide first name"),
  body("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide last name"),
  body("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide user name"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password length should be at least 6"),
];

exports.loginSchema = schema = [
  body("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide valid username"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password length at least 6"),
];

exports.commentSchema = schema = [
  body("comment")
    .exists({ checkFalsy: true })
    .withMessage("Please provide comment"),
];

exports.updateSchema = schema = [
  body("update")
    .exists({ checkFalsy: true })
    .withMessage("Please provide updated comment"),
];

exports.friendRequestSchema = schema = [
  body("requestBy")
    .exists({ checkFalsy: true })
    .withMessage("Please provide request sender"),
  body("requestTo")
    .exists({ checkFalsy: true })
    .withMessage("Please provide request reciever"),
];

exports.postSchema = schema = [
  body("post")
    .exists({ checkFalsy: true })
    .withMessage("Please provide valid post"),
];

exports.requestAcceptSchema = schema = [
  body("request")
    .exists({ checkFalsy: true })
    .withMessage("Please provide valid request"),
];

exports.unfriendSchema = schema = [
  body("unfriendId")
    .exists({ checkFalsy: true })
    .withMessage("Please provide valid request"),
];

exports.passwordChangeSchema = schema = [
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide password to change"),
];
