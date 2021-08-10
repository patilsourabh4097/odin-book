const router = require("express").Router();

const auth = require("../controller/auth-controller");
const user = require("../controller/users-controller");

router.get("/", user.allUsers);
router.get("/:userId", user.getUserById);
router.get("/:userId/posts", user.postsByUser);
router.get("/:userId/friendrequests", auth.authUser, user.getFrdRequests);
router.put("/:userId/friend", auth.authUser, user.acceptRequest);
router.put("/:userId/unfriend", auth.authUser, user.unfriend);
router.put("/:userId", auth.authUser, user.changePassword);

module.exports = router;
