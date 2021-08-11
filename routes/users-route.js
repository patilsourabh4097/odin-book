const router = require("express").Router();

const schema = require("../express-validator-schema/validator-schema");
const validator = require("../middleware/express-validator");
const auth = require("../controller/auth-controller");
const user = require("../controller/users-controller");

router.get("/", user.allUsers);
router.get("/:userId", user.getUserById);
router.get("/:userId/posts", user.postsByUser);
router.get("/:userId/friendrequests", auth.authUser, user.getFrdRequests);
router.put(
  "/:userId/friend",
  auth.authUser,
  schema.requestAcceptSchema,
  validator.validateRequest,
  user.acceptRequest
);
router.put(
  "/:userId/unfriend",
  auth.authUser,
  schema.unfriendSchema,
  validator.validateRequest,
  user.unfriend
);
router.put(
  "/:userId",
  auth.authUser,
  schema.passwordChangeSchema,
  validator.validateRequest,
  user.changePassword
);

module.exports = router;
