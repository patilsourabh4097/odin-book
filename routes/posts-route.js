const router = require("express").Router();

const schema = require("../express-validator-schema/validator-schema");
const validator = require("../middleware/express-validator");
const auth = require("../validators/validate-user");
const posts = require("../controller/posts-controller");

router.get("/", posts.allPosts);
router.post(
  "/",
  auth.authUser,
  schema.postSchema,
  validator.validateRequest,
  posts.addPosts
);
router.get("/:postId", auth.authUser, posts.getSinglePost);
router.put(
  "/:postId",
  auth.authUser,
  schema.updateSchema,
  validator.validateRequest,
  posts.updatePost
);
router.put("/:postId/like", auth.authUser, posts.likePost);
router.put("/:postId/dislike", auth.authUser, posts.dislikePost);
router.delete("/:postId", auth.authUser, posts.deletePost);

module.exports = router;
