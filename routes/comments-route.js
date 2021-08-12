const router = require("express").Router();

const schema = require("../express-validator-schema/validator-schema");
const validator = require("../middleware/express-validator");
const auth = require("../validators/validate-user");
const comments = require("../controller/comments-controller");

router.get("/:postId/comments", auth.authUser, comments.getAllComments);
router.post(
  "/:postId/comments",
  auth.authUser,
  schema.commentSchema,
  validator.validateRequest,
  comments.addComment
);
router.delete(
  "/:postid/comments/:commentId",
  auth.authUser,
  comments.deleteComment
);
router.put(
  "/:postid/comments/:commentId",
  auth.authUser,
  schema.updateSchema,
  validator.validateRequest,
  comments.updateComment
);

module.exports = router;
