const router = require("express").Router();

const auth = require("../controller/auth-controller");
const comments = require("../controller/comments-controller");


router.get("/:postId/comments", auth.authUser, comments.getAllComments);
router.post("/:postId/comments", auth.authUser, comments.addComment);
router.delete(
  "/:postid/comments/:commentId",
  auth.authUser,
  comments.deleteComment
);
router.put(
  "/:postid/comments/:commentId",
  auth.authUser,
  comments.updateComment
);

module.exports = router;
