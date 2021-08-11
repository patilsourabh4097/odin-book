const router = require("express").Router();

const schema = require("../express-validator-schema/validator-schema");
const validator = require("../middleware/express-validator");
const auth = require("../controller/auth-controller");

router.post(
  "/signup",
  schema.signupSchema,
  validator.validateRequest,
  auth.signup
);
router.post(
  "/login",
  schema.loginSchema,
  validator.validateRequest,
  auth.login
);

module.exports = router;
