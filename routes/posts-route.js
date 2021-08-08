const router = require("express").Router();

const auth = require("../controller/auth-controller");
const posts = require("../controller/posts-controller");

router.get("/", posts.allPosts);
router.post("/", auth.authUser, posts.addPosts);
router.get("/:postId", auth.authUser, posts.getSinglePost);
router.put("/:postId", auth.authUser, posts.updatePost);
router.put("/:postId/like", auth.authUser, posts.likePost);
router.put("/:postId/dislike", auth.authUser, posts.dislikePost);
router.delete("/:postId", auth.authUser, posts.deletePost);

module.exports = router;
