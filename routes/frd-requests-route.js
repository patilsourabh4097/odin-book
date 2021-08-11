const router = require("express").Router();

const schema = require("../express-validator-schema/validator-schema");
const validator = require("../middleware/express-validator");
const auth = require("../controller/auth-controller");
const frdRequest = require("../controller/frd-requests-controller");

router.get("/", auth.authUser, frdRequest.getAllRequests);
router.get("/:requestId", auth.authUser, frdRequest.getRequestById);
router.post(
  "/",
  auth.authUser,
  schema.friendRequestSchema,
  validator.validateRequest,
  frdRequest.addRequest
);
router.delete("/:requestId", auth.authUser, frdRequest.deleteRequest);

module.exports = router;
